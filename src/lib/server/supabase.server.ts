import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type SupabaseServerDatabase = {
  public: {
    Tables: {
      app_snapshots: {
        Row: {
          id: string;
          owner_id: string | null;
          scope: string;
          payload: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          owner_id?: string | null;
          scope: string;
          payload: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string | null;
          scope?: string;
          payload?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

let serverSupabaseClient: SupabaseClient<SupabaseServerDatabase> | null = null;

function serverSupabaseUrl(): string | null {
  return process.env.SUPABASE_URL?.trim() || process.env.VITE_SUPABASE_URL?.trim() || null;
}

function serverSupabaseAnonKey(): string | null {
  return (
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.VITE_SUPABASE_ANON_KEY?.trim() ||
    null
  );
}

export function isServerSupabaseConfigured(): boolean {
  return Boolean(serverSupabaseUrl() && serverSupabaseAnonKey());
}

export function getServerSupabaseClient(): SupabaseClient<SupabaseServerDatabase> | null {
  const url = serverSupabaseUrl();
  const anonKey = serverSupabaseAnonKey();
  if (!url || !anonKey) return null;

  if (!serverSupabaseClient) {
    serverSupabaseClient = createClient<SupabaseServerDatabase>(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return serverSupabaseClient;
}
