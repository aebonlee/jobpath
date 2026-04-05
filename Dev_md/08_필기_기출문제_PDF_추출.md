# ForJob - 필기 기출문제 PDF 추출 (3,900문항)

**작성일:** 2026-04-05
**프로젝트:** ForJob (직업상담사 2급 시험 준비 플랫폼)
**배포 URL:** https://forjob.dreamitbiz.com/pilgi/select
**커밋:** 992002b, e274f14, b7c1208

---

## 개요

`Dev_md/pdf/` 폴더의 교사용 PDF 39개에서 필기 기출문제 3,900문항을 자동 추출하고,
해설집 PDF 8개에서 721개 해설을 병합했습니다.
Node.js `pdf-parse` 라이브러리로 텍스트 추출 후 정규식 파싱.

---

## 추출 현황

### 교사용 PDF (39개 → 3,900문항)

| 연도 | 회차 | 문항수 | 비고 |
|------|------|--------|------|
| 2010 | 1~4회 | 400 | 4회제 |
| 2011 | 1~3회 | 300 | |
| 2012 | 1~3회 | 300 | |
| 2013 | 1~3회 | 300 | |
| 2014 | 1~3회 | 300 | |
| 2015 | 1~3회 | 300 | |
| 2016 | 1~3회 | 300 | |
| 2017 | 1~3회 | 300 | |
| 2018 | 1~3회 | 300 | |
| 2019 | 1~3회 | 300 | |
| 2020 | 1~3회 | 300 | |
| 2021 | 1~3회 | 300 | |
| 2022 | 1~2회 | 200 | |
| **합계** | **39회** | **3,900** | 누락 0, 빈 보기 0 |

### 해설집 PDF (8개 → 721개 해설)

| 연도-회차 | 해설 수 | 비율 |
|-----------|---------|------|
| 2018-1회 | 87 | 87% |
| 2019-1회 | 92 | 92% |
| 2019-2회 | 79 | 79% |
| 2019-3회 | 92 | 92% |
| 2020-2회 | 96 | 96% |
| 2020-3회 | 86 | 86% |
| 2021-3회 | 94 | 94% |
| 2022-2회 | 95 | 95% |

---

## PDF 파싱 로직

### 정답 마커 인식

교사용 PDF는 정답을 특수 유니코드 문자로 표시:
- `❶` (U+2776) → 정답 1번
- `❷` (U+2777) → 정답 2번
- `❸` (U+2778) → 정답 3번
- `❹` (U+2779) → 정답 4번

### 파싱 스크립트 (`scripts/parse-pdf.cjs`)

1. `pdf-parse` (PDFParse 클래스)로 PDF → 텍스트 변환
2. `\d{1,3}\.` 패턴으로 문제 블록 분리
3. `❶❷❸❹` 마커로 정답 번호 추출
4. `①②③④` 분할로 보기 4개 추출
5. 정답표 영역(`전자문제집 CBT PC 버전`) 이후 텍스트 제거
6. 페이지 헤더/푸터, 과목 마커 정리

### 해설 파싱 (`scripts/parse-explanations.cjs`)

1. `<문제 해설>` 태그로 해설 블록 분리
2. 이전 블록에서 문제 번호 역추적
3. `[해설작성자 : xxx]` 제거
4. 기존 `pilgiQuestions.json`의 `explanation` 필드에 병합

### Q100 파싱 이슈 해결

마지막 문제(Q100) 이후에 정답표가 나오면서 `①②③④`가 보기를 덮어쓰는 문제 발생.
- 수정: `전자문제집 CBT PC 버전` 텍스트 위치를 찾아 텍스트 경계로 사용
- 추가: 보기는 첫 번째 등장만 취하도록 `!options[optNum - 1]` 조건 추가

---

## 데이터 구조

### `pilgiQuestions.json` 스키마

```json
{
  "question_number": 1,
  "subject_id": 1,
  "exam_year": 2020,
  "exam_session": 1,
  "question_text": "Bordin이 제시한 직업문제의...",
  "option_1": "인지적 갈등",
  "option_2": "확신의 결여",
  "option_3": "정보의 부족",
  "option_4": "내적 갈등",
  "correct_answer": 1,
  "explanation": "해설 텍스트 (있는 경우)"
}
```

### 과목 매핑

| subject_id | 과목명 | 문항 범위 |
|-----------|--------|----------|
| 1 | 직업상담학 | Q1~Q20 |
| 2 | 직업심리학 | Q21~Q40 |
| 3 | 직업정보론 | Q41~Q60 |
| 4 | 노동시장론 | Q61~Q80 |
| 5 | 노동관계법규 | Q81~Q100 |

---

## 앱 연동 — 로컬 Fallback 패턴

### `pilgiLoader.ts`

Supabase에 데이터가 있으면 Supabase에서 조회, 없으면 로컬 JSON fallback.

```typescript
export async function loadPilgiQuestions(options?) {
  // 1. Supabase 시도
  const { data } = await supabase.from(TABLES.QUESTIONS).select('*')...
  if (data?.length > 0) return data;

  // 2. 로컬 JSON fallback (dynamic import → lazy load)
  const mod = await import('./pilgiQuestions.json');
  return withLocalIds(mod.default);
}
```

- JSON은 Vite에 의해 별도 chunk로 분리 (lazy load)
- 초기 페이지 로드에 영향 없음
- `getAvailableYears()`, `getAvailableSessions()` 비동기 API 제공

### 수정된 컴포넌트

| 컴포넌트 | 변경 |
|---------|------|
| `ExamSelect.tsx` | `loadPilgiQuestions()` 사용, `useEffect`로 연도/회차 로드 |
| `StudyMode.tsx` | `loadPilgiQuestions()` 사용, 과목 필터 연동 |

---

## Supabase 업로드

### SQL 스크립트

`sql/insert-pilgi-questions.sql` (704KB, 3,900 INSERT)

Supabase Dashboard → SQL Editor에서 실행:
1. 기존 데이터 확인/삭제 (필요시)
2. INSERT 실행
3. 검증 쿼리로 연도별/과목별 문항수 확인

### RLS 참고

- anon key로는 INSERT 불가 (RLS 정책)
- SELECT는 허용됨
- 데이터 삽입은 SQL Editor 또는 service role key 필요

---

## 변경 파일

| 파일 | 변경 |
|------|------|
| `src/data/pilgiQuestions.json` | 신규 — 3,900문항 + 721해설 (2.45MB) |
| `src/data/pilgiLoader.ts` | 신규 — Supabase/로컬 데이터 로더 |
| `src/pages/pilgi/ExamSelect.tsx` | 수정 — pilgiLoader 연동, 동적 연도/회차 |
| `src/pages/pilgi/StudyMode.tsx` | 수정 — pilgiLoader 연동 |
| `tsconfig.json` | 수정 — `resolveJsonModule: true` 추가 |
| `package.json` | 수정 — `pdf-parse` 의존성 추가 |
| `scripts/parse-pdf.cjs` | 신규 — PDF 텍스트 파싱 스크립트 |
| `scripts/parse-explanations.cjs` | 신규 — 해설집 파싱 스크립트 |
| `scripts/generate-sql.cjs` | 신규 — JSON → SQL 변환 |
| `sql/insert-pilgi-questions.sql` | 신규 — Supabase INSERT 스크립트 |
| `.gitignore` | 수정 — `Dev_md/pdf/` 추가 |

---

## 재현 방법

```bash
# 1. PDF에서 문항 추출
node scripts/parse-pdf.cjs

# 2. 해설집에서 해설 병합
node scripts/parse-explanations.cjs

# 3. SQL 스크립트 생성
node scripts/generate-sql.cjs

# 4. 검증
node scripts/verify-data.cjs
node scripts/verify-explanations.cjs
```
