import { UseGenerateCodeMutationInput } from "@/hooks/useGenerateCode";
import {
  anthropic,
  ANTHROPIC_MODELS,
  MAX_OUTPUT_TOKEN_COUNT,
} from "@/lib/anthropic";
import { getGenerateCodeLLMPrompt } from "@/lib/prompts";
import { ContentBlockParam } from "@anthropic-ai/sdk/resources/index.mjs";

export async function POST(request: Request) {
  const userId = request?.headers?.get("x-user-id");
  const figmaAccessToken = request?.headers?.get("x-figma-access-token");

  if (!userId || !figmaAccessToken) {
    throw new Error("Unauthorized");
  }

  const body: UseGenerateCodeMutationInput = await request.json();
  const { configuration, uploadedFilesBase64, figmaImages } = body;

  const base64ImagesToMessage: ContentBlockParam[] = uploadedFilesBase64.map(
    (file) => ({
      type: "image",
      source: {
        type: "base64",
        media_type: "image/jpeg",
        data: file,
      },
    })
  );

  const figmaImagesToMessage: ContentBlockParam[] = figmaImages.map(
    (imageUrl) => ({
      type: "image",
      source: {
        type: "url",
        url: imageUrl,
      },
    })
  );

  console.log({ prompt: getGenerateCodeLLMPrompt(configuration) });

  const message = await anthropic.messages.create({
    model: ANTHROPIC_MODELS.CLAUDE_SONNET_4,
    max_tokens: MAX_OUTPUT_TOKEN_COUNT,
    messages: [
      {
        role: "user",
        content: [
          ...base64ImagesToMessage,
          ...figmaImagesToMessage,
          {
            type: "text",
            text: getGenerateCodeLLMPrompt(configuration),
          },
        ],
      },
    ],
  });

  console.log({ message });

  return new Response(JSON.stringify({ message }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
