-- JobPath: forjob_orders 테이블 생성
-- 이용권 주문/결제 기록 저장

CREATE TABLE IF NOT EXISTS forjob_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  user_name TEXT,
  user_phone TEXT,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('3month','6month','12month','30day','90day','lifetime','1day_trial','1day','3day','7day','10day','14day','60day','365day')),
  total_amount INTEGER NOT NULL,
  payment_method TEXT DEFAULT 'card',
  payment_status TEXT DEFAULT 'pending'
    CHECK (payment_status IN ('pending','paid','failed','cancelled','refunded')),
  portone_payment_id TEXT,
  paid_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  cancel_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE forjob_orders ENABLE ROW LEVEL SECURITY;

-- 본인 주문만 조회
CREATE POLICY "select_own" ON forjob_orders
  FOR SELECT USING (auth.uid() = user_id);

-- 본인 주문만 삽입
CREATE POLICY "insert_own" ON forjob_orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_forjob_orders_user_id ON forjob_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_forjob_orders_status ON forjob_orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_forjob_orders_plan ON forjob_orders(plan_type);
