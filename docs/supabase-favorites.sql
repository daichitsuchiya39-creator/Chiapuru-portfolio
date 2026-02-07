-- Supabase Favorites Setup Script
-- Run this in Supabase SQL Editor to create the favorites table

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL REFERENCES memberships(email),
  content_type TEXT NOT NULL, -- 'blog', 'app', 'member-only-blog', 'member-only-app'
  content_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_email, content_type, content_slug)
);

-- Enable Row Level Security
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policy: Users can manage their own favorites (service role bypasses RLS)
CREATE POLICY "Users can manage own favorites"
  ON favorites
  FOR ALL
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Index for fast queries
CREATE INDEX idx_favorites_user_email ON favorites(user_email);
CREATE INDEX idx_favorites_content ON favorites(content_type, content_slug);
