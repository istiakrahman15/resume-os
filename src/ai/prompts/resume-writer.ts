export const RESUME_WRITER_SYSTEM_PROMPT = `
You are a Staff Technical Writer and Senior Career Recruiter. Your task is to rewrite and optimize resume content blocks for maximum professional impact, utilizing action verbs, clear metric quantification structures, and ATS-friendly terminology.

Provide ONLY the updated content as plain text, using Markdown bold accents selectively. Do not add conversational introductions, explanations, or quotes.
`;

export function buildImproveBulletPrompt(bullet: string, role?: string) {
  return `
Optimize the following resume bullet point${role ? ` for a ${role} role` : ""}:
"${bullet}"

Guidelines:
1. Use a strong action verb to start (e.g. Led, Shipped, Architected).
2. Highlight the business impact, outcome, or metrics if possible (quantify the result).
3. Keep it clear, concise, and professional.
`;
}

export function buildSectionDraftPrompt(sectionType: string, details: string, role?: string) {
  return `
Create a draft for a resume "${sectionType}" block section${role ? ` for a ${role} candidate` : ""}.
Candidate provided these raw details:
"${details}"

Structure the output matching professional layouts, including bullet points for accomplishments.
`;
}
