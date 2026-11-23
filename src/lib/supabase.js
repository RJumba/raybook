
import { createClient } from "@supabase/supabase-js";

// Supabase project configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Validate the configuration
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables"
  );
}

// Create one reusable Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
