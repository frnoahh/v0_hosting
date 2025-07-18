import { createClient } from "@supabase/supabase-js"

// Create a single Supabase client for interacting with your database
// This client is for client-side and server-side usage where public key is sufficient.
// For server-side actions requiring admin privileges, a different client would be needed,
// but for auth and basic data insertion, the anon key is fine.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
