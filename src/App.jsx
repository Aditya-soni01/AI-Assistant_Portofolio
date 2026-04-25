import { useEffect, useState } from "react";
import { RiCpuLine, RiTerminalBoxLine, RiDownloadLine, RiSparklingLine } from "react-icons/ri";
import Projects from "@components/Projects";
import Skills from "@components/Skills";
import Contact from "@components/Contact";
import VoiceAssistant from "@components/voice/VoiceAssistant";
import { education, personalInfo } from "@data/data";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "systems", label: "Projects" },
  { id: "evolution", label: "Experience" },
  { id: "stack", label: "Skills" },
  { id: "terminal", label: "Contact" },
];

const NAV_OFFSET = 108;

const App = () => {
  const [active, setActive] = useState("about");

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (event, id) => {
    event.preventDefault();
    setActive(id);
    scrollToSection(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const handleQuickNav = (id) => {
    setActive(id);
    scrollToSection(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "");
    if (NAV_ITEMS.some((item) => item.id === currentHash)) {
      setActive(currentHash);
    }

    const updateActiveFromScroll = () => {
      const marker = window.scrollY + NAV_OFFSET + 24;
      let currentSection = NAV_ITEMS[0].id;

      NAV_ITEMS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && marker >= section.offsetTop) {
          currentSection = id;
        }
      });

      setActive((prev) => (prev === currentSection ? prev : currentSection));
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);

    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#04020b] text-[#e7eeff] antialiased">
      <VoiceAssistant />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(78,162,255,0.18),transparent_32%),radial-gradient(circle_at_20%_20%,rgba(92,67,255,0.22),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(31,226,255,0.12),transparent_35%)]" />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-cyan-300/20 bg-[#080712]/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => handleQuickNav("about")}
            className="text-lg font-bold tracking-tight text-cyan-200 transition hover:text-white"
          >
            ADITYA SONI
          </button>

          <div className="hidden items-center gap-8 font-display text-sm uppercase tracking-tight md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
                className={`pb-1 transition-all duration-300 ${
                  active === item.id
                    ? "border-b-2 border-cyan-300 font-bold text-cyan-200"
                    : "font-medium text-neutral-300 hover:text-violet-200"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleQuickNav("systems")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-cyan-200"
              aria-label="Projects"
            >
              <RiCpuLine className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => handleQuickNav("terminal")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-cyan-200"
              aria-label="Contact"
            >
              <RiTerminalBoxLine className="h-5 w-5" />
            </button>
            <a
              href="#terminal"
              onClick={(event) => handleNavClick(event, "terminal")}
              className="hidden rounded-full border border-cyan-200/30 bg-cyan-100/10 px-6 py-2 font-display text-sm uppercase tracking-tight text-cyan-100 transition-all duration-300 hover:bg-cyan-100/20 md:block"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pb-20 pt-32">
        <section
          id="hero"
          className="relative mx-auto mb-24 flex min-h-[560px] w-full max-w-[1200px] flex-col justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />

          <div className="relative z-10 max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-100/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-100">
              <RiSparklingLine className="h-4 w-4" />
              AI Engineer + Full-Stack Developer
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-[#f2f6ff] sm:text-6xl">
              {personalInfo.tagline}
            </h1>
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-[#b8c5e6]">{personalInfo.subheadline}</p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`#${personalInfo.cta.primary.scrollTarget}`}
                onClick={(event) => handleNavClick(event, personalInfo.cta.primary.scrollTarget)}
                className="rounded-full border border-transparent bg-gradient-to-r from-cyan-300 to-blue-300 px-8 py-3 font-mono text-xs tracking-[0.1em] text-[#111527] transition-opacity hover:opacity-90"
              >
                {personalInfo.cta.primary.label}
              </a>
              <a
                href={personalInfo.cta.secondary.href || `#${personalInfo.cta.secondary.scrollTarget}`}
                onClick={
                  personalInfo.cta.secondary.scrollTarget
                    ? (event) => handleNavClick(event, personalInfo.cta.secondary.scrollTarget)
                    : undefined
                }
                target={personalInfo.cta.secondary.external ? "_blank" : undefined}
                rel={personalInfo.cta.secondary.external ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-violet-200/40 px-8 py-3 font-mono text-xs tracking-[0.1em] text-violet-100 transition-colors hover:bg-violet-200/10"
              >
                <RiDownloadLine className="h-4 w-4" />
                {personalInfo.cta.secondary.label}
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto mb-24 w-full max-w-[1200px] scroll-mt-32 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <article className="glass-card rounded-2xl border border-cyan-200/20 bg-white/5 p-7 lg:col-span-2">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-cyan-100/80">About</p>
              <h2 className="mb-4 font-display text-3xl font-semibold text-[#f2f6ff]">AI Engineer + Full-Stack Builder</h2>
              <p className="text-base leading-relaxed text-[#c5d1ef]">{personalInfo.about}</p>
            </article>

            <aside className="glass-card rounded-2xl border border-violet-200/25 bg-white/5 p-7">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-violet-100/80">Snapshot</p>
              <ul className="space-y-3 text-sm text-[#d6dfff]">
                <li>
                  <span className="text-violet-200">Name:</span> {personalInfo.name}
                </li>
                <li>
                  <span className="text-violet-200">Role:</span> {personalInfo.role}
                </li>
                <li>
                  <span className="text-violet-200">Experience:</span> {personalInfo.yearsOfExperience} years
                </li>
                <li>
                  <span className="text-violet-200">Current Company:</span> {personalInfo.company}
                </li>
                <li>
                  <span className="text-violet-200">Location:</span> {personalInfo.location}
                </li>
              </ul>
            </aside>
          </div>

          <div className="mt-8 glass-card rounded-2xl border border-cyan-200/20 bg-white/5 p-7">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-cyan-100/80">Education</p>
            {education.map((item) => (
              <article key={item.id} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#eff4ff]">{item.degree}</h3>
                  <p className="text-sm text-[#c5d1ef]">{item.institution}</p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-cyan-100/80">{item.period}</p>
              </article>
            ))}
          </div>
        </section>

        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-cyan-200/10 bg-[#07060f] py-14">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-8">
          <div className="text-lg font-black text-cyan-100">ADITYA SONI</div>
          <div className="flex flex-wrap items-center gap-6 font-display text-[10px] uppercase tracking-[0.25em] text-neutral-500">
            <a href="#systems" className="transition-colors hover:text-cyan-300">
              Projects
            </a>
            <a href="#evolution" className="transition-colors hover:text-cyan-300">
              Experience
            </a>
            <a href="#stack" className="transition-colors hover:text-cyan-300">
              Skills
            </a>
            <a href="#terminal" className="transition-colors hover:text-cyan-300">
              Contact
            </a>
          </div>
          <div className="font-display text-[10px] uppercase tracking-[0.25em] text-neutral-500">
            2026 AI ENGINEER PORTFOLIO
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
