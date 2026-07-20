import React from "react";
import type { ResumeData } from "../types";

export const ModernTemplate: React.FC<{ data: ResumeData; theme?: any }> = ({ data, theme }) => {
  const { header, summary, workExperience, education, skills } = data;
  const accent = theme?.accentColor || "var(--brand)";

  return (
    <div className="p-8 bg-white text-zinc-800 max-w-[800px] mx-auto text-left font-sans flex flex-col gap-6">
      {/* Header */}
      {header && (
        <div className="border-l-4 pl-4 border-solid" style={{ borderColor: accent }}>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950">{header.name || "Your Name"}</h1>
          <p className="text-xs text-zinc-500 font-semibold mt-0.5">{header.headline || "Professional Headline"}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xxs text-zinc-500 mt-2 font-medium">
            {header.email && <span>{header.email}</span>}
            {header.phone && <span>{header.phone}</span>}
            {header.location && <span>{header.location}</span>}
            {header.website && <span className="underline">{header.website}</span>}
          </div>
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left main pane */}
        <div className="col-span-2 space-y-6">
          {summary?.body && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-zinc-950 uppercase border-b pb-1">Profile</h3>
              <p className="text-xxs sm:text-xs text-zinc-600 leading-relaxed">{summary.body}</p>
            </div>
          )}

          {workExperience && workExperience.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-950 uppercase border-b pb-1">Experience</h3>
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
        </div>

        {/* Right sidebar pane */}
        <div className="space-y-6">
          {skills && skills.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-950 uppercase border-b pb-1">Skills</h3>
              <div className="space-y-3">
                {skills.map((grp, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-xxs font-bold text-zinc-700">{grp.category}</h4>
                    <div className="flex flex-wrap gap-1">
                      {grp.skills?.map((s) => (
                        <span key={s.name} className="bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded text-[10px] font-medium">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-950 uppercase border-b pb-1">Education</h3>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-xxs font-bold text-zinc-800">{edu.school}</h4>
                    <p className="text-[10px] text-zinc-500 leading-normal font-medium">
                      {edu.degree}
                    </p>
                    <span className="text-[9px] text-zinc-400 font-semibold">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ModernTemplate;
