-- Supabase Membership Setup Script
-- Run this in Supabase SQL Editor to create the memberships table

-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  tier TEXT NOT NULL DEFAULT 'free', -- 'free' or 'premium'
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Policy: Allow read access to authenticated users (their own record)
CREATE POLICY "Users can read their own membership"
  ON memberships
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- Policy: Allow admin (via service role) to insert/update/delete
-- Note: Service role key bypasses RLS automatically, so this is for row-level control

-- Create an index on email for faster queries
CREATE INDEX idx_memberships_email ON memberships(email);

-- Optional: Create updated_at trigger to auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_memberships_updated_at
BEFORE UPDATE ON memberships
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Sample: Insert a test free member
-- INSERT INTO memberships (email, tier) VALUES ('test@example.com', 'free');
