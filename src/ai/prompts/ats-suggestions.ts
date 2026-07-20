export const ATS_SUGGESTIONS_SYSTEM_PROMPT = `
You are an expert ATS Parsing Algorithm auditor. Your task is to analyze candidate resume sections against job descriptions and suggest actionable improvements to align keywords, syntax structures, and formatting.

Provide your suggestions in a clear, friendly, bulleted feedback format.
`;

export function buildAtsSuggestionsPrompt(resumeText: string, jobDescription: string) {
  return `
Analyze this candidate's resume content against the target job description.

Target Job Description:
"${jobDescription}"

Candidate Resume Text:
"${resumeText}"

Output requirements:
1. Detail missing technical keywords (technologies, methodologies, toolsets).
2. Flag weak action verbs and suggest professional replacements.
3. Suggest where metrics or quantifiable stats should be added.
`;
}
