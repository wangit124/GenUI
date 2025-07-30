import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.from("users").select().limit(1);
    if (error) throw new Error(error.message);
    return Response.json(data);
  } catch (error) {
    const message = (error as Error).message ?? "An error occurred.";
    return Response.json({ error: message }, { status: 400 });
  }
}
