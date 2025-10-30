import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Supabase environment variables are not set. Please check your .env.local file.")
    console.error("[v0] Missing:", {
      url: !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : "✓",
      key: !supabaseAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : "✓",
    })
  }

  return createBrowserClient(supabaseUrl || "https://placeholder.supabase.co", supabaseAnonKey || "placeholder-key")
}
