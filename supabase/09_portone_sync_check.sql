-- ============================================
-- ForJob - PortOne 결제 내역 vs DB 동기화 점검
-- + 봉은수 접근 권한 점검
-- + 김성길 가입 확인 (jdy 관련)
-- Supabase SQL Editor에서 실행
-- 작성일: 2026-04-20
-- ============================================

-- ■ 1. PortOne 결제완료 15건 주문번호 vs DB 존재 여부 확인
SELECT
  v.order_number,
  v.user_name,
  v.paid_at,
  CASE WHEN o.id IS NOT NULL THEN 'DB 존재' ELSE '** DB 누락 **' END AS db_status,
  o.payment_status,
  o.expires_at
FROM (VALUES
  ('JP-260417-Z1BLVV', '이화연',         '2026-04-17 15:49:47'),
  ('JP-260415-ZF3QFY', '송유미',         '2026-04-15 15:24:09'),
  ('JP-260415-G1CI8H', '수민',           '2026-04-15 12:13:21'),
  ('JP-260415-91Q8Z3', '오선화',         '2026-04-15 12:13:08'),
  ('JP-260415-TAGXFG', '김진경',         '2026-04-15 12:12:34'),
  ('JP-260415-5INX7K', 'JieunKoo',       '2026-04-15 12:11:04'),
  ('JP-260414-DDGSK2', '봉은수',         '2026-04-14 11:36:22'),
  ('JP-260414-4B8T8E', '이미라',         '2026-04-14 11:20:33'),
  ('JP-260414-274CQH', '이미숙',         '2026-04-14 11:20:33'),
  ('JP-260414-4I1Z1K', '반은정',         '2026-04-14 11:20:04'),
  ('JP-260414-14GMXO', '박미영',         '2026-04-14 11:20:01'),
  ('JP-260414-8KTFFF', '임연아',         '2026-04-14 11:19:48'),
  ('JP-260414-1LIZYT', '여은아',         '2026-04-14 11:19:45'),
  ('JP-260414-341OIZ', '이남주',         '2026-04-14 11:19:15'),
  ('JP-260414-NS9IC9', '임승문',         '2026-04-14 11:18:16'),
  ('JP-260414-LA7HWJ', '성예종',         '2026-04-14 07:43:16')
) AS v(order_number, user_name, paid_at)
LEFT JOIN forjob_orders o ON o.order_number = v.order_number
ORDER BY v.paid_at DESC;

-- ■ 2. DB에 있는 전체 주문 목록
SELECT order_number, user_name, user_email, payment_status, plan_type, expires_at, created_at
FROM forjob_orders
WHERE payment_method != 'coupon'
ORDER BY created_at DESC;

-- ■ 3. 봉은수 개별 점검 (주문 + 프로필)
SELECT '프로필' AS src, p.id, p.name, p.email, p.role
FROM forjob_profiles p
WHERE p.name LIKE '%봉은수%';

SELECT '주문' AS src, o.*
FROM forjob_orders o
WHERE o.user_name LIKE '%봉은수%'
   OR o.order_number = 'JP-260414-DDGSK2';

-- ■ 4. 김성길 가입 확인 (jdy + 전체 사이트)
SELECT u.id, u.email, u.created_at,
       u.raw_user_meta_data->>'full_name' AS full_name,
       u.raw_user_meta_data->>'name' AS name,
       u.app_metadata->>'provider' AS provider
FROM auth.users u
WHERE u.raw_user_meta_data->>'full_name' LIKE '%김성길%'
   OR u.raw_user_meta_data->>'name' LIKE '%김성길%'
   OR u.email LIKE '%kimsung%'
   OR u.email LIKE '%ksg%';

SELECT 'user_profiles' AS tbl, up.id, up.email, up.name, up.display_name, up.signup_domain, up.visited_sites
FROM user_profiles up
WHERE up.name LIKE '%김성길%'
   OR up.display_name LIKE '%김성길%';

-- ■ 5. DB 누락 주문 일괄 자동 삽입
-- forjob_profiles 이름으로 user_id 매칭
-- !! 1번 쿼리에서 '** DB 누락 **'인 건의 주문번호를 VALUES에 넣고 주석 해제 후 실행 !!
/*
INSERT INTO forjob_orders (
  order_number, user_id, user_email, user_name,
  plan_type, total_amount, payment_method, payment_status,
  paid_at, expires_at, created_at
)
SELECT
  v.order_number,
  p.id,
  p.email,
  v.user_name,
  '3month',
  9900,
  'card',
  'paid',
  v.paid_at::timestamptz,
  v.paid_at::timestamptz + INTERVAL '90 days',
  v.paid_at::timestamptz
FROM (VALUES
  ('JP-260417-Z1BLVV', '이화연',   '2026-04-17T15:49:47+09:00'),
  ('JP-260414-DDGSK2', '봉은수',   '2026-04-14T11:36:22+09:00')
  -- 다른 누락 건도 여기에 추가
) AS v(order_number, user_name, paid_at)
JOIN forjob_profiles p ON p.name = v.user_name
WHERE NOT EXISTS (
  SELECT 1 FROM forjob_orders o WHERE o.order_number = v.order_number
)
ON CONFLICT DO NOTHING;
*/

-- ■ 6. 최종 확인: 활성 구독 사용자 목록
SELECT
  o.user_name,
  o.user_email,
  o.order_number,
  o.payment_status,
  o.expires_at,
  CASE WHEN o.expires_at > NOW() THEN 'active' ELSE 'expired' END AS access_status
FROM forjob_orders o
WHERE o.payment_status = 'paid'
  AND o.payment_method != 'coupon'
ORDER BY o.created_at DESC;
