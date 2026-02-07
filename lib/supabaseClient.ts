import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid crashing during build when env vars are not set
let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) {
      throw new Error('Supabase env vars (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set.');
    }
    _supabase = createClient(url, anonKey);
  }
  return _supabase;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      throw new Error('Supabase admin env vars (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) are not set.');
    }
    _supabaseAdmin = createClient(url, serviceKey);
  }
  return _supabaseAdmin;
}
