import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate URL and key format
const isValidSupabaseUrl = SUPABASE_URL?.match(/^https:\/\/[a-z0-9-]+\.supabase\.co$/i);
const isValidAnonKey = SUPABASE_ANON_KEY?.match(/^ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);

// Debug configuration
if (import.meta.env.DEV) {
  console.log('Supabase Configuration:', {
    url: SUPABASE_URL,
    key: SUPABASE_ANON_KEY?.substring(0, 10) + '...',
    urlValid: !!isValidSupabaseUrl,
    keyValid: !!isValidAnonKey,
  });
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase configuration. Please check your .env file.');
}

if (!isValidSupabaseUrl || !isValidAnonKey) {
  throw new Error('Invalid Supabase configuration. Please check your .env file.');
}

// Create a singleton instance
let instance: ReturnType<typeof createClient<Database>> | null = null;

export const supabase = (() => {
  if (instance === null) {
    instance = createClient<Database>(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          storageKey: 'dreams-air-tech-auth',
          storage: window.localStorage,
          autoRefreshToken: true,
          debug: import.meta.env.DEV,
          detectSessionInUrl: true,
          flowType: 'pkce'
        }
      }
    );
  }
  return instance;
})();

// Export singleton instance
export default supabase;