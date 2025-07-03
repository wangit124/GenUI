import { UseGenerateCodeMutationInput } from "@/hooks/useGenerateCode";
import {
  anthropic,
  ANTHROPIC_MODELS,
  MAX_OUTPUT_TOKEN_COUNT,
} from "@/lib/anthropic";
import { Generation } from "@/lib/generation";
import { getGenerateCodeLLMPrompt } from "@/lib/prompts";
import { GeneratedFile } from "@/lib/types";
import { User } from "@/lib/user";
import { ContentBlockParam } from "@anthropic-ai/sdk/resources/index.mjs";

export async function POST(request: Request) {
  const figmaUserId = request?.headers?.get("x-figma-user-id");
  if (!figmaUserId) {
    throw new Error("Unauthorized");
  }
  const user = await User.findOrCreate(figmaUserId);
  if (!user) {
    throw new Error("Unauthorized");
  }

  const body: UseGenerateCodeMutationInput = await request.json();
  const { configuration, figmaImages } = body;

  const prompt = getGenerateCodeLLMPrompt(configuration);

  console.info({ prompt });

  const figmaImagesToMessage: ContentBlockParam[] = figmaImages.map(
    (imageUrl) => ({
      type: "image",
      source: {
        type: "url",
        url: imageUrl,
      },
    })
  );

  console.info({ figmaImagesToMessage });

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

  // @ts-expect-error text field actually exists
  const llmText = response?.content?.[0]?.text as string;

  console.info({ llmText });

  const files: GeneratedFile[] = JSON.parse(llmText);
  const tokensUsed = response.usage.input_tokens + response.usage.output_tokens;

  console.info({ files, tokensUsed });

  try {
    await Generation.create({ userId: user.id, tokenCount: tokensUsed });
  } catch (error) {
    console.error(error);
  }

  return new Response(JSON.stringify({ files, tokensUsed }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
