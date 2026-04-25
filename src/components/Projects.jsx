import { projects } from "@data/data";
import { RiArrowRightLine, RiFlashlightLine } from "react-icons/ri";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";

const Projects = () => {
  return (
    <section id="systems" className="mx-auto mb-28 w-full max-w-[1200px] scroll-mt-32 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center gap-4">
        <HiOutlineCodeBracketSquare className="h-6 w-6 text-cyan-100" />
        <h2 className="font-display text-3xl font-semibold text-[#f2f6ff]">AI Product Projects</h2>
        <div className="ml-2 h-px flex-1 bg-cyan-200/20" />
      </div>

      <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="glass-card group overflow-hidden rounded-2xl border border-cyan-200/20 bg-white/5 p-7 shadow-[0_0_0_1px_rgba(160,208,255,0.04)] transition duration-300 hover:border-cyan-200/40"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full border border-cyan-200/30 bg-cyan-100/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.11em] text-cyan-100">
                Premium Build
              </span>
              <span className="rounded-full border border-violet-200/30 bg-violet-200/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.11em] text-violet-100">
                AI + Backend
              </span>
            </div>

            <h3 className="mb-3 font-display text-2xl font-medium text-[#f2f6ff]">{project.title}</h3>
            <p className="mb-4 text-base leading-relaxed text-[#c5d1ef]">{project.description}</p>

            <div className="mb-5 rounded-xl border border-cyan-200/20 bg-[#0a0f22]/60 p-4">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.11em] text-cyan-100/80">Impact</p>
              <p className="text-sm text-[#d2dcf8]">{project.impact}</p>
            </div>

            <div className="mb-5 flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => (
                <span
                  key={`${project.id}-${tech}`}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#dce6ff]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mb-6 space-y-2">
              {project.highlights.map((point) => (
                <p key={`${project.id}-${point}`} className="flex items-start gap-2 text-sm text-[#c5d1ef]">
                  <RiFlashlightLine className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                  <span>{point}</span>
                </p>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] text-cyan-100 transition-colors group-hover:text-white">
              PRODUCT_CASE_STUDY
              <RiArrowRightLine className="h-4 w-4" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
