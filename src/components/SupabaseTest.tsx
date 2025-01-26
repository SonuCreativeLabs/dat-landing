import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error: healthError } = await supabase.from('testimonials').select('count');
        if (healthError) throw healthError;
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

  if (connectionStatus === 'checking') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      {connectionStatus === 'connected' && (
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg shadow-sm border border-green-100">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-medium">Database Connected</span>
        </div>
      )}
      {connectionStatus === 'error' && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg shadow-sm border border-red-100">
          <XCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Connection Error</span>
        </div>
      )}
    </motion.div>
  );
};

export default SupabaseTest;
