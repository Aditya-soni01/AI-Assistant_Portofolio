import { useEffect, useRef, useState } from "react";
import "./VoiceAssistant.css";
import NeonOrb from "./NeonOrb/NeonOrb";

const STORAGE_KEY = "visitorName";
const SKIP_KEY = "assistantIntroSkipped";
const SECTION_DELAY = 450;
const EDGE_MARGIN = 16;

const safeStorage = {
  get(key) {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    if (typeof window === "undefined") return false;
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // noop: storage may be unavailable
    }
  },
};

const TOUR_STEPS = [
  { id: "hero", line: "This is the hero section, a quick snapshot of Aditya's engineering focus." },
  { id: "about", line: "This section covers Aditya's backend journey into AI product engineering." },
  { id: "systems", line: "Here are the AI product projects built for practical business outcomes." },
  { id: "evolution", line: "This timeline highlights experience across enterprise and product teams." },
  { id: "stack", line: "This section presents the full skills stack across backend, AI, and architecture." },
  { id: "terminal", line: "Finally, the contact section is where you can connect directly." },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const VoiceAssistant = () => {
  const [savedName, setSavedName] = useState(() => safeStorage.get(STORAGE_KEY) || "");
  const [name, setName] = useState(() => safeStorage.get(STORAGE_KEY) || "");
  const [isOpen, setIsOpen] = useState(() => {
    const existingName = safeStorage.get(STORAGE_KEY);
    const skippedIntro = safeStorage.get(SKIP_KEY) === "true";
    return !existingName && !skippedIntro;
  });
  const [assistantState, setAssistantState] = useState("thinking");
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [isTourFinished, setIsTourFinished] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(null);

  const bubbleRef = useRef(null);
  const dragMetaRef = useRef({ startX: 0, startY: 0, originX: 0, originY: 0 });
  const dragPointerIdRef = useRef(null);
  const tourStoppedRef = useRef(false);
  const tourTimeoutRef = useRef(null);
  const dragRafRef = useRef(0);
  const dragNextRef = useRef({ x: 0, y: 0 });

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    let timeOfDay = "evening";
    if (hour >= 5 && hour < 12) timeOfDay = "morning";
    else if (hour >= 12 && hour < 17) timeOfDay = "afternoon";
    return `Good ${timeOfDay}`;
  };

  const getPersonalGreeting = (visitorName) => {
    if (!visitorName) return "Hi, there";
    return `${getTimeGreeting()}, ${visitorName}`;
  };

  const supportsSpeech =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window;

  const buildIntroScript = (visitorName) => `${getTimeGreeting()}, ${visitorName}.
Thank you for choosing Aditya's AI Assistant.

Let me take you through Aditya's journey - from Civil Engineer, to Software Developer, and now an AI Engineer building intelligent systems.

Let's get started.`;

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const wait = (ms) =>
    new Promise((resolve) => {
      tourTimeoutRef.current = window.setTimeout(resolve, ms);
    });

  const speakLine = (text) =>
    new Promise((resolve) => {
      if (!supportsSpeech) {
        resolve();
        return;
      }

      const synth = window.speechSynthesis;
      if (synth.paused) {
        synth.resume();
      }
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.onend = resolve;
      utterance.onerror = (event) => {
        console.warn("[voice-assistant] speech synthesis error:", event?.error || event);
        resolve();
      };

      setAssistantState("speaking");
      synth.speak(utterance);
    });

  const stopTour = () => {
    tourStoppedRef.current = true;
    if (tourTimeoutRef.current) {
      window.clearTimeout(tourTimeoutRef.current);
    }
    if (supportsSpeech) {
      window.speechSynthesis.cancel();
    }
    setIsTourRunning(false);
    setAssistantState("idle");
  };

  const getClampedPosition = (x, y) => {
    const bubble = bubbleRef.current;
    if (!bubble) return { x, y };

    const { width, height } = bubble.getBoundingClientRect();
    return {
      x: clamp(x, EDGE_MARGIN, window.innerWidth - width - EDGE_MARGIN),
      y: clamp(y, EDGE_MARGIN, window.innerHeight - height - EDGE_MARGIN),
    };
  };

  const onDragStart = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const bubble = bubbleRef.current;
    if (!bubble) return;

    const initial = position || (() => {
      const rect = bubble.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    })();

    dragMetaRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: initial.x,
      originY: initial.y,
    };

    setPosition(initial);
    setIsDragging(true);
    dragPointerIdRef.current = event.pointerId;
    event.currentTarget?.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  const onDragHandleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  };

  const snapToEdge = () => {
    const bubble = bubbleRef.current;
    if (!bubble || !position) return;

    const { width, height } = bubble.getBoundingClientRect();
    const nextY = clamp(position.y, EDGE_MARGIN, window.innerHeight - height - EDGE_MARGIN);
    const nextX = position.x + width / 2 < window.innerWidth / 2
      ? EDGE_MARGIN
      : window.innerWidth - width - EDGE_MARGIN;

    setPosition({ x: nextX, y: nextY });
  };

  useEffect(() => {
    if (isOpen || position) return;
    const bubble = bubbleRef.current;
    if (!bubble) return;

    const rect = bubble.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - EDGE_MARGIN,
      y: window.innerHeight - rect.height - EDGE_MARGIN,
    });
  }, [isOpen, position]);

  useEffect(() => {
    if (!isDragging) return undefined;

    const onPointerMove = (event) => {
      if (dragPointerIdRef.current !== null && event.pointerId !== dragPointerIdRef.current) {
        return;
      }
      const { startX, startY, originX, originY } = dragMetaRef.current;
      const rawX = originX + (event.clientX - startX);
      const rawY = originY + (event.clientY - startY);
      dragNextRef.current = getClampedPosition(rawX, rawY);

      if (dragRafRef.current) return;
      dragRafRef.current = window.requestAnimationFrame(() => {
        setPosition(dragNextRef.current);
        dragRafRef.current = 0;
      });
    };

    const onPointerUp = (event) => {
      if (dragPointerIdRef.current !== null && event.pointerId !== dragPointerIdRef.current) {
        return;
      }
      dragPointerIdRef.current = null;
      setIsDragging(false);
      snapToEdge();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      if (dragRafRef.current) {
        window.cancelAnimationFrame(dragRafRef.current);
        dragRafRef.current = 0;
      }
    };
  }, [isDragging, position]);

  const runTour = async (visitorName) => {
    if (!visitorName) return;
    tourStoppedRef.current = false;
    setIsTourRunning(true);
    setIsTourFinished(false);

    if (supportsSpeech) {
      window.speechSynthesis.cancel();
    }

    const greeting = buildIntroScript(visitorName);
    await speakLine(greeting);
    if (tourStoppedRef.current) return;

    for (const step of TOUR_STEPS) {
      scrollToSection(step.id);
      await wait(SECTION_DELAY);
      if (tourStoppedRef.current) return;
      await speakLine(step.line);
      if (tourStoppedRef.current) return;
    }

    setAssistantState("idle");
    setIsTourRunning(false);
    setIsTourFinished(true);
  };

  useEffect(() => {
    if (!isOpen || assistantState !== "thinking") return undefined;
    const timer = window.setTimeout(() => {
      setAssistantState("idle");
    }, 1100);

    return () => window.clearTimeout(timer);
  }, [assistantState, isOpen]);

  useEffect(() => {
    const onResize = () => {
      if (!position) return;
      const adjusted = getClampedPosition(position.x, position.y);
      setPosition(adjusted);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (tourTimeoutRef.current) {
        window.clearTimeout(tourTimeoutRef.current);
      }
    };
  }, [position]);

  useEffect(() => {
    return () => {
      if (supportsSpeech) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supportsSpeech]);

  const handleStartTour = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || isTourRunning) return;

    if (supportsSpeech) {
      // Prime TTS in the direct click gesture context to satisfy browser autoplay policies.
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      window.speechSynthesis.getVoices();
    }

    safeStorage.set(STORAGE_KEY, trimmedName);
    safeStorage.remove(SKIP_KEY);
    setSavedName(trimmedName);
    setIsOpen(false);
    runTour(trimmedName);
  };

  const floatingStyle = position
    ? {
        left: 0,
        top: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }
    : undefined;

  return (
    <>
      {isOpen ? (
        <div className="voice-assistant-overlay" role="dialog" aria-modal="true" aria-label="Visitor name popup">
          <div className="voice-assistant-popup">
            <div className="flex justify-center items-center">
              <NeonOrb size="large" state={assistantState} />
            </div>
            <div className="text-center">
              <p className="voice-assistant-label">AI Assistant</p>
              <h2 className="voice-assistant-title">What should I call you?</h2>
            </div>

            <form onSubmit={handleStartTour} className="voice-assistant-form">
              <input
                type="text"
                className="voice-assistant-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                disabled={isTourRunning}
              />

              <div className="voice-assistant-actions">
                <button
                  type="submit"
                  className="voice-assistant-btn voice-assistant-btn-primary"
                  disabled={isTourRunning}
                >
                  Start Tour
                </button>
                {isTourRunning ? (
                  <button
                    type="button"
                    className="voice-assistant-btn voice-assistant-btn-secondary"
                    onClick={stopTour}
                  >
                    Stop Tour
                  </button>
                ) : null}
                {!isTourRunning && isTourFinished ? (
                  <button
                    type="button"
                    className="voice-assistant-btn voice-assistant-btn-secondary"
                    onClick={() => runTour(name.trim())}
                  >
                    Replay Tour
                  </button>
                ) : null}
                <button
                  type="button"
                  className="voice-assistant-btn voice-assistant-btn-secondary"
                  onClick={() => {
                    stopTour();
                    safeStorage.set(SKIP_KEY, "true");
                    setIsOpen(false);
                  }}
                >
                  Skip
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div
          className={`voice-assistant-bubble-container ${isDragging ? "voice-assistant-bubble-container-dragging" : ""}`}
          style={floatingStyle}
          ref={bubbleRef}
        >
          <div className="voice-assistant-bubble">
            <div
              className="voice-assistant-drag-handle"
              onPointerDown={onDragStart}
              onKeyDown={onDragHandleKeyDown}
              role="button"
              tabIndex={0}
              aria-label="Drag assistant widget"
            >
              <p className="voice-assistant-bubble-text">{getPersonalGreeting(savedName)}</p>
              <p className="voice-assistant-drag-label">Drag</p>
            </div>

            <div className="voice-assistant-bubble-rings voice-assistant-interactive" onPointerDown={onDragStart}>
              <NeonOrb size="tiny" state={assistantState} />
            </div>

            <div className="voice-assistant-bubble-actions voice-assistant-interactive">
              {isTourRunning ? (
                <button
                  type="button"
                  className="voice-assistant-bubble-btn"
                  onClick={stopTour}
                >
                  Stop Tour
                </button>
              ) : (
                <button
                  type="button"
                  className="voice-assistant-bubble-btn"
                  onClick={() => {
                    runTour(savedName || "there");
                  }}
                >
                  Replay Tour
                </button>
              )}
              <button
                type="button"
                className="voice-assistant-bubble-btn voice-assistant-bubble-link"
                onClick={() => {
                  stopTour();
                  setName(savedName);
                  setIsOpen(true);
                }}
              >
                Change Name
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
