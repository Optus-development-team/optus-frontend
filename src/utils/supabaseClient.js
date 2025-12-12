import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');
  throw new Error('Supabase configuration is missing. Please define the required environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
