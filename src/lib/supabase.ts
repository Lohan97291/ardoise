import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type SupabaseDatabase = {
  public: {
    Tables: {
      app_profiles: {
        Row: {
          id: string;
          display_name: string | null;
          role: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          display_name?: string | null;
          role?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          role?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

let supabaseClient: SupabaseClient<SupabaseDatabase> | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient(): SupabaseClient<SupabaseDatabase> | null {
  if (!isSupabaseConfigured()) return null;
  if (!supabaseClient) {
    supabaseClient = createClient<SupabaseDatabase>(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseClient;
}

export async function healthcheckSupabase(): Promise<{
  ok: boolean;
  message: string;
}> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      ok: false,
      message: "Supabase n'est pas encore configuré dans l'application.",
    };
  }

  const { error } = await client.from("app_snapshots").select("id").limit(1);
  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
    message: "Connexion Supabase prête.",
  };
}
