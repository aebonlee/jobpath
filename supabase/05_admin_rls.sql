-- ============================================
-- ForJob - 관리자 RLS 정책 + plan_type 제약조건 수정
-- 관리자가 모든 주문/쿠폰 데이터를 조회할 수 있도록 허용
-- ============================================

-- ■ plan_type CHECK 제약조건 수정
-- 기존: ('30day','90day','lifetime')만 허용 → 실제 플랜('3month' 등)이 거부됨
ALTER TABLE forjob_orders DROP CONSTRAINT IF EXISTS forjob_orders_plan_type_check;
ALTER TABLE forjob_orders ADD CONSTRAINT forjob_orders_plan_type_check
  CHECK (plan_type IN (
    '3month','6month','12month',
    '30day','90day','lifetime',
    '1day_trial','1day','3day','7day','10day','14day','60day','365day'
  ));

-- 관리자 여부 확인 함수
CREATE OR REPLACE FUNCTION is_forjob_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email IN ('aebon@kakao.com', 'radical8566@gmail.com')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ■ forjob_orders: 관리자 전체 조회 정책
DROP POLICY IF EXISTS "admin_read_all_orders" ON forjob_orders;
CREATE POLICY "admin_read_all_orders" ON forjob_orders
  FOR SELECT USING (is_forjob_admin());

-- ■ forjob_coupon_redemptions: 관리자 전체 조회 정책
DROP POLICY IF EXISTS "admin_read_all_redemptions" ON forjob_coupon_redemptions;
CREATE POLICY "admin_read_all_redemptions" ON forjob_coupon_redemptions
  FOR SELECT USING (is_forjob_admin());

-- ■ forjob_coupons: 관리자 INSERT/UPDATE 정책 (쿠폰 생성/비활성화)
DROP POLICY IF EXISTS "admin_manage_coupons" ON forjob_coupons;
CREATE POLICY "admin_manage_coupons" ON forjob_coupons
  FOR ALL USING (is_forjob_admin());

-- ■ forjob_orders: 관리자 UPDATE 정책 (주문 상태 변경)
DROP POLICY IF EXISTS "admin_update_orders" ON forjob_orders;
CREATE POLICY "admin_update_orders" ON forjob_orders
  FOR UPDATE USING (is_forjob_admin());
