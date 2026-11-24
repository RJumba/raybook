
import { supabase } from "./supabase";

/**
 * Ensures an authenticated customer has a profile.
 *
 * If a profile already exists, it is preserved.
 * If missing, it is created automatically.
 */
export async function ensureCustomerProfile(user) {
  if (!user?.id) {
    throw new Error("An authenticated user is required.");
  }

  const fullName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name.trim() || null
      : null;

  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        full_name: fullName,
      },
      {
        onConflict: "id",
        ignoreDuplicates: true,
      }
    );

  if (error) {
    throw error;
  }
}
