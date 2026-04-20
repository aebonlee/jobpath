-- ============================================
-- ForJob - 이화연 결제자 접속 권한 수동 부여
-- PortOne 결제 완료되었으나 forjob_orders INSERT 실패 추정
-- Supabase SQL Editor에서 실행
-- 작성일: 2026-04-20
-- ============================================
-- user_id: 79a14d7a-4394-44b6-a5a5-3edc2942cfd3
-- email:   www5661@nate.com
-- name:    이화연

-- ■ 1. 기존 주문 확인 (이미 존재하는지 체크)
SELECT * FROM forjob_orders
WHERE order_number = 'JP-260417-Z1BLVV'
   OR user_id = '79a14d7a-4394-44b6-a5a5-3edc2942cfd3';

-- ■ 2. 주문 수동 삽입 (1번 결과가 없을 때 실행)
INSERT INTO forjob_orders (
  order_number, user_id, user_email, user_name,
  plan_type, total_amount, payment_method, payment_status,
  paid_at, expires_at, created_at
) VALUES (
  'JP-260417-Z1BLVV',
  '79a14d7a-4394-44b6-a5a5-3edc2942cfd3',
  'www5661@nate.com',
  '이화연',
  '3month',
  9900,
  'card',
  'paid',
  '2026-04-17T15:49:47+09:00',
  '2026-04-17T15:49:47+09:00'::timestamptz + INTERVAL '90 days',
  '2026-04-17T15:49:47+09:00'
)
ON CONFLICT DO NOTHING;

-- ■ 3. 삽입 확인
SELECT id, order_number, user_name, plan_type, payment_status, expires_at
FROM forjob_orders
WHERE user_id = '79a14d7a-4394-44b6-a5a5-3edc2942cfd3';
