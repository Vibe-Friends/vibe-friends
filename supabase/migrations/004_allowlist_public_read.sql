-- Allow public to check if email exists in admin_allowlist
-- This enables the login form to verify admin status before sending magic link
-- Only exposes admin emails (not sensitive)

DROP POLICY IF EXISTS "Users can check their own allowlist status" ON admin_allowlist;

CREATE POLICY "Public can check allowlist"
  ON admin_allowlist FOR SELECT
  USING (true);
