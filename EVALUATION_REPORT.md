# DreamIT Web 전체 사이트 종합 평가 보고서 v2

**작성일:** 2026-04-20 (2차 정밀 분석)
**분석 대상:** D:\dreamit-web 하위 전체 프로젝트 (JobPath, Coding, JDY)
**분석자:** Claude Code (Opus 4.6)

---

## 1. 사이트 현황 개요

| 항목 | JobPath | Coding | JDY |
|------|---------|--------|-----|
| **URL** | jobpath.dreamitbiz.com | coding.dreamitbiz.com | jdy.dreamitbiz.com |
| **용도** | 직업상담사 시험 CBT | 코딩 학습 플랫폼 | 직업미래연구소 + 동아방송대 평가 |
| **기술** | React 19 + Vite 8 + JS/TSX 혼용 | React 19 + Vite 8 + 100% TS | 정적 HTML + 바닐라 JS |
| **인증** | Google/Kakao OAuth (PKCE) | Google/Kakao/Email (PKCE) | Google/Kakao OAuth (PKCE) ✅ |
| **SSO** | ✅ dreamit_sso 쿠키 | ✅ dreamit_sso 쿠키 | ✅ dreamit_sso 쿠키 (신규) |
| **DB** | Supabase (forjob_* 11테이블) | Supabase (coding_*) | Supabase (user_profiles만) |
| **결제** | PortOne (KG이니시스) | 없음 | 없음 |
| **배포** | GitHub Pages (gh-pages) | GitHub Pages (gh-pages) | GitHub Pages (main 직접) |

---

## 2. 프로젝트 구조 상세

### 2-1. JobPath (jobpath.dreamitbiz.com)

**소스 파일 구성:**
| 유형 | 수량 | 파일 |
|------|------|------|
| TSX 컴포넌트 | 35개 | pages/ (35), components/ (13), contexts/ (5) |
| JS 파일 | 11개 | config/(2), data/(5), lib/(1), utils/(3) |
| CSS 파일 | 18개 | styles/ (18) |
| SQL 스크립트 | 14개 | supabase/ (14) |
| **총 소스 파일** | **78개** | |

**주요 페이지 (라우트 32개):**
```
/                  Home (무료)
/login             LoginPage
/pilgi             PilgiHome → /pilgi/select → /pilgi/exam/:id → /pilgi/result/:id → /pilgi/review/:id
/pilgi/study       StudyMode (유료)
/silgi             SilgiHome → /silgi/practice → /silgi/result → /silgi/terms → /silgi/past → /silgi/frequent
/learn             LearnHome → /learn/:subjectCode (유료) → /summary
/practice          PracticeHome
/dashboard         Dashboard (유료) → /dashboard/history
/bookmarks         Bookmarks (유료)
/wrong-answers     WrongAnswers (유료)
/checkout          Checkout → /confirmation → /orders → /coupon
/about             ServiceIntro → /about/guide → /about/pricing
/info              ExamInfo
/terms, /privacy   약관
/admin             AdminDashboard (관리자)
```

**React Context 구조 (5개):**
| Context | 파일 | 역할 |
|---------|------|------|
| ThemeProvider | ThemeContext.tsx | 다크/라이트 모드 |
| ToastProvider | ToastContext.tsx | 알림 토스트 |
| AuthProvider | AuthContext.tsx | 인증, SSO, 프로필 |
| CartProvider | CartContext.tsx | 장바구니 |
| SubscriptionProvider | SubscriptionContext.tsx | 구독/결제 상태, 접근 권한 |

**Supabase 테이블 (11개):**
```
forjob_profiles, forjob_subjects, forjob_questions, forjob_silgi_questions,
forjob_exam_sessions, forjob_exam_answers, forjob_bookmarks, forjob_wrong_answers,
forjob_orders, forjob_coupons, forjob_coupon_redemptions
+ user_profiles (공유)
```

**빌드 최적화:**
- vite.config.js: manualChunks로 vendor(react), charts(chart.js) 분리
- 404.html: public/ 폴더에 수동 배치 (SPA 라우팅 지원)
- SPA redirect: index.html 내 GitHub Pages용 redirect 스크립트 포함
- 코드 스플리팅: ❌ 미적용 (모든 페이지 정적 import)

**의존성:**
| 패키지 | 버전 | 유형 |
|--------|------|------|
| @supabase/supabase-js | ^2.49.0 | 런타임 |
| react / react-dom | ^19.2.4 | 런타임 |
| react-router-dom | ^7.1.0 | 런타임 |
| chart.js + react-chartjs-2 | ^4.4.0 / ^5.2.0 | 런타임 |
| html2canvas + jspdf | ^1.4.1 / ^4.2.1 | 런타임 |
| typescript | ^6.0.2 | 개발 |
| vite | ^8.0.1 | 개발 |
| sharp | ^0.33.0 | 개발 (OG이미지) |
| gh-pages | ^6.3.0 | 개발 |

---

### 2-2. Coding (coding.dreamitbiz.com)

**소스 파일 구성:**
| 유형 | 수량 | 파일 |
|------|------|------|
| TSX 컴포넌트 | 34개 | pages/(16), components/(10), contexts/(4), layouts/(1) |
| TS 데이터 | 86개 | data/(80 문제파일), hooks/(4), config/(3), utils/(2), workers/(1) |
| CSS 파일 | 17개 | styles/ (17) |
| **총 소스 파일** | **137개** | (데이터 파일 포함) |

**주요 페이지 (라우트 17개):**
```
/                       Home
/problems               Problems → /problems/:category → /problems/:category/:id
/playground             Playground (코드 실행)
/guide                  Guide
/:lang                  ChapterList (python/java/c)
/:lang/:chapterId       ChapterDetail
/tips                   Tips
/progress               Progress
/login → /register → /forgot-password
/profile                Profile
/admin/dashboard/*      AdminDashboard (관리자)
```

**코드 스플리팅: ✅ 완벽 적용**
```javascript
// App.tsx - 모든 페이지 lazy load
const Home = lazyLoad(() => import('./pages/Home'));
const Problems = lazyLoad(() => import('./pages/Problems'));
// ... 16개 페이지 모두 dynamic import
// + chunk 로드 실패 시 자동 reload 로직
```

**빌드 최적화:**
- vite.config.ts: manualChunks → vendor, supabase, certificate, editor 4개 청크 분리
- 404.html: copy404Plugin으로 빌드 시 자동 생성
- Suspense + LoadingFallback: 코드 분할 로딩 UI 제공

**코딩 문제 데이터 구성:**
| 언어 | 챕터 수 | 파일 |
|------|---------|------|
| Python | 12개 | python01~python12.ts |
| Java | 12개 | java01~java12.ts |
| C | 12개 | c01~c12.ts |
| 알고리즘(난이도별) | 30개 | beginner/intermediate/advanced/practical |
| **총 문제** | **~66+** | |

**의존성:**
| 패키지 | 버전 | 유형 |
|--------|------|------|
| @supabase/supabase-js | ^2.99.1 | 런타임 |
| react / react-dom | ^19.2.4 | 런타임 |
| react-router-dom | ^7.13.1 | 런타임 |
| prismjs | ^1.30.0 | 런타임 |
| react-simple-code-editor | ^0.14.1 | 런타임 |
| html2canvas + jspdf | ^1.4.1 / ^4.2.0 | 런타임 |
| typescript | ~5.7.0 | 개발 |
| vite | ^8.0.0 | 개발 |
| gh-pages | ^6.3.0 | 개발 |

---

### 2-3. JDY (jdy.dreamitbiz.com)

**소스 파일 구성:**
| 파일 | 용도 |
|------|------|
| index.html | 메인 페이지 (포트폴리오 + Supabase 인증) |
| script.js | 441줄 - 네비게이션, i18n, 테마, 스크롤 애니메이션 |
| styles.css | 메인 스타일시트 |
| generate-og.js | OG 이미지 생성 스크립트 (Node.js) |
| CNAME | jdy.dreamitbiz.com |
| donga/index.html | 동아방송대 발표평가 시스템 (~600줄) |
| donga/eval.html | eval.html → index.html 리다이렉트 |
| donga/dashboard.html | 발표평가 대시보드 (~600줄) |
| donga/style.css | 동아방송대 평가 전용 스타일 |
| donga/app.js | 평가 시스템 JS (추정) |

**핵심 기능:**
- 직업미래연구소 포트폴리오 (6개 섹션)
- 한/영 언어 전환 (data-i18n 속성)
- 다크/라이트 테마 + 6개 컬러 팔레트
- 모바일 반응형 (hamburger 메뉴)
- Google/Kakao OAuth 인증 (Supabase CDN) ← **신규 추가**
- SSO 쿠키 연동 (dreamit_sso) ← **신규 추가**
- 동아방송대 발표평가 시스템 (donga/)

**CDN 의존성:**
| CDN | 용도 |
|-----|------|
| @supabase/supabase-js@2 | 인증 |
| Pretendard 폰트 | 한글 폰트 |
| Google Fonts (Outfit) | 영문 폰트 |
| Font Awesome 6.5.1 | 아이콘 |

---

## 3. 크로스 사이트 비교 분석

### 3-1. 인증 시스템 비교 (최신)

| 항목 | JobPath | Coding | JDY |
|------|---------|--------|-----|
| Google OAuth | ✅ | ✅ | ✅ (신규) |
| Kakao OAuth | ✅ | ✅ | ✅ (신규) |
| Kakao scopes | ❌ 미설정 | ✅ profile_nickname 등 | ✅ profile_nickname 등 |
| Email/Password | ❌ | ✅ | ❌ |
| 비밀번호 재설정 | ❌ | ✅ | ❌ |
| PKCE 인증 플로우 | ✅ | ✅ | ✅ (신규) |
| SSO 쿠키 | ✅ dreamit_sso | ✅ dreamit_sso | ✅ dreamit_sso (신규) |
| SSO 복원 (INITIAL_SESSION) | ✅ | ✅ | ✅ (신규) |
| 세션 타임아웃 | ✅ 10분 | ✅ 10분 | ❌ |
| 프로필 자동생성 | ✅ forjob_profiles + user_profiles | ✅ coding_profiles + user_profiles | ✅ user_profiles만 |
| signOut + SSO 정리 | ✅ global + clearSharedSession | ✅ global + clearSharedSession | ✅ signOut + clearSharedSession |
| Admin 이메일 | 1개 (aebon@kakao.com) | 2개 (+aebon@kyonggi.ac.kr) | 3개 (하드코딩) |
| ProfileCompleteModal | ✅ | ✅ | ❌ |

### 3-2. 기술 스택 비교

| 항목 | JobPath | Coding | JDY | 불일치 |
|------|---------|--------|-----|--------|
| React | 19.2.4 | 19.2.4 | ❌ | ✅ 일치 |
| Vite | 8.0.1 | 8.0.0 | ❌ | ⚠️ 마이너 차이 |
| TypeScript | **6.0.2** | **~5.7.0** | ❌ | 🔴 메이저 불일치 |
| react-router-dom | **7.1.0** | **7.13.1** | ❌ | ⚠️ 불일치 |
| Supabase JS | **2.49.0** | **2.99.1** | CDN 최신 | 🔴 0.50 차이 |
| supabase.js 타입 | ❌ JS (무타입) | ✅ TS | N/A | ⚠️ |

### 3-2b. TypeScript 설정 비교 (tsconfig.json)

| 설정 | JobPath | Coding | 영향 |
|------|---------|--------|------|
| `strict` | ✅ true | ✅ true | 기본 strict 모드 |
| **`noImplicitAny`** | 🔴 **false** | ✅ true (strict 기본) | JobPath: any 타입 암묵적 허용 |
| **`strictNullChecks`** | 🔴 **false** | ✅ true (strict 기본) | JobPath: null/undefined 오류 미검출 |
| **`noUnusedLocals`** | 🔴 **false** | ✅ **true** | JobPath: 미사용 변수 허용 |
| **`noUnusedParameters`** | 🔴 **false** | ✅ **true** | JobPath: 미사용 파라미터 허용 |
| `noFallthroughCasesInSwitch` | ✅ true | ✅ true | 일치 |
| `noUncheckedSideEffectImports` | ✅ true | ✅ true | 일치 |
| `resolveJsonModule` | ✅ true | ❌ 없음 | JobPath만 JSON import 지원 |
| `paths` alias (`@/*`) | ❌ 없음 | ✅ `@/* → src/*` | Coding만 경로 별칭 사용 |

**분석:**
JobPath는 `strict: true`를 설정했지만 `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`를 모두 **false로 오버라이드**하여 strict 모드의 핵심 기능을 비활성화함. 이는 `strict: true`를 사실상 무효화하는 설정으로, null 참조 오류와 타입 안전성 부재의 직접 원인.

Coding은 `strict: true` + 추가 규칙(`noUnusedLocals`, `noUnusedParameters`)까지 활성화하여 가장 엄격한 타입 체크 환경을 구성함.

### 3-3. 코드 품질 비교 (정밀 측정)

| 항목 | JobPath | Coding | JDY |
|------|---------|--------|-----|
| **console.log** | 1개 | 0개 | 1개 (generate-og.js) |
| **console.warn** | 5개 | 1개 | 0개 |
| **console.error** | 16개 | 3개 | 0개 |
| **console.info** | 1개 | 0개 | 0개 |
| **console.* 총합** | **23개** | **4개** | **1개** |
| 테스트 파일 | 0개 | 0개 | 0개 |
| Error Boundary | ❌ | ❌ (but Suspense ✅) | N/A |
| 코드 스플리팅 | ❌ 없음 | ✅ 전체 lazy load | N/A |
| TypeScript 커버리지 | ~76% (11 JS / 46 TSX) | ~100% (전체 TS) | 0% |
| 404 처리 | ✅ (public/404.html) | ✅ (자동 생성) | ❌ |
| SPA redirect | ✅ (index.html 스크립트) | ✅ (copy404Plugin) | N/A |
| dangerouslySetInnerHTML | **10개** | **1개** | 0개 (innerHTML 17개) |
| sitemap.xml | ❌ (robots.txt에 참조만) | ✅ (public/sitemap.xml) | ❌ |

### 3-4. SEO 비교

| 항목 | JobPath | Coding | JDY |
|------|---------|--------|-----|
| title | ✅ | ✅ | ✅ |
| meta description | ✅ | ✅ | ✅ |
| OG tags | ✅ (6개) | ✅ (7개) | ✅ (8개) |
| Twitter Card | ✅ | ✅ | ✅ |
| canonical | ✅ | ✅ | ❌ |
| robots meta | ✅ index,follow | ✅ index,follow | ❌ |
| robots.txt | ✅ | ✅ | ❌ |
| sitemap.xml | ❌ 누락 | ✅ | ❌ |
| schema.org | ❌ | ❌ | ❌ |

---

## 4. 문제점 분석

### 🔴 심각 (Critical) — 즉시 수정 필요

| # | 문제 | 사이트 | 상세 | 영향도 |
|---|------|--------|------|--------|
| C-1 | **결제 서버사이드 검증 없음** | JobPath | 클라이언트만으로 결제 완료 처리. Webhook 미구현 → 실제 DB 누락 발생 (박미영 건). `Checkout.tsx:96-130`에서 localStorage 백업으로 보완 중이나 근본 해결 아님 | **매출 누락** |
| C-2 | **Supabase anon key 인라인 노출** | JDY | `index.html:674`에 Supabase URL + anon key 직접 하드코딩. anon key라 RLS가 보호하지만 key rotation 시 소스 수정 필요 | **관리 위험** |
| C-3 | **dangerouslySetInnerHTML 10건 (무검증)** | JobPath | `SubjectStudy.tsx:124`, `StudySummary.tsx:71/138/194`, `PracticeMode.tsx:422/435`, `SilgiExamDetail.tsx:39/52`, `SilgiFrequent.tsx:47` — 데이터가 내부 JS 파일(`curriculum.js`)에서 오므로 현재 XSS 위험 낮으나, DB로 이동 시 위험 | **XSS 잠재** |
| C-4 | **localStorage 기반 접근 권한** | JobPath | `SubscriptionContext.tsx:19-37`에서 쿠폰 접근 권한을 localStorage에 저장. 브라우저 콘솔에서 조작 가능 → 유료 콘텐츠 우회 | **보안 우회** |

### 🟡 중요 (Important) — 빠른 시일 내 수정

| # | 문제 | 사이트 | 상세 |
|---|------|--------|------|
| I-1 | **JobPath 코드 스플리팅 없음** | JobPath | App.tsx에서 35개 페이지 모두 정적 import. Coding은 전체 lazy load 적용됨. AdminDashboard, Checkout 등 무거운 페이지 분리 필요 |
| I-2 | **TypeScript 메이저 버전 불일치** | 전체 | JobPath: 6.0.2, Coding: 5.7.0. 동일 코드 패턴이 다르게 동작할 수 있음 |
| I-2b | **JobPath tsconfig strict 무효화** | JobPath | `strict: true` 설정했으나 `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`, `noUnusedParameters: false`로 오버라이드. 사실상 strict 모드 비활성화 상태. null 참조 오류, 미사용 변수 방치의 원인. Coding은 strict + 추가 규칙 모두 활성화 |
| I-3 | **Supabase SDK 버전 불일치** | 전체 | JobPath: 2.49.0, Coding: 2.99.1. 50 마이너 버전 차이. 인증 관련 버그 픽스 누락 가능 |
| I-4 | **JobPath JS/TS 혼용 (11개 JS)** | JobPath | `supabase.js`, `admin.js`, `portone.js`, `scoring.js`, `curriculum.js` 등 핵심 파일이 JS. 타입 안전성 부재 |
| I-5 | **console.error/warn 23건** | JobPath | AuthContext(9), AdminDashboard(5), Checkout(2), ExamMode(2) 등. console.log 1건은 demo 모드용. 프로덕션 로깅 전략 부재 |
| I-6 | **JDY 세션 타임아웃 미적용** | JDY | JobPath/Coding은 10분 idle timeout 있으나, JDY는 없음. 인증 정책 불일치 |
| I-7 | **Admin 이메일 관리 불일치** | 전체 | JobPath: 1개 (config/admin.js), Coding: 2개 (config/admin.ts), JDY: 3개 (index.html 하드코딩). DB 테이블로 통일 필요 |
| I-8 | **user_profiles role 리셋** | JobPath | `AuthContext.tsx:65`에서 `role: 'member'` upsert. DB에서 role 변경해도 다음 로그인 시 리셋됨 |
| I-9 | **Error Boundary 없음** | JobPath, Coding | 컴포넌트 에러 시 전체 빈 화면. Coding은 Suspense는 있으나 ErrorBoundary는 없음 |
| I-10 | **JobPath sitemap.xml 누락** | JobPath | robots.txt에 `Sitemap: https://jobpath.dreamitbiz.com/sitemap.xml` 참조하나 파일 없음. SEO 크롤러 오류 |

### 🟢 개선 권장 (Improvement)

| # | 문제 | 사이트 | 상세 |
|---|------|--------|------|
| G-1 | **테스트 코드 0건** | 전체 | 단위/통합/E2E 테스트 없음. 결제 플로우, 인증 플로우 최소한 테스트 필요 |
| G-2 | **CI/CD 자동화 없음** | 전체 | 수동 `npm run deploy`. GitHub Actions 미설정 |
| G-3 | **SSO 쿠키 HttpOnly 미적용** | 전체 | JS에서 document.cookie로 접근. XSS 발생 시 refresh_token 탈취 가능. 서버사이드 전환 필요 |
| G-4 | **JDY innerHTML 사용 (17개)** | JDY | donga/dashboard.html(12), donga/index.html(4), script.js(3). 대부분 내부 데이터지만 사용자 입력 포함 가능 시 XSS 벡터 |
| G-5 | **schema.org 구조화 데이터 없음** | 전체 | Google 리치 결과에 미표시 |
| G-6 | **접근성(A11y) 미흡** | 전체 | ARIA 레이블 최소. WCAG 2.1 AA 감사 필요 |
| G-7 | **JDY canonical URL 없음** | JDY | SEO 중복 페이지 문제 가능 |
| G-8 | **JDY robots.txt 없음** | JDY | 크롤러 가이드 부재 |
| G-9 | **Coding Pyodide 워커** | Coding | `pyodide.worker.ts` 있으나 대용량(~20MB). 초기 로드 최적화 필요 |
| G-10 | **JDY ProfileCompleteModal 없음** | JDY | 이름 미입력 사용자 프로필 완성 유도 없음 |

---

## 5. 수정 완료 내역 (이번 세션 전체)

| # | 수정 내용 | 사이트 | 커밋 | 상태 |
|---|----------|--------|------|------|
| 1 | forjob_profiles upsert에서 `provider` 컬럼 제거 | JobPath | 484bcc7 | ✅ |
| 2 | forjob_profiles upsert에서 `role: 'member'` 리셋 제거 | JobPath | 484bcc7 | ✅ |
| 3 | Footer 카카오톡 ID dreamitbiz → aebon | JobPath | 484bcc7 | ✅ |
| 4 | SQL: app_metadata → raw_app_meta_data 수정 | JobPath | 9e97af1 | ✅ |
| 5 | 박미영 누락 주문 INSERT SQL 작성 | JobPath | b5d7832 | ✅ 실행됨 |
| 6 | 이화연/성예종 주문번호 PortOne 동기화 SQL | JobPath | b5d7832 | ✅ 실행됨 |
| 7 | signOut scope: 'local' → global 통일 | Coding | 032571e | ✅ |
| 8 | signOut에 clearSharedSession() 명시적 호출 추가 | Coding | 032571e | ✅ |
| 9 | JDY 인증 시스템 전면 구축 (SSO + PKCE + user_profiles) | JDY | 0b057d0 | ✅ |
| 10 | JDY admin 이메일 오타 수정 (radica → radical) | JDY | 0b057d0 | ✅ |
| 11 | JDY 로그인 모달 제목 변경 (동아방송대 → 로그인) | JDY | 0b057d0 | ✅ |
| 12 | JDY Kakao scopes 추가 | JDY | 0b057d0 | ✅ |

---

## 6. 우선순위별 개선 로드맵

### Phase 1: 긴급 (1주 이내)

| # | 작업 | 사이트 | 난이도 | 효과 |
|---|------|--------|--------|------|
| 1 | **결제 Webhook 구현** | JobPath | 🔴 높음 | 매출 누락 방지 |
| | Supabase Edge Function으로 PortOne Webhook 수신 | | | |
| | 클라이언트 INSERT 실패해도 서버에서 주문 보장 | | | |
| 2 | **JobPath 코드 스플리팅** | JobPath | 🟢 낮음 | 초기 로드 50%+ 감소 |
| | App.tsx에 lazy() + Suspense 적용 (Coding 패턴 복사) | | | |
| 3 | **sitemap.xml 생성** | JobPath | 🟢 낮음 | SEO 크롤러 오류 해소 |
| 4 | **localStorage 접근 권한 → DB 검증** | JobPath | 🟡 중간 | 보안 우회 차단 |

### Phase 2: 중요 (2~4주)

| # | 작업 | 사이트 | 난이도 |
|---|------|--------|--------|
| 5 | **패키지 버전 통일** | 전체 | 🟡 중간 |
| | TypeScript 6.x, Supabase JS 최신, react-router-dom 최신 | | |
| 6 | **JobPath JS → TS 전환** (11파일) | JobPath | 🟡 중간 |
| | 특히 supabase.js, portone.js, admin.js | | |
| 6b | **JobPath tsconfig strict 정상화** | JobPath | 🟢 낮음 |
| | `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters` → true로 변경. 빌드 오류 순차 수정 | | |
| 7 | **Error Boundary 추가** | JobPath, Coding | 🟢 낮음 |
| 8 | **Admin 이메일 DB 테이블화** | 전체 | 🟡 중간 |
| 9 | **user_profiles role upsert 수정** | JobPath | 🟢 낮음 |
| | role 필드를 upsert에서 제외, 또는 INSERT 시에만 설정 | | |
| 10 | **JDY 세션 타임아웃 추가** | JDY | 🟢 낮음 |

### Phase 3: 개선 (1~3개월)

| # | 작업 | 사이트 |
|---|------|--------|
| 11 | CI/CD 자동화 (GitHub Actions) | 전체 |
| 12 | 테스트 도입 (Vitest + Playwright) | 전체 |
| 13 | SSO 쿠키 HttpOnly 전환 (서버사이드 필요) | 전체 |
| 14 | dangerouslySetInnerHTML 검증/대체 | JobPath |
| 15 | 접근성 WCAG 2.1 AA 준수 | 전체 |
| 16 | schema.org 구조화 데이터 | 전체 |
| 17 | console.* 프로덕션 로깅 전략 (환경별 로그 레벨) | JobPath |
| 18 | Pyodide 워커 로딩 최적화 | Coding |

---

## 7. 아키텍처 분석

### 현재 아키텍처
```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   브라우저    │────▶│  GitHub Pages    │     │    Supabase         │
│             │     │  (정적 호스팅)    │────▶│  DB + Auth + RLS    │
│ React SPA   │     │  404→index 리다   │     │  dreamit_sso 쿠키   │
│ (JS Bundle) │     │  이렉트           │     └─────────────────────┘
│             │     └──────────────────┘              │
│ PortOne SDK │─────────────────────────▶  KG이니시스 결제
│ (클라이언트) │    (결제 완료 후 클라이언트가 직접 DB INSERT)
└─────────────┘
      ⚠️ Webhook 없음 → DB 누락 발생
```

### 권장 아키텍처
```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   브라우저    │────▶│  Vercel/Netlify  │     │    Supabase         │
│             │     │  (정적 + Edge)    │────▶│  DB + Auth + RLS    │
│ React SPA   │     │  SPA 라우팅 지원  │     │  dreamit_sso 쿠키   │
│ (JS Bundle) │     └──────────────────┘     │                     │
│             │                               │  Edge Functions:    │
│ PortOne SDK │──▶  KG이니시스 ──Webhook──▶  │  /webhook/portone   │
│             │                               │  (서버사이드 검증)   │
└─────────────┘                               └─────────────────────┘
```

**변경 효과:**
- 결제 DB 누락 근본 해결 (Webhook → Edge Function → DB INSERT)
- SPA 새로고침 404 완벽 해결 (Vercel/Netlify 라우팅 규칙)
- 빌드 시 자동 배포 (Git push → 자동 Deploy)
- Edge Function으로 보안 검증 로직 서버사이드 이동

---

## 8. 종합 평가

| 평가 항목 | JobPath | Coding | JDY | 비고 |
|----------|---------|--------|-----|------|
| 기능 완성도 | ★★★★☆ | ★★★★☆ | ★★★☆☆ | 모두 핵심 기능 동작 |
| 코드 품질 | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ | Coding: strict TS. JobPath: strict 무효화+JS혼용 |
| 코드 구조 | ★★★☆☆ | ★★★★★ | ★★☆☆☆ | Coding 코드스플리팅 완벽 |
| 보안 | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | JobPath localStorage 보안 우회 |
| 성능 | ★★☆☆☆ | ★★★★☆ | ★★★★☆ | JobPath 코드스플리팅 없음 |
| SEO | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | Coding만 sitemap 있음 |
| 접근성 | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | 모두 개선 필요 |
| 테스트 | ☆☆☆☆☆ | ☆☆☆☆☆ | ☆☆☆☆☆ | 전체 0건 |
| CI/CD | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | 수동 배포 |
| 인증/SSO | ★★★★☆ | ★★★★★ | ★★★☆☆ | Coding 가장 완성도 높음 |
| **종합** | **★★★☆☆** | **★★★★☆** | **★★★☆☆** | |

---

## 9. 총평

### Coding — 가장 모범적인 프로젝트 ★★★★☆
- 100% TypeScript, 전체 lazy load, 4청크 빌드 최적화, sitemap 포함
- 인증 시스템 가장 완성도 높음 (Email 포함, 비밀번호 재설정)
- 개선점: Error Boundary, 테스트, CI/CD

### JobPath — 기능 풍부하나 구조적 부채 ★★★☆☆
- 결제 시스템까지 갖춘 가장 복잡한 프로젝트
- **최우선 과제**: 결제 Webhook 서버사이드 검증 (실제 매출 누락 발생)
- JS/TS 혼용 (11개 JS), 코드 스플리팅 없음, dangerouslySetInnerHTML 과다 사용
- **tsconfig strict 무효화**: `strict: true` 설정했지만 `strictNullChecks`, `noImplicitAny` 등 핵심 4개 옵션을 false로 오버라이드하여 사실상 non-strict. null 참조 오류 미검출
- Coding 프로젝트의 패턴(lazy load + strict TS + 4청크 빌드)을 참고하여 개선하면 빠르게 품질 향상 가능

### JDY — SSO 연동 완료, 추가 정비 필요 ★★★☆☆
- 이번 세션에서 인증 시스템 구축 완료 (SSO + PKCE + user_profiles)
- 동아방송대 발표평가 시스템이 별도로 존재 (donga/)
- 세션 타임아웃, ProfileCompleteModal, robots.txt 등 정책 동기화 필요
