import { NextResponse } from "next/server";
import { AiProvider } from "@/src/ai/provider";
import { ATS_SUGGESTIONS_SYSTEM_PROMPT, buildAtsSuggestionsPrompt } from "@/src/ai/prompts/ats-suggestions";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { resumeText, jobDescription } = await request.json();
    const provider = new AiProvider();

    const userPrompt = buildAtsSuggestionsPrompt(resumeText, jobDescription);

    const aiStream = await provider.streamChat({
      systemPrompt: ATS_SUGGESTIONS_SYSTEM_PROMPT,
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
    console.error("AI ATS Suggestions API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
