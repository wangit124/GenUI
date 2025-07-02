import {
  DEFAULT_TOKEN_EXPIRES_IN,
  FIGMA_OAUTH_CALLBACK_URL,
  FIGMA_TOKEN_ENDPOINT,
  getFigmaOAuthUrl,
} from "@/lib/figma";
import { randomUUID } from "crypto";
import { addSeconds } from "date-fns";
import { redirect } from "next/navigation";

export async function GET() {
  const redirectUrl = encodeURIComponent(FIGMA_OAUTH_CALLBACK_URL);
  const scope = "file_content:read,file_metadata:read,file_versions:read";
  const state = encodeURIComponent(randomUUID());
  redirect(getFigmaOAuthUrl({ redirectUrl, scope, state }));
}

export async function POST(request: Request) {
  const body = await request.json();
  const { code, state } = body;

  if (!code || !state) {
    throw new Error("Invalid auth request");
  }

  const base64EncodedClientIdAndSecret = Buffer.from(
    `${process.env.FIGMA_CLIENT_ID}:${process.env.FIGMA_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(FIGMA_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64EncodedClientIdAndSecret}`,
    },
    body: `redirect_uri=${encodeURIComponent(FIGMA_OAUTH_CALLBACK_URL)}&code=${code}&grant_type=authorization_code`,
  });

  const {
    user_id_string: userId,
    access_token: accessToken,
    expires_in: expiresIn,
  } = await response.json();

  const expireDate = addSeconds(
    new Date(),
    Math.min(DEFAULT_TOKEN_EXPIRES_IN, expiresIn)
  );

  return new Response(JSON.stringify({ userId, accessToken, expireDate }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
