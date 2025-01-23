import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...', {
          url: import.meta.env.VITE_SUPABASE_URL,
          keyPrefix: import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 10)
        });
        
        // Test basic connection
        const { data, error: healthError } = await supabase.from('testimonials').select('count');
        if (healthError) {
          console.error('Health check error:', healthError);
          throw healthError;
        }
        
        console.log('Basic connection successful:', data);
        setConnectionStatus('connected');
        setError(null);
      } catch (err) {
        console.error('Supabase connection error:', err);
        setConnectionStatus('error');
        setError(err instanceof Error ? err.message : String(err));
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-4 m-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Status</h2>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span>Status:</span>
          {connectionStatus === 'checking' && (
            <span className="text-yellow-500">Checking connection...</span>
          )}
          {connectionStatus === 'connected' && (
            <span className="text-green-500">Connected successfully</span>
          )}
          {connectionStatus === 'error' && (
            <span className="text-red-500">Connection error</span>
          )}
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupabaseTest;
