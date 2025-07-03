import { Generation } from "@/lib/generation";
import { User } from "@/lib/user";

export async function GET(request: Request) {
  const figmaUserId = request?.headers?.get("x-figma-user-id");
  if (!figmaUserId) {
    throw new Error("Unauthorized");
  }
  const user = await User.findOrCreate(figmaUserId);
  if (!user) {
    throw new Error("Unauthorized");
  }
  const count = await Generation.count(user.id);
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
