import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...');
        
        // Test basic connection
        const { data, error: healthError } = await supabase.from('testimonials').select('count');
        if (healthError) {
          console.error('Health check error:', healthError);
          throw healthError;
        }
        
        console.log('Basic connection successful:', data);
        
        // Test authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.log('Auth check (expected to be null for anonymous):', authError);
        }
        
        console.log('Auth check completed:', user);
        
        // Test database query
        const { data: testData, error: dbError } = await supabase
          .from('testimonials')
          .select('id')
          .limit(1);
          
        if (dbError) {
          console.error('Database query error:', dbError);
          throw dbError;
        }
        
        console.log('Database query successful:', testData);
        
        setConnectionStatus('connected');
        setError(null);
      } catch (err) {
        console.error('Supabase connection error:', err);
        setConnectionStatus('error');
        setError(err instanceof Error 
          ? err.message 
          : err && typeof err === 'object' && 'message' in err 
            ? String(err.message) 
            : 'Failed to connect to Supabase. Please check your configuration.');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm z-50">
      {connectionStatus === 'checking' && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg border border-yellow-200">
          <p className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Checking Supabase connection...
          </p>
        </div>
      )}
      
      {connectionStatus === 'connected' && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200">
          <p className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Supabase connection successful!
          </p>
        </div>
      )}
      
      {connectionStatus === 'error' && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200">
          <p className="flex items-center font-medium">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Supabase Connection Error
          </p>
          {error && (
            <div className="mt-2 text-sm space-y-1">
              <p className="font-medium">Error details:</p>
              <p className="text-red-700">{error}</p>
              <p className="text-xs text-red-600 mt-1">
                Please check:
                <ul className="list-disc list-inside mt-1">
                  <li>Your Supabase URL and anon key are correct</li>
                  <li>The database is online and accessible</li>
                  <li>Required tables exist in the database</li>
                </ul>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SupabaseTest;
