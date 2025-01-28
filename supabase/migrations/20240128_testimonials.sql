-- Create testimonials table if it doesn't exist
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    message TEXT NOT NULL,
    location TEXT,
    service_type TEXT,
    status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous submissions
CREATE POLICY "Enable anonymous submissions"
ON testimonials FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy for public read access to approved testimonials
CREATE POLICY "Enable public read access"
ON testimonials FOR SELECT
TO anon
USING (status = 'approved');

-- Create policy for authenticated users to manage all testimonials
CREATE POLICY "Enable full access for authenticated users"
ON testimonials
TO authenticated
USING (true)
WITH CHECK (true);
