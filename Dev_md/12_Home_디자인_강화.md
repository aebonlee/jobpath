# Home 페이지 디자인 강화 — 개인화 홈 + 랜딩 리디자인

> 작성일: 2026-04-06
> 작업: 로그인/비로그인 Home 분기, 디자인 요소 대폭 강화

---

## 1. 개요

기존 개인화 Home 구현(08번 문서)의 디자인을 대폭 강화.
`ph-*` (personalized home) CSS 클래스 체계로 전면 리디자인.

---

## 2. 로그인 홈 (LoggedInHome)

### 구조
```
┌──────────────────────────────────────────────┐
│  그래디언트 히어로 배너 (장식 원 3개)           │
│  인사말 + D-day 뱃지                          │
├──────────────────────────────────────────────┤
│  4열 통계 스트립 (필기/실기/북마크/오답)         │
├──────────────────────────────────────────────┤
│  약점 과목 알림 (있을 경우)                     │
├──────────────────────────────────────────────┤
│  4열 액션카드 (필기CBT/실기연습/오답복습/학습요약) │
├──────────────────────────────────────────────┤
│  과목별 학습하기 (가로 스크롤 필)               │
├──────────────────────────────────────────────┤
│  3단계 학습 가이드 (번호 + 설명 + 링크)         │
├──────────────────────────────────────────────┤
│  그래디언트 CTA 카드 → 대시보드                │
└──────────────────────────────────────────────┘
```

### 주요 컴포넌트

| 영역 | CSS 클래스 | 설명 |
|------|-----------|------|
| 히어로 배너 | `.ph-hero` | `linear-gradient(135deg, #1B3A6B → #2563EB → #3B82F6)` |
| 장식 원 | `.ph-hero-circle` | 3개, 흰색 반투명, `backdrop-filter: blur` |
| D-day | `.ph-dday` | 유리형 뱃지, 글래스모피즘 효과 |
| 통계 칩 | `.ph-stat-chip` | 아이콘 + 숫자 + 라벨, 호버 상승 효과 |
| 약점 알림 | `.ph-alert` | 좌측 빨간 보더, 경고 배경 |
| 액션카드 | `.ph-action-card` | 상단 컬러 보더 (blue/green/red/purple) |
| 과목 필 | `.ph-subject-pill` | 가로 스크롤, 각 과목 색상 보더 |
| 학습 가이드 | `.ph-guide-step` | 번호 원 + 제목 + 설명 + 링크 |
| CTA | `.ph-cta-inner` | 그래디언트 배경, 우측 장식 원 |

### Supabase 데이터 로딩
```tsx
// 최근 1건 필기/실기 점수
const { data: lastPilgi } = await supabase
  .from(TABLES.exam_sessions)
  .select('score_total')
  .eq('user_id', user.id)
  .eq('exam_type', 'pilgi_full')
  .order('created_at', { ascending: false })
  .limit(1);

// 북마크/오답 카운트
const { count: bookmarkCount } = await supabase
  .from(TABLES.bookmarks).select('*', { count: 'exact', head: true })
  .eq('user_id', user.id);
```

---

## 3. 비로그인 랜딩 (LandingHome)

### 추가된 섹션
- **Hero stats**: D-day 카운터 추가 (다음 시험일까지)
- **학습 로드맵**: 4단계 (이론학습 → 문제풀기 → 오답복습 → 모의시험)
- **기능 카드**: 개별 컬러 (blue/green/purple/amber/rose/indigo)

### D-day 계산 로직
```tsx
function getDday() {
  const exams = [
    { date: '2026-05-09', name: '2026년 2회 필기' },
    { date: '2026-07-26', name: '2026년 2회 실기' },
    // ...
  ];
  const today = new Date();
  const upcoming = exams.find(e => new Date(e.date) >= today);
  if (!upcoming) return null;
  const diff = Math.ceil((new Date(upcoming.date) - today) / 86400000);
  return { dday: diff, name: upcoming.name };
}
```

---

## 4. 반응형 브레이크포인트

| 브레이크포인트 | 변경 사항 |
|-------------|----------|
| `≤ 1024px` | 통계 2열, 액션카드 2열, CTA 세로 |
| `≤ 768px` | 히어로 세로, 통계 2열, 가이드 세로 |

---

## 5. 다크모드

`src/styles/dark-mode.css`에 모든 `ph-*` 클래스의 다크모드 스타일 추가.
- 히어로 그래디언트: `#0F172A → #1E3A5F → #1B3A6B`
- 카드 배경: `var(--bg-white)` (다크모드 자동)
- CTA 그래디언트: `#1E3A5F → #0F172A`

---

## 6. 변경 파일

| 파일 | 변경 내용 |
|------|----------|
| `src/pages/Home.tsx` | LoggedInHome/LandingHome 전면 리디자인 |
| `src/styles/home.css` | `ph-*` 클래스 체계 (~400줄 추가) |
| `src/styles/dark-mode.css` | `ph-*` 다크모드 스타일 추가 |
