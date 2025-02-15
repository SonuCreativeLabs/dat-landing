import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const htmlResponse = `
<!DOCTYPE html>
<html>
<head>
    <title>Dreams Air Tech - JustDial Integration</title>
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #0284C7; }
        .status { 
            padding: 1rem;
            background: #e6f3ff;
            border-radius: 4px;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Dreams Air Tech - JustDial Integration</h1>
        <div class="status">
            ✅ Integration endpoint is active and ready to receive leads
        </div>
        <p>This endpoint is configured to receive leads from JustDial's lead forwarding system.</p>
        <p>For technical support, please contact the Dreams Air Tech development team.</p>
    </div>
</body>
</html>
`

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Received request:', req.method)

    // Check if it's a browser request (looking for HTML)
    const acceptHeader = req.headers.get('accept') || '';
    if (acceptHeader.includes('text/html')) {
      return new Response(htmlResponse, { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'text/html'
        }
      });
    }

    // Only allow GET requests since JustDial sends data via URL parameters
    if (req.method !== 'GET') {
      throw new Error('Method not allowed')
    }

    // Create Supabase client with service_role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SERVICE_ROLE_KEY') ?? ''
    )

    // Parse URL parameters
    const url = new URL(req.url)
    const params = url.searchParams
    console.log('Received parameters:', Object.fromEntries(params))

    // Required fields validation
    const leadid = params.get('leadid')
    if (!leadid) {
      throw new Error('Lead ID is required')
    }

    // Create lead data object
    const leadData = {
      leadid,
      leadtype: params.get('leadtype'),
      prefix: params.get('prefix'),
      name: params.get('name'),
      mobile: params.get('mobile'),
      phone: params.get('phone'),
      email: params.get('email'),
      lead_date: params.get('date'),
      category: params.get('category'),
      city: params.get('city'),
      area: params.get('area'),
      brancharea: params.get('brancharea'),
      dncmobile: params.get('dncmobile') ? parseInt(params.get('dncmobile')!) : null,
      dncphone: params.get('dncphone') ? parseInt(params.get('dncphone')!) : null,
      company: params.get('company'),
      pincode: params.get('pincode'),
      lead_time: params.get('time'),
      branchpin: params.get('branchpin'),
      parentid: params.get('parentid')
    }

    console.log('Inserting lead data:', leadData)

    // Insert lead into database using service_role access
    const { data, error } = await supabaseAdmin
      .from('justdial_leads')
      .insert([leadData])
      .select()

    if (error) {
      console.error('Error inserting lead:', error)
      throw error
    }

    console.log('Successfully inserted lead:', data)

    // Return "RECEIVED" as required by JustDial
    return new Response(
      'RECEIVED',
      { 
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
}) 