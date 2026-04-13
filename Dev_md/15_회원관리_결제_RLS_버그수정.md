# JobPath - 회원관리 결제/RLS 버그 수정

## 날짜
2026-04-14

## 문제 상황
- `pangsae1@gmail.com` 회원이 9,900원 결제 완료했으나 유료 전환 안됨
- 관리자 대시보드에서 해당 회원 및 결제 기록이 보이지 않음

## 근본 원인 분석

### 버그 1: plan_type CHECK 제약조건 불일치 (치명적)
- `forjob_orders` 테이블 생성 시 `plan_type`에 CHECK 제약조건 설정:
  - 허용: `'30day', '90day', 'lifetime'`
- 실제 결제 플랜 ID (`src/config/site.js`):
  - `'3month'`(9,900원), `'6month'`(19,900원), `'12month'`(29,900원)
- **결과**: PortOne 카드 결제는 성공하지만, Supabase INSERT가 제약조건 위반으로 실패
- 돈은 빠지고 주문 기록이 없어서 유료 전환 불가

### 버그 2: Checkout.tsx INSERT 에러 미처리
- `supabase.from(TABLES.ORDERS).insert(...)` 반환값의 error를 확인하지 않음
- DB 저장 실패해도 사용자에게 "결제가 완료되었습니다!" 표시

### 버그 3: 관리자 RLS 정책 누락
- `forjob_orders`: `SELECT USING (auth.uid() = user_id)` → 관리자도 자기 주문만 조회
- `forjob_coupon_redemptions`: 동일한 RLS → 관리자가 다른 회원 쿠폰 사용 기록 못 봄
- `forjob_profiles`만 `USING(true)`로 전체 조회 가능
- **결과**: 관리자 대시보드 회원 목록에 주문/쿠폰 데이터가 비어있음

## 수정 내용

### 1. SQL 마이그레이션 (`supabase/05_admin_rls.sql`)
- `plan_type` CHECK 제약조건 수정: `3month`, `6month`, `12month` 등 추가
- `is_forjob_admin()` SECURITY DEFINER 함수 생성
- `forjob_orders`: 관리자 전체 조회/수정 정책 추가
- `forjob_coupon_redemptions`: 관리자 전체 조회 정책 추가
- `forjob_coupons`: 관리자 전체 관리 정책 추가

### 2. Checkout.tsx 결제 에러 처리
- INSERT 결과의 error 체크 추가
- 저장 실패 시 사용자에게 경고 메시지 ("결제는 완료되었으나 주문 기록 저장에 문제가 발생했습니다")

### 3. AdminDashboard.tsx 에러 로깅
- 4개 테이블 쿼리 각각에 에러 로깅 추가

### 4. pangsae1@gmail.com 복구 스크립트 (`supabase/fix_pangsae1.sql`)
- 프로필 존재 여부 확인 및 자동 생성
- 결제 기록 없을 시 수동 주문 생성 (3month, 9,900원, 90일)
- 기존 기록이 있으나 상태 잘못된 경우 수정

## 변경 파일
| 파일 | 변경 |
|------|------|
| `supabase/05_admin_rls.sql` | 신규 - RLS 정책 + plan_type 수정 |
| `supabase/fix_pangsae1.sql` | 신규 - 회원 복구 스크립트 |
| `sql/forjob_orders.sql` | plan_type CHECK 제약조건 수정 |
| `src/pages/payment/Checkout.tsx` | INSERT 에러 체크 추가 |
| `src/pages/admin/AdminDashboard.tsx` | 쿼리 에러 로깅 추가 |

## 배포 후 필수 작업
1. Supabase SQL Editor에서 `supabase/05_admin_rls.sql` 실행
2. Supabase SQL Editor에서 `supabase/fix_pangsae1.sql` 단계별 실행
3. 관리자 대시보드에서 pangsae1@gmail.com 유료 전환 확인
