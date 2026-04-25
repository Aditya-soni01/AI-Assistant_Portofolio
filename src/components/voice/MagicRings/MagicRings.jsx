import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./MagicRings.css";

const RINGS = [0.9, 1.2, 1.5];

const STATE_CONFIG = {
  idle: {
    speed: 0.007,
    glow: 1.1,
    color: "#8dd9f0",
    opacity: 0.48,
  },
  speaking: {
    speed: 0.018,
    glow: 1.85,
    color: "#e7f8ff",
    opacity: 0.78,
  },
  thinking: {
    speed: 0.004,
    glow: 1.5,
    color: "#9fe9ff",
    opacity: 0.62,
  },
};

const MagicRings = ({ state = "idle" }) => {
  const mountRef = useRef(null);
  const stateRef = useRef(state);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || useFallback) return undefined;

    let canUseWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      canUseWebGL = Boolean(
        canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")
      );
    } catch {
      canUseWebGL = false;
    }

    if (!canUseWebGL) {
      setUseFallback(true);
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 20);
    camera.position.z = 4.2;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setUseFallback(true);
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(180, 180);
    mount.appendChild(renderer.domElement);

    const material = new THREE.MeshBasicMaterial({
      color: STATE_CONFIG.idle.color,
      transparent: true,
      opacity: STATE_CONFIG.idle.opacity,
      side: THREE.DoubleSide,
    });

    const rings = RINGS.map((radius, index) => {
      const geometry = new THREE.TorusGeometry(radius, 0.03, 16, 96);
      const ring = new THREE.Mesh(geometry, material.clone());
      ring.rotation.x = Math.PI * (0.24 + index * 0.05);
      ring.rotation.y = Math.PI * (index * 0.12);
      scene.add(ring);
      return ring;
    });

    let frameId = 0;
    const animate = () => {
      const config = STATE_CONFIG[stateRef.current] || STATE_CONFIG.idle;
      const color = new THREE.Color(config.color);
      const pulse = 1 + Math.sin(Date.now() * 0.002) * 0.08;

      rings.forEach((ring, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        ring.rotation.z += config.speed * direction;
        ring.rotation.y += config.speed * 0.45;
        ring.scale.setScalar(config.glow * pulse);

        if (!Array.isArray(ring.material)) {
          ring.material.color.copy(color);
          ring.material.opacity = config.opacity;
        }
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      rings.forEach((ring) => {
        if (ring.geometry) {
          ring.geometry.dispose();
        }
        if (Array.isArray(ring.material)) {
          ring.material.forEach((materialItem) => materialItem?.dispose?.());
        } else {
          ring.material?.dispose?.();
        }
      });
      renderer?.dispose?.();
      const canvas = renderer?.domElement;
      if (canvas && mount.contains(canvas)) {
        mount.removeChild(canvas);
      }
    };
  }, [useFallback]);

  return (
    <div className="magic-rings-shell" aria-hidden="true">
      {useFallback ? (
        <div className={`magic-rings-fallback magic-rings-fallback-${state}`}>
          <span className="magic-rings-fallback-ring magic-rings-fallback-ring-1" />
          <span className="magic-rings-fallback-ring magic-rings-fallback-ring-2" />
          <span className="magic-rings-fallback-ring magic-rings-fallback-ring-3" />
        </div>
      ) : (
        <div className={`magic-rings-${state}`} ref={mountRef} />
      )}
    </div>
  );
};

export default MagicRings;
