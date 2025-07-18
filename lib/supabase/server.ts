import { createClient } from "@supabase/supabase-js"

// Create a single Supabase client for server-side operations
// This client uses the service_role key and bypasses RLS,
// so it should ONLY be used in secure server environments (Server Actions, API Routes).
export const supabaseServer = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    persistSession: false,
  },
})
