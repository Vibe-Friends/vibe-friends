-- Enable pg_cron extension (must be enabled in Supabase Dashboard first)
-- Go to: Database → Extensions → Enable pg_cron

-- Schedule cleanup-events function to run daily at 3:00 AM UTC
-- Note: Replace YOUR_PROJECT_REF with your actual Supabase project reference
--
-- SELECT cron.schedule(
--   'cleanup-expired-events',
--   '0 3 * * *',  -- Every day at 3:00 AM UTC
--   $$
--   SELECT net.http_post(
--     url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/cleanup-events',
--     headers := jsonb_build_object(
--       'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'),
--       'Content-Type', 'application/json'
--     ),
--     body := '{}'::jsonb
--   );
--   $$
-- );

-- Alternative: Use pg_cron with direct SQL instead of Edge Function
-- This approach is simpler and doesn't require deploying the Edge Function

SELECT cron.schedule(
  'cleanup-expired-events-direct',
  '0 3 * * *',  -- Every day at 3:00 AM UTC
  $$
  -- Soft delete expired events
  UPDATE events
  SET deleted_at = NOW()
  WHERE deleted_at IS NULL
    AND (
      (end_date IS NOT NULL AND end_date < CURRENT_DATE)
      OR (end_date IS NULL AND start_date < CURRENT_DATE)
    );

  -- Hard delete events soft-deleted more than 7 days ago
  DELETE FROM events
  WHERE deleted_at < NOW() - INTERVAL '7 days';
  $$
);
