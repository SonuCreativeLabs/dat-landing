-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    read_time TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    keywords TEXT[] NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published'))
);

-- Create index on slug for faster lookups
CREATE INDEX blog_posts_slug_idx ON blog_posts (slug);

-- Create index on status for filtering
CREATE INDEX blog_posts_status_idx ON blog_posts (status);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON blog_posts
    FOR SELECT
    USING (status = 'published');

CREATE POLICY "Enable all access for authenticated users" ON blog_posts
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Add comment to table
COMMENT ON TABLE blog_posts IS 'Blog posts for the website'; 