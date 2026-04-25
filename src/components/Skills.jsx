import { education, experience, skillCategories } from "@data/data";
import { RiTimelineView, RiStackLine, RiGraduationCapLine } from "react-icons/ri";

const Skills = () => {
  return (
    <section className="mx-auto mb-28 w-full max-w-[1200px] space-y-14 px-4 sm:px-6 lg:px-8">
      <div id="evolution" className="scroll-mt-32">
        <div className="mb-10 flex items-center gap-4">
          <RiTimelineView className="h-6 w-6 text-cyan-100" />
          <h2 className="font-display text-3xl font-semibold text-[#f2f6ff]">Experience Timeline</h2>
        </div>

        <div className="space-y-10 border-l border-cyan-200/30 pl-6">
          {experience.map((item, index) => (
            <article key={item.id} className="relative">
              <div
                className={`absolute -left-[31px] top-2 h-3 w-3 rounded-full ${
                  index === 0
                    ? "bg-cyan-200 ring-4 ring-cyan-300/20"
                    : "border border-cyan-200/70 bg-[#0f1324] ring-4 ring-[#0b0f1f]"
                }`}
              />

              <p className="mb-2 font-mono text-xs uppercase tracking-[0.1em] text-cyan-100/80">{item.period}</p>
              <h3 className="mb-1 font-display text-2xl font-medium text-[#f2f6ff]">
                {item.role} - {item.company}
              </h3>

              <div className="mt-3 space-y-2">
                {item.highlights.map((line) => (
                  <p key={`${item.id}-${line}`} className="text-sm leading-relaxed text-[#c5d1ef]">
                    {line}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div id="stack" className="scroll-mt-32">
        <div className="mb-10 flex items-center gap-4">
          <RiStackLine className="h-6 w-6 text-cyan-100" />
          <h2 className="font-display text-3xl font-semibold text-[#f2f6ff]">Skills Stack</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {skillCategories.map((group) => (
            <article key={group.id} className="glass-card rounded-xl border border-cyan-200/20 bg-white/5 p-6">
              <h4 className="mb-2 font-display text-xl font-semibold text-[#eef4ff]">{group.category}</h4>
              <p className="mb-4 text-sm text-[#b7c5e5]">{group.description}</p>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((item) => (
                  <span
                    key={`${group.id}-${item}`}
                    className="rounded-full border border-white/20 bg-[#0b1122] px-3 py-1 text-sm text-[#d5e0fb]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-violet-200/25 bg-white/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <RiGraduationCapLine className="h-5 w-5 text-violet-200" />
          <h3 className="font-display text-xl font-semibold text-[#f2f6ff]">Education</h3>
        </div>

        {education.map((item) => (
          <div key={item.id}>
            <p className="font-medium text-[#e5edff]">{item.degree}</p>
            <p className="text-sm text-[#c5d1ef]">{item.institution}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-violet-100/80">{item.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
