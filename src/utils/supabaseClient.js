import { createClient } from '@supabase/supabase-js';

const readEnv = (key) => {
  const viteKey = `VITE_${key}`;

  // Vite compile-time env
  try {
    if (import.meta && import.meta.env) {
      if (viteKey in import.meta.env) return import.meta.env[viteKey];
      if (key in import.meta.env) return import.meta.env[key];
    }
  } catch (e) {
    // ignore
  }

  // Runtime injection via window.__ENV (for hosting platforms)
  if (typeof window !== 'undefined' && window.__ENV) {
    if (viteKey in window.__ENV) return window.__ENV[viteKey];
    if (key in window.__ENV) return window.__ENV[key];
  }

  // Fallback to process.env when available (SSR / Node)
  if (typeof process !== 'undefined' && process && process.env) {
    if (viteKey in process.env) return process.env[viteKey];
    if (key in process.env) return process.env[key];
  }

  return undefined;
};

const SUPABASE_URL = readEnv('SUPABASE_URL');
const SUPABASE_ANON_KEY = readEnv('SUPABASE_ANON_KEY');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables. Expected VITE_SUPABASE_URL or SUPABASE_URL and corresponding anon key.');
  throw new Error('Supabase configuration is missing. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or provide runtime window.__ENV).');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para guardar información de una nueva empresa
export const createCompany = async (companyData) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .insert([companyData])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating company:', error);
    return { success: false, error: error.message };
  }
};

// Función para verificar si un usuario ya tiene una empresa registrada (por whatsapp_phone_id)
export const checkUserCompany = async (phoneId) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('whatsapp_phone_id', phoneId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return { exists: !!data, data };
  } catch (error) {
    console.error('Error checking user company:', error);
    return { exists: false, error: error.message };
  }
};

// Función para verificar si un usuario ya tiene una empresa por email en el config
export const checkUserCompanyByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*');

    if (error) throw error;
    
    // Filtrar por email en el config
    const company = data?.find(c => 
      c.config?.business_info?.contact_email === email
    );
    
    return { exists: !!company, data: company };
  } catch (error) {
    console.error('Error checking user company by email:', error);
    return { exists: false, error: error.message };
  }
};
