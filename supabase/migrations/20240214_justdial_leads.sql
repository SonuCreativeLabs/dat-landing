-- Create JustDial leads table
CREATE TABLE justdial_leads (
    id BIGSERIAL PRIMARY KEY,
    leadid VARCHAR(255) UNIQUE NOT NULL,
    leadtype VARCHAR(255),
    prefix VARCHAR(10),
    name VARCHAR(255),
    mobile VARCHAR(50),
    phone VARCHAR(50),
    email VARCHAR(255),
    lead_date DATE,
    category VARCHAR(255),
    city VARCHAR(255),
    area VARCHAR(255),
    brancharea VARCHAR(255),
    dncmobile INTEGER,
    dncphone INTEGER,
    company VARCHAR(255),
    pincode VARCHAR(50),
    lead_time TIME,
    branchpin VARCHAR(50),
    parentid VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE
);

-- Create index on leadid for faster lookups
CREATE INDEX idx_justdial_leads_leadid ON justdial_leads(leadid);

-- Create index on created_at for time-based queries
CREATE INDEX idx_justdial_leads_created_at ON justdial_leads(created_at);

-- Security policies
ALTER TABLE justdial_leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON justdial_leads;
DROP POLICY IF EXISTS "Allow authenticated select" ON justdial_leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON justdial_leads;
DROP POLICY IF EXISTS "Allow public select" ON justdial_leads;
DROP POLICY IF EXISTS "Allow public update processed" ON justdial_leads;

-- Policy for inserting leads (allow all inserts)
CREATE POLICY "Allow public insert" ON justdial_leads
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Policy for viewing leads (allow all reads)
CREATE POLICY "Allow public select" ON justdial_leads
    FOR SELECT
    TO public
    USING (true);

-- Policy for updating processed field (allow public updates)
CREATE POLICY "Allow public update processed" ON justdial_leads
    FOR UPDATE
    TO public
    USING (true)
    WITH CHECK (true); 