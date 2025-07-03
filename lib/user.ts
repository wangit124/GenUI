import { supabase } from "./supabase";

class User {
  static findOrCreate = async (figmaUserId: string) => {
    const { data: users, error: findError } = await supabase
      .from("users")
      .select()
      .eq("figma_user_id", figmaUserId)
      .limit(1);

    if (findError) {
      console.error("SUPABASE", { findError });
      throw new Error("could not find user");
    }

    if (users?.length) {
      return users[0];
    }

    // Only create if not already created
    const { data, error: insertError } = await supabase.from("users").insert({
      figma_user_id: figmaUserId,
    });

    if (insertError) {
      console.error("SUPABASE", { insertError });
      throw new Error("could not insert user");
    }

    return data;
  };
}

export { User };
