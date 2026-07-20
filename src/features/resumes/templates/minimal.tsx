import React from "react";
import type { ResumeData } from "../types";

export const MinimalTemplate: React.FC<{ data: ResumeData; theme?: any }> = ({ data, theme }) => {
  const { header, summary, workExperience, education, skills } = data;
  const densityClass =
    theme?.density === "compact"
      ? "space-y-4"
      : theme?.density === "spacious"
      ? "space-y-8"
      : "space-y-6";

  return (
    <div className={`p-8 bg-white text-black max-w-[800px] mx-auto text-left font-sans ${densityClass}`}>
      {/* Contact Header */}
      {header && (
        <div className="border-b border-zinc-200 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{header.name || "Your Name"}</h1>
          <p className="text-xs text-zinc-500 font-semibold mt-1">{header.headline || "Professional Headline"}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xxs text-zinc-500 mt-2 font-medium">
            {header.email && <span>{header.email}</span>}
            {header.phone && <span>{header.phone}</span>}
            {header.location && <span>{header.location}</span>}
            {header.website && (
              <a href={header.website} className="underline" target="_blank" rel="noreferrer">
                {header.website}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {summary?.body && (
        <div className="space-y-1.5">
          <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-400">Profile Summary</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">{summary.body}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-400">Work Experience</h3>
          <div className="space-y-4">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline gap-4">
                  <h4 className="text-xs font-bold text-zinc-800">{exp.company}</h4>
                  <span className="text-xxs text-zinc-400 font-medium">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-xxs text-zinc-500 font-semibold">{exp.title}</p>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc pl-4 text-xxs text-zinc-600 space-y-0.5 mt-1 leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-400">Education</h3>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline gap-4">
                  <h4 className="text-xs font-bold text-zinc-800">{edu.school}</h4>
                  <span className="text-xxs text-zinc-400 font-medium">
                    {edu.startDate} — {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-xxs text-zinc-500 font-semibold">
                  {edu.degree} in {edu.fieldOfStudy} {edu.gpa && `(GPA: ${edu.gpa})`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-400">Skills</h3>
          <div className="space-y-2">
            {skills.map((grp, idx) => (
              <div key={idx} className="text-xxs text-zinc-600">
                <span className="font-bold text-zinc-700">{grp.category}: </span>
                <span>{grp.skills?.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default MinimalTemplate;
