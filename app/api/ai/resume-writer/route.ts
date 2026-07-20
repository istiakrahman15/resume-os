import { NextResponse } from "next/server";
import { AiProvider } from "@/src/ai/provider";
import { RESUME_WRITER_SYSTEM_PROMPT, buildImproveBulletPrompt, buildSectionDraftPrompt } from "@/src/ai/prompts/resume-writer";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { action, bullet, role, sectionType, details } = await request.json();
    const provider = new AiProvider();

    let userPrompt = "";
    if (action === "improve-bullet") {
      userPrompt = buildImproveBulletPrompt(bullet, role);
    } else if (action === "generate-section") {
      userPrompt = buildSectionDraftPrompt(sectionType, details, role);
    } else {
      return NextResponse.json({ error: "Invalid action type." }, { status: 400 });
    }

    const aiStream = await provider.streamChat({
      systemPrompt: RESUME_WRITER_SYSTEM_PROMPT,
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
    console.error("AI Resume Writer API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
