import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { error } = await supabase.from("users").select().limit(1);
    if (error) throw new Error(error.message);
    return Response.json({ success: true });
  } catch (error) {
    const message = (error as Error).message ?? "An error occurred.";
    return Response.json({ success: false, error: message }, { status: 400 });
  }
}
