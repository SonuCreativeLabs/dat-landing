import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ufywpifbqbzampiiuetc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmeXdwaWZicWJ6YW1waWl1ZXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5MjY4MDAsImV4cCI6MjAyMTUwMjgwMH0.GG5UNsF4HmSHvSvQB_-JzHLGl-Kh_x9YI_eGBZQe8Yk";

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
  throw new Error('Missing Supabase configuration. Please check your configuration.');
}

if (!isValidSupabaseUrl) {
  throw new Error('Invalid Supabase URL format. URL should be like: https://your-project.supabase.co');
}

if (!isValidAnonKey) {
  throw new Error('Invalid Supabase anon key format. Key should be a JWT token starting with "ey"');
}

// Create Supabase client with additional options for better error handling
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});