-- ============================================
-- ForJob — 관리자 이메일 하드코딩 → DB role 기반 전환
-- 변경: forjob_profiles.role 컬럼 추가, is_forjob_admin() role 기반 전환
-- Supabase SQL Editor에서 실행
-- 작성일: 2026-04-15
-- ============================================

-- ■ 1. forjob_profiles에 role 컬럼 추가
ALTER TABLE forjob_profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- ■ 2. 기존 관리자 이메일에 role 설정
UPDATE forjob_profiles SET role = 'superadmin' WHERE email = 'aebon@kakao.com';
UPDATE forjob_profiles SET role = 'admin' WHERE email IN ('radical8566@gmail.com', 'aebon@kyonggi.ac.kr');

-- ■ 3. is_forjob_admin() 함수를 role 기반으로 변경
CREATE OR REPLACE FUNCTION is_forjob_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM forjob_profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'superadmin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ■ 4. 프로필 자동 생성 트리거 업데이트 (role 컬럼 보존)
CREATE OR REPLACE FUNCTION handle_forjob_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO forjob_profiles (id, name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    avatar_url = EXCLUDED.avatar_url;
  -- role은 건드리지 않음 (기존 값 유지)
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ■ 5. role 컬럼 보호: 일반 사용자는 role 변경 불가
-- forjob_profiles UPDATE 정책을 세분화
DROP POLICY IF EXISTS "profiles_update" ON forjob_profiles;

-- 일반 사용자: 본인 프로필 수정 가능하되 role은 변경 불가
CREATE POLICY "profiles_update_own" ON forjob_profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM forjob_profiles WHERE id = auth.uid()));

-- 관리자: 모든 프로필 수정 가능 (role 변경 포함)
DROP POLICY IF EXISTS "profiles_admin_update" ON forjob_profiles;
CREATE POLICY "profiles_admin_update" ON forjob_profiles
  FOR UPDATE USING (is_forjob_admin());

-- ■ 6. 확인 쿼리
SELECT email, role FROM forjob_profiles WHERE role IN ('admin', 'superadmin');
