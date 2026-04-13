-- ============================================
-- pangsae1@gmail.com 회원 복구 스크립트
-- Supabase SQL Editor에서 단계별로 실행하세요
-- ============================================

-- ★ STEP 1: 먼저 plan_type 제약조건 수정 (이것이 결제 실패 원인)
ALTER TABLE forjob_orders DROP CONSTRAINT IF EXISTS forjob_orders_plan_type_check;
ALTER TABLE forjob_orders ADD CONSTRAINT forjob_orders_plan_type_check
  CHECK (plan_type IN (
    '3month','6month','12month',
    '30day','90day','lifetime',
    '1day_trial','1day','3day','7day','10day','14day','60day','365day'
  ));

-- ★ STEP 2: auth.users에서 사용자 확인
SELECT id, email, created_at FROM auth.users WHERE email = 'pangsae1@gmail.com';

-- ★ STEP 3: forjob_profiles 확인
SELECT * FROM forjob_profiles WHERE email = 'pangsae1@gmail.com';

-- ★ STEP 4: forjob_orders 확인 (결제 기록이 있는지)
SELECT * FROM forjob_orders WHERE user_email = 'pangsae1@gmail.com';

-- ★ STEP 5: 프로필이 없으면 수동 생성
INSERT INTO forjob_profiles (id, name, email)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', 'pangsae1'),
  email
FROM auth.users
WHERE email = 'pangsae1@gmail.com'
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

-- ★ STEP 6: 결제 기록(order)이 없으면 수동 생성
--    (STEP 4에서 결과가 0건일 때만 이 블록 실행)
--    9900원 = 3month(90일) 이용권
INSERT INTO forjob_orders (
  order_number, user_id, user_email, user_name,
  plan_type, total_amount, payment_method, payment_status,
  paid_at, expires_at
)
SELECT
  'JP-RECOVER-' || TO_CHAR(NOW(), 'YYMMDD'),
  u.id,
  'pangsae1@gmail.com',
  COALESCE(u.raw_user_meta_data->>'full_name', 'pangsae1'),
  '3month',
  9900,
  'card',
  'paid',
  NOW(),
  NOW() + INTERVAL '90 days'
FROM auth.users u
WHERE u.email = 'pangsae1@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM forjob_orders o
    WHERE o.user_email = 'pangsae1@gmail.com'
      AND o.payment_status = 'paid'
  );

-- ★ STEP 7: 기존 결제 기록이 있지만 상태가 잘못된 경우 수정
UPDATE forjob_orders
SET
  payment_status = 'paid',
  expires_at = COALESCE(paid_at, created_at) + INTERVAL '90 days'
WHERE user_email = 'pangsae1@gmail.com'
  AND total_amount = 9900
  AND (expires_at IS NULL OR payment_status != 'paid');

-- ★ STEP 8: 최종 확인
SELECT 'profiles' AS source, email, created_at::text AS detail
FROM forjob_profiles WHERE email = 'pangsae1@gmail.com'
UNION ALL
SELECT 'orders', user_email, payment_status || ' | expires: ' || COALESCE(expires_at::text, 'null')
FROM forjob_orders WHERE user_email = 'pangsae1@gmail.com';
