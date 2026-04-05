export const SITE = {
  name: 'ForJob',
  title: '직업상담사 2급 시험 준비 플랫폼',
  description: '직업상담사 2급 필기·실기 시험 준비를 위한 CBT 학습 플랫폼',
  url: 'https://forjob.dreamitbiz.com',
  domain: 'forjob.dreamitbiz.com',
};

export const SUBJECTS = [
  { id: 1, code: 'counseling', name: '직업상담학', color: '#3B82F6', icon: 'fa-solid fa-comments', sortOrder: 1 },
  { id: 2, code: 'psychology', name: '직업심리학', color: '#8B5CF6', icon: 'fa-solid fa-brain', sortOrder: 2 },
  { id: 3, code: 'jobinfo', name: '직업정보론', color: '#10B981', icon: 'fa-solid fa-circle-info', sortOrder: 3 },
  { id: 4, code: 'labor_market', name: '노동시장론', color: '#F59E0B', icon: 'fa-solid fa-chart-line', sortOrder: 4 },
  { id: 5, code: 'labor_law', name: '노동관계법규', color: '#EF4444', icon: 'fa-solid fa-scale-balanced', sortOrder: 5 },
];

export const EXAM_CONFIG = {
  pilgi: {
    totalQuestions: 100,
    questionsPerSubject: 20,
    timeLimit: 150 * 60, // 150분 in seconds
    passScore: 60,
    subjectMinScore: 40,
    optionCount: 4,
  },
  silgi: {
    timeLimit: 150 * 60,
    passScore: 60,
  },
};

export const NAV_ITEMS = [
  { path: '/info', label: 'About', icon: 'fa-solid fa-circle-question',
    children: [
      { path: '/pilgi', label: '필기' },
      { path: '/silgi', label: '실기' },
      { path: '/info', label: '시험안내' },
    ]
  },
  { path: '/learn', label: '학습요약', icon: 'fa-solid fa-graduation-cap',
    children: [
      { path: '/learn/counseling', label: '직업상담학' },
      { path: '/learn/psychology', label: '직업심리학' },
      { path: '/learn/jobinfo', label: '직업정보론' },
      { path: '/learn/labor_market', label: '노동시장론' },
      { path: '/learn/labor_law', label: '노동관계법규' },
      { path: '/learn/silgi', label: '실기 실무' },
    ]
  },
  { path: '/dashboard', label: '대시보드', icon: 'fa-solid fa-chart-pie' },
  { path: '/bookmarks', label: '북마크', icon: 'fa-solid fa-bookmark' },
  { path: '/wrong-answers', label: '오답노트', icon: 'fa-solid fa-rotate-left' },
];
