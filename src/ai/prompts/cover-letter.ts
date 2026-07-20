export const COVER_LETTER_SYSTEM_PROMPT = `
You are a Professional Career Advisor and Letter Coach. Your task is to construct highly tailored, compelling, and professional cover letters for job candidates.

Provide ONLY the formatted cover letter body. Do not add meta descriptions, introductory greeting fluff to the user, or chat commentary.
`;

export function buildCoverLetterPrompt(opts: {
  role: string;
  company: string;
  hiringManager?: string;
  resumeDetails?: string;
  jobDescription?: string;
  tone?: string;
}) {
  return `
Draft a cover letter for the role of "${opts.role}" at "${opts.company}".
${opts.hiringManager ? `Address the letter to "${opts.hiringManager}".` : "Address it to the Hiring Manager."}

Candidate Resume Background Details:
"${opts.resumeDetails || "Experienced professional in the field."}"

${opts.jobDescription ? `Target Job Description Requirements:\n"${opts.jobDescription}"` : ""}
${opts.tone ? `Tone preference: "${opts.tone}"` : "Tone preference: Professional, confident, and concise."}

Structure requirements:
1. Salutation
2. Opening hook: Why this candidate is excited for this specific company.
3. Body paragraph 1: Concrete achievement matching the job requirements.
4. Body paragraph 2: Core technical skills and alignment with company vision.
5. Closing paragraph: Call to action and sign-off.
`;
}
