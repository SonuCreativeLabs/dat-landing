import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate configuration
const config = {
  url: supabaseUrl,
  key: supabaseKey,
  urlValid: typeof supabaseUrl === 'string' && supabaseUrl.length > 0,
  keyValid: typeof supabaseKey === 'string' && supabaseKey.length > 0,
};

console.log('Supabase Configuration:', config);

// Create a singleton instance
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const supabase = (() => {
  if (!supabaseInstance) {
    if (!config.urlValid || !config.keyValid) {
      throw new Error('Invalid Supabase configuration. Please check your environment variables.');
    }
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        storageKey: 'dreams-air-tech-auth',
      },
    });
  }
  return supabaseInstance;
})();

// Export singleton instance
export default supabase;