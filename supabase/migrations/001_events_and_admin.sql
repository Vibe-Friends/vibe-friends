-- Events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TEXT NOT NULL,
  end_time TEXT,
  location TEXT NOT NULL,
  url TEXT NOT NULL,
  image_url TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_events_start_date ON events(start_date DESC);
CREATE INDEX idx_events_deleted_at ON events(deleted_at);

-- Admin allowlist table
CREATE TABLE admin_allowlist (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public can read non-deleted events
CREATE POLICY "Public can view active events"
  ON events FOR SELECT
  USING (deleted_at IS NULL);

-- Admins (via allowlist) can do everything
CREATE POLICY "Admins can insert events"
  ON events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_allowlist
      WHERE email = (SELECT auth.jwt() ->> 'email')
    )
  );

CREATE POLICY "Admins can update events"
  ON events FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_allowlist
      WHERE email = (SELECT auth.jwt() ->> 'email')
    )
  );

CREATE POLICY "Admins can delete events"
  ON events FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_allowlist
      WHERE email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- RLS for admin_allowlist (read-only via service role)
ALTER TABLE admin_allowlist ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to check if they're in allowlist
CREATE POLICY "Users can check their own allowlist status"
  ON admin_allowlist FOR SELECT
  USING (email = (SELECT auth.jwt() ->> 'email'));

-- Storage bucket for event images (run in Supabase Dashboard > Storage)
-- 1. Create bucket named 'event-images' with public access
-- 2. Add policy: Public can read all files
-- 3. Add policy: Authenticated users can upload/update/delete files
