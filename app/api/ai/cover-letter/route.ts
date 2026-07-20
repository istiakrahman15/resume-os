import { NextResponse } from "next/server";
import { AiProvider } from "@/src/ai/provider";
import { COVER_LETTER_SYSTEM_PROMPT, buildCoverLetterPrompt } from "@/src/ai/prompts/cover-letter";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { role, company, hiringManager, resumeDetails, jobDescription, tone } = await request.json();
    const provider = new AiProvider();

    const userPrompt = buildCoverLetterPrompt({
      role,
      company,
      hiringManager,
      resumeDetails,
      jobDescription,
      tone,
    });

    const aiStream = await provider.streamChat({
      systemPrompt: COVER_LETTER_SYSTEM_PROMPT,
      userPrompt,
    });

    return new Response(aiStream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("AI Cover Letter API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
