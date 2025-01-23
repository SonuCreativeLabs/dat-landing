import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate URL and key format
const isValidSupabaseUrl = SUPABASE_URL?.match(/^https:\/\/[a-z0-9-]+\.supabase\.co$/i);
const isValidAnonKey = SUPABASE_ANON_KEY?.match(/^ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);

// Debug configuration
console.log('Supabase Configuration:', {
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY?.substring(0, 10) + '...',
  urlValid: !!isValidSupabaseUrl,
  keyValid: !!isValidAnonKey,
});

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase configuration. Please check your .env file.');
}

if (!isValidSupabaseUrl || !isValidAnonKey) {
  throw new Error('Invalid Supabase configuration. Please check your .env file.');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);