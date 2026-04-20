# CHANGELOG

## [1.0.1] - 2026-04-20

### Fixed
- **AuthContext forjob_profiles upsert 버그 수정**
  - `provider` 컬럼이 DB 스키마에 존재하지 않아 매 로그인마다 upsert가 실패하던 문제 해결
  - `role: 'member'` 하드코딩 제거 — 관리자(admin/superadmin) role이 로그인 시 리셋되는 잠재적 버그 방지
  - 파일: `src/contexts/AuthContext.tsx`

- **푸터 카카오톡 ID 수정**
  - `dreamitbiz` → `aebon`으로 변경
  - 파일: `src/components/layout/Footer.tsx`

### Added
- **PortOne 결제 ↔ DB 동기화 점검 SQL**
  - PortOne 결제완료 15건과 forjob_orders 테이블 비교 스크립트
  - 누락 주문 자동 삽입 쿼리 포함
  - 파일: `supabase/09_portone_sync_check.sql`

- **이화연 접속 권한 수동 부여 SQL**
  - user_id: `79a14d7a-4394-44b6-a5a5-3edc2942cfd3`
  - 주문번호: `JP-260417-Z1BLVV` (3개월 이용권, 9,900원, 2026-04-17)
  - 파일: `supabase/09_grant_access_이화연.sql`

### Analysis (코드 점검 결과)
- **결제자 시험문제 풀이 불가 원인 분석**
  - 주요 원인: PortOne 결제 성공 후 `forjob_orders` INSERT가 RLS/네트워크 문제로 실패 → localStorage에만 백업 → 다른 기기에서 접근 불가
  - 부가 원인: AuthContext의 `provider` 컬럼 upsert 실패로 프로필 업데이트 누락
  - 구독 체크 10초 타임아웃 시 `hasAccess=false` 처리

---

## [1.0.0] - 2026-04-17 이전

### Features
- 직업상담사 2급 필기/실기 CBT 학습 플랫폼
- PortOne 결제 연동 (KG이니시스)
- Supabase 인증 (Google/Kakao OAuth)
- 관리자 대시보드 (회원/주문/쿠폰/학습현황 관리)
- 무료 체험 1회 + 유료 이용권 (3/6/12개월)
- 실기 연습 모드, 학습 모드, 오답노트, 북마크
- 쿠폰 시스템
- SSO 크로스도메인 쿠키
- 세션 타임아웃 (10분 무동작)
- 프로필 완성 모달
