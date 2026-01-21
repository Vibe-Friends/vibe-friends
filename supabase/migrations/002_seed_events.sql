-- Seed existing events from hardcoded data
INSERT INTO events (id, title, start_date, end_date, start_time, end_time, location, url, image_url)
VALUES
  (
    'a1b2c3d4-0001-4000-8000-000000000001',
    'Vibe Friends Logo Contest',
    '2026-01-09',
    '2026-01-14',
    '12:00 AM PST',
    '11:59 PM PST',
    'Virtual',
    'https://www.notion.so/Vibe-Friends-Logo-Contest-2e1acb2ab58280ff86d3d6ca9f7b30da',
    NULL
  ),
  (
    'a1b2c3d4-0002-4000-8000-000000000002',
    'Vibe Friends Town Hall',
    '2026-01-16',
    NULL,
    '11:00 AM PST',
    '11:45 AM PST',
    'Virtual - Telegram',
    'https://luma.com/1p8tuzri',
    'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/7s/2586e808-d24c-45c5-9623-499d857a29aa.png'
  );

-- Seed admin emails (add your email here)
-- INSERT INTO admin_allowlist (email) VALUES ('your-email@example.com');
