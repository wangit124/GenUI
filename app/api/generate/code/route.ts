import { UseGenerateCodeMutationInput } from "@/hooks/useGenerateCode";
import {
  anthropic,
  ANTHROPIC_MODELS,
  MAX_OUTPUT_TOKEN_COUNT,
} from "@/lib/anthropic";
import { getGenerateCodeLLMPrompt } from "@/lib/prompts";
import { GeneratedFile } from "@/lib/types";
import { ContentBlockParam } from "@anthropic-ai/sdk/resources/index.mjs";

export async function POST(request: Request) {
  const userId = request?.headers?.get("x-user-id");
  const figmaAccessToken = request?.headers?.get("x-figma-access-token");

  if (!userId || !figmaAccessToken) {
    throw new Error("Unauthorized");
  }

  const body: UseGenerateCodeMutationInput = await request.json();
  const { configuration, figmaImages } = body;

  const prompt = getGenerateCodeLLMPrompt(configuration);

  const figmaImagesToMessage: ContentBlockParam[] = figmaImages.map(
    (imageUrl) => ({
      type: "image",
      source: {
        type: "url",
        url: imageUrl,
      },
    }),
  );

  const response = await anthropic.messages.create({
    model: ANTHROPIC_MODELS.CLAUDE_SONNET_4,
    max_tokens: MAX_OUTPUT_TOKEN_COUNT,
    messages: [
      {
        role: "user",
        content: [
          ...figmaImagesToMessage,
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
  });

  // @ts-ignore
  const llmText = response?.content?.[0]?.text as string;
  const files: GeneratedFile[] = JSON.parse(llmText);
  const tokensUsed = response.usage.input_tokens + response.usage.output_tokens;

  return new Response(JSON.stringify({ files, tokensUsed }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
