import { supabase } from "./supabase";

class Generation {
  static create = async ({
    userId,
    tokenCount,
  }: {
    userId: string;
    tokenCount: number;
  }) => {
    const { data, error: insertError } = await supabase
      .from("generations")
      .insert({
        user_id: userId,
        token_count: tokenCount,
      });
    if (insertError) {
      console.error("SUPABASE", { insertError });
    }
    console.info("SUPABASE", `Generation created ${data}`);
    return data;
  };

  static count = async (userId: string) => {
    const { count, error: countError } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (countError) {
      console.error("SUPABASE", { countError });
    }

    return count;
  };
}

export { Generation };
