import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const MAX_OUTPUT_TOKEN_COUNT = 5000;

export enum ANTHROPIC_MODELS {
  CLAUDE_OPUS_4 = "claude-opus-4-0",
  CLAUDE_SONNET_4 = "claude-sonnet-4-0",
  CLAUDE_SONNET_3_7 = "claude-3-7-sonnet-latest",
  CLAUDE_SONNET_3_5 = "claude-3-5-sonnet-latest",
  CLAUDE_HAIKU_3_5 = "claude-3-5-haiku-latest",
}
