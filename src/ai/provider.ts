export interface StreamChatOptions {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
}

/**
 * Standardized AI provider wrapper communicating directly with REST endpoints.
 * Prevents bloating node_modules and offers simple swap-ability for OpenAI, Anthropic, and Ollama.
 */
export class AiProvider {
  private provider: string;
  private apiKey: string;
  private model: string;

  constructor() {
    this.provider = process.env.AI_PROVIDER || "openai";
    this.apiKey = process.env.AI_API_KEY || "";
    this.model = process.env.AI_MODEL || "gpt-4o";
  }

  /**
   * Streams chat completions from the active LLM provider.
   */
  async streamChat(opts: StreamChatOptions): Promise<ReadableStream> {
    switch (this.provider) {
      case "anthropic":
        return this.streamAnthropic(opts);
      case "ollama":
        return this.streamOllama(opts);
      case "openai":
      default:
        return this.streamOpenAi(opts);
    }
  }

  private async streamOpenAi(opts: StreamChatOptions): Promise<ReadableStream> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: opts.systemPrompt },
          { role: "user", content: opts.userPrompt },
        ],
        temperature: opts.temperature ?? 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API failed: ${response.statusText}`);
    }

    return response.body!;
  }

  private async streamAnthropic(opts: StreamChatOptions): Promise<ReadableStream> {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.model,
        system: opts.systemPrompt,
        messages: [{ role: "user", content: opts.userPrompt }],
        max_tokens: 2000,
        temperature: opts.temperature ?? 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API failed: ${response.statusText}`);
    }

    return response.body!;
  }

  private async streamOllama(opts: StreamChatOptions): Promise<ReadableStream> {
    const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434";
    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: opts.systemPrompt },
          { role: "user", content: opts.userPrompt },
        ],
        options: {
          temperature: opts.temperature ?? 0.7,
        },
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama local endpoint failed: ${response.statusText}`);
    }

    return response.body!;
  }
}
