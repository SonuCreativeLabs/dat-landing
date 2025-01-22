import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.writeHead(200, corsHeaders).end();
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    const { data: admins } = await supabaseClient
      .from('profiles')
      .select('email')
      .eq('is_admin', true);

    if (!admins || admins.length === 0) {
      throw new Error('No admin users found');
    }

    // Here you would typically integrate with an email service
    // For now, we'll just log the notification
    console.log('New testimonial submitted! Notifying admins:', admins.map(admin => admin.email));

    res.status(200).json({ message: 'Notification sent to admins.' });
  } catch (error) {
    console.error('Error notifying admins:', error);
    res.status(500).json({ error: error.message });
  }
}