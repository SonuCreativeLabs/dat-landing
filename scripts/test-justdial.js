import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'

// For database operations (direct Supabase URL)
const supabaseUrl = 'https://ufywpifbqbzampiiuetc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmeXdwaWZicWJ6YW1waWl1ZXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNjgxNjYsImV4cCI6MjA1Mjk0NDE2Nn0.7tjain_I8jJ2Nc3AdurDOniMKE6mEM_Edu_M-mi2eCI'

// For JustDial webhook (main domain)
const webhookUrl = 'https://dreamsairtech.in/leads'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testJustDialIntegration() {
  console.log('Testing JustDial Integration...\n')

  // 1. Test Edge Function
  console.log('1. Testing Edge Function...')
  const testLead = {
    leadid: `TEST${Date.now()}`,
    leadtype: 'company',
    prefix: 'Mr',
    name: 'Test Customer',
    mobile: '9876543210',
    phone: '04442345678',
    email: 'test@example.com',
    date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    category: 'AC Service',
    city: 'Chennai',
    area: 'Velachery',
    brancharea: 'Velachery Main Road',
    dncmobile: 0,
    dncphone: 0,
    company: 'Test Company Ltd',
    pincode: '600042',
    time: new Date().toTimeString().split(' ')[0], // Current time in HH:MM:SS format
    branchpin: '600042',
    parentid: 'PARENT123'
  }

  console.log('Sending test lead:', testLead)
  const queryParams = new URLSearchParams(testLead).toString()
  
  let responseText
  try {
    const response = await fetch(
      `${webhookUrl}?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Accept': 'text/plain'
        }
      }
    )

    responseText = await response.text()
    console.log('Response:', responseText)
    console.log('Status:', response.status)
    
    // Convert headers to a plain object for logging
    const headers = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })
    console.log('Headers:', headers)
    console.log()

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error calling Edge Function:', error)
    return
  }

  // Wait a bit longer for the database to update
  console.log('Waiting for database to update...')
  await new Promise(resolve => setTimeout(resolve, 2000))

  // 2. Verify Database Entry
  console.log('2. Checking Database Entry...')
  console.log('Querying for leadid:', testLead.leadid)
  
  // First, check all recent leads
  console.log('\nChecking recent leads:')
  const { data: recentLeads, error: recentError } = await supabase
    .from('justdial_leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  if (recentError) {
    console.error('Error fetching recent leads:', recentError.message)
  } else {
    console.log('Recent leads:', recentLeads)
  }

  // Then check for our specific lead
  console.log('\nChecking for our test lead:')
  const { data: leads, error } = await supabase
    .from('justdial_leads')
    .select('*')
    .eq('leadid', testLead.leadid)

  if (error) {
    console.error('Error fetching leads:', error.message)
    return
  }

  if (!leads || leads.length === 0) {
    console.error('No leads found in database')
    return
  }

  console.log('Test lead found in database:', leads[0])
  console.log()

  // 3. Test Lead Processing
  console.log('3. Testing Lead Processing...')
  const { error: updateError } = await supabase
    .from('justdial_leads')
    .update({ processed: true })
    .eq('leadid', testLead.leadid)

  if (updateError) {
    console.error('Error updating lead:', updateError.message)
    return
  }

  console.log('Successfully marked lead as processed')
  console.log()

  // 4. Final Verification
  console.log('4. Final Database Check')
  const { data: finalLead, error: finalError } = await supabase
    .from('justdial_leads')
    .select('*')
    .eq('leadid', testLead.leadid)
    .single()

  if (finalError) {
    console.error('Error in final check:', finalError.message)
    return
  }

  console.log('Final lead state:', finalLead)
  console.log()

  console.log('All tests completed successfully!')
  console.log('\nVerification Steps:')
  console.log('1. Edge Function responded with "RECEIVED":', responseText === 'RECEIVED')
  console.log('2. Lead was stored in database:', !!leads?.length)
  console.log('3. Lead was marked as processed:', finalLead?.processed)
  console.log('4. All lead details match:', {
    leadid: finalLead?.leadid === testLead.leadid,
    name: finalLead?.name === testLead.name,
    mobile: finalLead?.mobile === testLead.mobile,
    category: finalLead?.category === testLead.category,
    city: finalLead?.city === testLead.city,
    area: finalLead?.area === testLead.area,
    email: finalLead?.email === testLead.email
  })
}

testJustDialIntegration().catch(console.error) 