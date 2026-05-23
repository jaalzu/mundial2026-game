INSERT INTO users (
  id,
  name,
  recovery_key,
  created_at,
  updated_at
)
VALUES (
  '11111111-1111-4111-8111-111111111111',
  'Usuario Test',
  'TEST-RECOVERY-KEY-2026',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  recovery_key = EXCLUDED.recovery_key,
  updated_at = NOW();
