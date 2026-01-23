import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pxeqomxpuaabanziyyyu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZXFvbXhwdWFhYmFueml5eXl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDU5NzY0NCwiZXhwIjoyMDgwMTczNjQ0fQ.f2x_4whZL810A1wUQuQaqeUbN2kSdR0c66gLHDECFtM';

export const eventsSupabase = createClient(supabaseUrl, supabaseAnonKey);

export const DEMO_COMPANY_ID = '6bff4e8e-c80c-4013-a663-191c18386b25';
export const DEMO_USER_ID = 'demo-user';
export const DEMO_COMPANY_NAME = 'ACME Supplies';
export const DEMO_ROLE = 'Owner';
