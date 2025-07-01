import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export async function GET() {
  const redirectUrl = encodeURIComponent(
    "http://localhost:3001/figma/oauth/callback"
  );
  const scope =
    "file_content:read,file_dev_resources:read,file_metadata:read,file_versions:read,projects:read";
  const state = encodeURIComponent(randomUUID());

  redirect(
    `https://www.figma.com/oauth?client_id=${process.env.FIGMA_CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope}&state=${state}&response_type=code`
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { code, state } = body;

  console.log({ code, state });
  const base64EncodedClientIdAndSecret = Buffer.from(
    `${process.env.FIGMA_CLIENT_ID}:${process.env.FIGMA_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`https://api.figma.com/v1/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64EncodedClientIdAndSecret}`,
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: encodeURIComponent(
        "http://localhost:3001/api/figma/oauth/callback"
      ),
    }),
  });

  const responseJson = await response.json();
  console.log({ responseJson });

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
