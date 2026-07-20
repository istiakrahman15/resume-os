import React from "react";
import type { ResumeData } from "../types";

export const ClassicTemplate: React.FC<{ data: ResumeData; theme?: any }> = ({ data, theme }) => {
  const { header, summary, workExperience, education, skills } = data;

  return (
    <div className="p-10 bg-white text-zinc-900 max-w-[800px] mx-auto text-center font-serif space-y-6">
      {/* Centered header */}
      {header && (
        <div className="border-b border-zinc-200 pb-4 flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tight font-serif text-zinc-950">{header.name || "Your Name"}</h1>
          <p className="text-xs text-zinc-500 italic mt-0.5">{header.headline || "Professional Headline"}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xxs text-zinc-500 mt-2 font-serif font-medium">
            {header.email && <span>{header.email}</span>}
            {header.phone && <span>{header.phone}</span>}
            {header.location && <span>{header.location}</span>}
            {header.website && <span className="underline">{header.website}</span>}
          </div>
        </div>
      )}

      {/* Profile */}
      {summary?.body && (
        <div className="space-y-1.5 text-left">
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-zinc-900 font-serif border-b pb-0.5">Profile Summary</h3>
          <p className="text-xxs sm:text-xs text-zinc-700 leading-relaxed font-serif">{summary.body}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <div className="space-y-4 text-left">
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-zinc-900 font-serif border-b pb-0.5">Experience</h3>
          <div className="space-y-4">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline gap-4">
                  <h4 className="text-xs font-bold text-zinc-800">{exp.company} — <span className="italic font-normal">{exp.title}</span></h4>
                  <span className="text-xxs text-zinc-400 font-medium">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc pl-4 text-xxs text-zinc-700 space-y-0.5 mt-1 leading-relaxed">
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
        <div className="space-y-4 text-left">
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-zinc-900 font-serif border-b pb-0.5">Education</h3>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline gap-4">
                  <h4 className="text-xs font-bold text-zinc-800">{edu.school}</h4>
                  <span className="text-xxs text-zinc-400 font-medium">
                    {edu.startDate} — {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-xxs text-zinc-500 font-medium italic">
                  {edu.degree} in {edu.fieldOfStudy} {edu.gpa && `(GPA: ${edu.gpa})`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="space-y-4 text-left">
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-zinc-900 font-serif border-b pb-0.5">Skills</h3>
          <div className="space-y-2">
            {skills.map((grp, idx) => (
              <div key={idx} className="text-xxs text-zinc-700">
                <span className="font-bold text-zinc-800">{grp.category}: </span>
                <span>{grp.skills?.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ClassicTemplate;
