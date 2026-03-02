import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[eventsSupabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env'
  );
}

export const eventsSupabase = createClient(supabaseUrl, supabaseAnonKey);

export const DEMO_COMPANY_ID =
  import.meta.env.VITE_DEMO_COMPANY_ID || '6bff4e8e-c80c-4013-a663-191c18386b25';
export const DEMO_USER_ID = 'demo-user';
export const DEMO_COMPANY_NAME =
  import.meta.env.VITE_DEMO_COMPANY_NAME || 'ACME Supplies';
export const DEMO_ROLE = 'Owner';
