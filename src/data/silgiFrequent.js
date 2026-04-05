/* ============================================
   ForJob - 실기 5개년 빈출 기출정리 (2019~2023)
   총 177문항 | 5개 과목 분류
   ============================================ */

export const FREQUENT_CATEGORIES = [
  { id: 'all', label: '전체', color: '#6366F1', icon: 'fa-solid fa-list' },
  { id: 'counseling', label: '직업상담학', color: '#3B82F6', icon: 'fa-solid fa-comments' },
  { id: 'psychology', label: '직업심리학', color: '#8B5CF6', icon: 'fa-solid fa-brain' },
  { id: 'jobinfo', label: '직업정보론', color: '#10B981', icon: 'fa-solid fa-circle-info' },
  { id: 'labor_market', label: '노동시장론', color: '#F59E0B', icon: 'fa-solid fa-chart-line' },
];

export const SILGI_FREQUENT = [
  /* ===================================================================
     직업상담학 (counseling)
     =================================================================== */
  {
    num: 1, category: 'counseling',
    title: '부처(Butcher)의 집단 직업상담의 과정 3단계 모델에 대해 쓰고 설명하시오.',
    frequency: '22-3, 21-3, 21-1, 20-2',
    keyword: '부처(Butcher) 집단직업상담 3단계',
    answer: `<ol>
<li><strong>탐색단계</strong><br/>자기개방, 흥미와 적성에 대한 탐색, 측정결과에 대한 피드백, 자아상과 피드백 내용 간 불일치의 해결</li>
<li><strong>전환단계</strong><br/>자신의 지식과 직업세계의 연결이 이루어지는 단계, 가치와 피드백 간 불일치 해결</li>
<li><strong>행동단계</strong><br/>목표를 설정하고 정보의 수집과 공유가 이루어지며, 목표를 달성하기 위한 구체적인 행동을 하는 단계</li>
</ol>`,
  },
  {
    num: 2, category: 'counseling',
    title: '아들러(Adler)의 개인주의 상담과정의 목표 5가지를 쓰시오.',
    frequency: '22-3, 20-1',
    keyword: '아들러(Adler) 개인주의 상담 목표',
    answer: `<ol>
<li>사회적 관심을 갖도록 돕는다.</li>
<li>패배감을 극복하고 열등감을 감소시킬 수 있도록 돕는다.</li>
<li>내담자의 잘못된 가치와 목표를 수정하도록 돕는다.</li>
<li>잘못된 동기를 바꾸도록 돕는다.</li>
<li>내담자가 타인과의 동질감을 갖도록 돕는다.</li>
<li>사회의 구성원으로 기여하도록 돕는다.</li>
</ol>`,
  },
  {
    num: 3, category: 'counseling',
    title: '크라이티스(Crites)의 포괄적 직업상담의 상담과정을 단계별로 설명하시오.',
    frequency: '22-3, 19-1',
    keyword: '크라이티스(Crites) 포괄적 직업상담',
    answer: `<ol>
<li><strong>제1단계 : 진단</strong><br/>내담자의 진로문제 진단 및 문제파악을 위해 심리검사 자료와 상담을 통한 자료가 수집된다.</li>
<li><strong>제2단계 : 명료화 및 해석</strong><br/>의사결정 과정을 방해하는 태도와 행동을 확인해 대안을 탐색한다. 상담자와 내담자가 함께 문제의 원인을 명료화하고 해결방안을 모색하는 단계이다.</li>
<li><strong>제3단계 : 문제해결</strong><br/>문제해결을 위해 어떤 행동을 실제로 취해야 하는지 결정한다.</li>
</ol>`,
  },
  {
    num: 4, category: 'counseling',
    title: '직업적응 이론에서 개인과 환경이 상호작용하는 특성을 나타내는 4가지 성격유형 요소를 설명하시오.',
    frequency: '22-3, 20-2',
    keyword: '직업적응이론(TWA) 성격유형 요소',
    answer: `<ol>
<li><strong>민첩성</strong><br/>개인이 얼마나 빠르게 환경에 적응할 수 있는가를 의미하는 것으로 속도를 중시한다.</li>
<li><strong>역량</strong><br/>개인이 환경과 상호작용을 하는 활동수준, 또는 강도를 의미. 높은 에너지를 가진 사람이 더 많은 역량이 있다고 볼 수 있다.</li>
<li><strong>리듬</strong><br/>과제를 수행하는 과정의 패턴이 얼마나 꾸준하고 주기적인가 또는 불규칙한가를 의미한다.</li>
<li><strong>지구력(지속성)</strong><br/>개인이 불만족스러운 환경을 참고 얼마나 오래 상호작용을 유지할 수 있는가를 나타낸다.</li>
</ol>`,
  },
  {
    num: 5, category: 'counseling',
    title: '롭퀴스트와 데이비스의 직업적응 이론에서 직업적응방식의 유형을 쓰고 설명하시오.',
    frequency: '23-2, 19-1',
    keyword: '직업적응이론(TWA) 적응방식 유형',
    answer: `<ol>
<li><strong>융통성</strong> : 개인이 작업환경과 개인의 환경 사이 부조화를 참아낼 수 있는 정도</li>
<li><strong>끈기</strong> : 환경이 자신에게 맞지 않아도 얼마나 오래 견딜 수 있는지</li>
<li><strong>반응성</strong> : 개인이 작업환경에 반응하는 정도</li>
<li><strong>적극성</strong> : 개인이 작업환경을 자신과 더 조화롭게 만들기 위해 노력하는 정도</li>
</ol>`,
  },
  {
    num: 6, category: 'counseling',
    title: '직업적응 이론(TWA)에서 중요하게 다루는 직업가치 6가지를 쓰시오.',
    frequency: '22-3',
    keyword: '직업적응이론(TWA) 직업가치',
    answer: `<ol><li>지위</li><li>성취</li><li>이타심</li><li>안정성</li><li>보호(안락함, 편안함)</li><li>자율성</li></ol>`,
  },
  {
    num: 7, category: 'counseling',
    title: '크롬볼츠(Krumboltz)가 제시한 진로선택에 영향을 주는 요인 4가지를 쓰시오.',
    frequency: '22-3',
    keyword: '크롬볼츠(Krumboltz) 진로선택 영향요인',
    answer: `<ol><li>유전적 요인과 특별한 능력</li><li>환경적 조건과 사건</li><li>학습경험</li><li>과제 접근 기술</li></ol>`,
  },
  {
    num: 42, category: 'counseling',
    title: '인터넷을 이용한 사이버상담의 필요성을 6가지 쓰시오.',
    frequency: '22-3',
    keyword: '사이버상담 필요성',
    answer: `<ol>
<li>접근이 용이하다.</li>
<li>익명성이 보장되어 솔직한 표현이 가능하다.</li>
<li>직접 대면하는 것이 아니므로 심리적인 부담이 덜하다.</li>
<li>상담 중 자료의 탐색이 용이하다.</li>
<li>가명을 이용하여 상담 사례를 소개하는 것이 가능하다.</li>
<li>내담자 주도로 자기 성찰 능력을 기를 수 있다.</li>
</ol>`,
  },
  {
    num: 49, category: 'counseling',
    title: '발달적 직업상담에서 진로 자서전과 의사결정 일기를 각각 설명하시오.',
    frequency: '19-3',
    keyword: '진로 자서전 / 의사결정 일기',
    answer: `<ol>
<li><strong>진로 자서전</strong><br/>내담자가 과거에 어떤 의사결정을 했는지 자유롭게 기술하는 자료이다.</li>
<li><strong>의사결정 일기</strong><br/>진로 자서전의 보충 역할을 하는 것으로, 내담자의 일상적인 의사결정 방식을 작성하도록 하는 것이다.</li>
</ol>`,
  },
  {
    num: 61, category: 'counseling',
    title: '보딘이 제시한 직업문제의 심리적 원인 5가지를 쓰고 설명하시오.',
    frequency: '23-2, 21-1, 19-2',
    keyword: '보딘(Bordin) 심리적 원인',
    answer: `<ol>
<li><strong>의존성</strong> : 직업을 스스로 결정하지 못하고 타인에게 의존하는 경우</li>
<li><strong>자아갈등(내적갈등)</strong> : 자아의 내적 갈등으로 인해 직업을 선택하지 못하는 경우</li>
<li><strong>정보의 부족</strong> : 정보가 부족하여 직업을 결정하지 못하는 경우</li>
<li><strong>선택에 대한 불안</strong> : 자신이 하려는 일에 대한 타인의 반응 때문에 불안하여 직업 선택에 어려움을 겪는 경우</li>
<li><strong>확신의 부족(문제 없음)</strong> : 문제 없는 직업 선택을 하였으나 이에 대한 확신이 부족한 경우</li>
</ol>`,
  },
  {
    num: 62, category: 'counseling',
    title: '보딘의 3단계 직업상담과정을 쓰고 각각에 대해 설명하시오.',
    frequency: '20-3',
    keyword: '보딘(Bordin) 3단계 직업상담과정',
    answer: `<ol>
<li><strong>탐색과 계약설정 단계</strong><br/>내담자의 욕구와 정신 역동성을 탐색하고 상담을 구조화한다.</li>
<li><strong>중대한 결정 단계</strong><br/>내담자의 성격에 맞는 직업을 선택할 것인지, 직업에 맞게 성격을 변화시킬 것인지 중대한 결정을 한다.</li>
<li><strong>변화를 위한 노력 단계</strong><br/>내담자가 결정한 방향으로 변화할 수 있도록 노력한다.</li>
</ol>`,
  },
  {
    num: 63, category: 'counseling',
    title: '형태주의(게슈탈트) 상담의 상담기법을 4가지 쓰시오.',
    frequency: '23-2, 19-3',
    keyword: '게슈탈트 상담기법',
    answer: `<ol>
<li><strong>꿈작업</strong> : 꿈이 현재 일어난 일인 것처럼 연기하도록 하는 기법</li>
<li><strong>빈의자 기법</strong> : 빈의자에 상대가 있다고 생각하고 감정을 표현하도록 하는 기법</li>
<li><strong>과장하기</strong> : 내담자가 자신의 말과 행동을 과장하여 욕구와 감정을 명확하게 이해시키는 기법</li>
<li><strong>신체자각</strong> : 신체 감각을 통해 감정을 자각하도록 하는 기법</li>
<li><strong>언어자각</strong> : 언어를 통해 자신의 욕구를 알 수 있도록 하는 기법</li>
<li><strong>욕구와 감정의 자각</strong> : 현재 상황에서 느끼는 욕구와 감정을 자각하도록 하는 기법</li>
<li><strong>자기 부분들 간의 대화</strong> : 내담자 안에 내재된 자아들 간의 대화를 유도하는 기법</li>
</ol>`,
  },
  {
    num: 65, category: 'counseling',
    title: '내담자중심 상담기법에서 상담자의 태도 3가지를 쓰시오.',
    frequency: '20-1',
    keyword: '내담자중심 상담 상담자 태도',
    answer: `<ol>
<li><strong>일치성 또는 진실성</strong> : 상담자가 자신의 감정이나 생각을 있는 그대로 솔직하게 표현하는 것</li>
<li><strong>무조건적인 수용</strong> : 내담자의 말을 비판하거나 평가하지 않고 존중하는 태도</li>
<li><strong>공감적 이해</strong> : 내담자의 감정과 경험을 마치 자신의 것처럼 이해하고자 하는 태도</li>
</ol>`,
  },
  {
    num: 66, category: 'counseling',
    title: '형태주의 상담의 목표 6가지를 쓰시오.',
    frequency: '22-2',
    keyword: '게슈탈트 상담 목표',
    answer: `<ol>
<li>자기 인식을 증가시키도록 한다.</li>
<li>자신의 경험에 대한 주체가 자신이라는 태도가 형성되도록 한다.</li>
<li>타인의 권리를 침해하지 않으면서 자신의 욕구를 충족시킬 수 있는 기술을 개발하고 가치관을 형성시킨다.</li>
<li>모든 감각이 더 잘 인식되도록 한다.</li>
<li>행동의 결과가 수용되며, 행동을 결정할 책임이 자신에게 있음을 인정하게 된다.</li>
<li>외적 지지에서 내적 지지로 바꾸도록 돕는다.</li>
<li>타인에게 요구하거나 도움을 청할 수 있게 되며, 동시에 타인에게 도움을 줄 수 있도록 한다.</li>
</ol>`,
  },
  {
    num: 68, category: 'counseling',
    title: '실존주의 상담자들이 중요하게 생각하는 주제 4가지를 쓰고 설명하시오.',
    frequency: '23-2, 23-1, 20-2',
    keyword: '실존주의 궁극적 관심사',
    answer: `<ol>
<li><strong>삶의 의미성</strong> : 인간은 삶을 통해 존재 의미를 발견해야 한다.</li>
<li><strong>죽음과 비존재</strong> : 삶과 죽음은 분리될 수 없으며, 인간은 비존재에 대한 불안감을 가진다.</li>
<li><strong>진실성</strong> : 개인의 실존 회복을 위해 진실성 있는 노력이 필요하다.</li>
<li><strong>자유와 책임</strong> : 인간은 자유로운 존재이며, 스스로 선택할 능력과 책임이 있다.</li>
</ol>`,
  },
  {
    num: 69, category: 'counseling',
    title: '홀랜드의 육각형 모델에서 일관성, 변별성, 정체성에 대해 설명하시오.',
    frequency: '23-2',
    keyword: '홀랜드 육각형 모델 해석차원',
    answer: `<ol>
<li><strong>일관성</strong> : 육각형 모델에서 어떤 쌍들은 다른 쌍에 비해 더 많은 공통점을 갖고 있다.</li>
<li><strong>변별성</strong> : 특정 성격 유형은 다른 어떤 유형과는 유사하고 어떤 유형과는 차별화 된다.</li>
<li><strong>정체성</strong> : 개인에게 정체성은 목표, 흥미, 재능 등이고, 환경에서 정체성은 투명성, 안정성, 일, 목표 등이다.</li>
</ol>`,
  },
  {
    num: 70, category: 'counseling',
    title: '고트프레드슨의 직업과 관련된 개인발달의 4단계를 쓰시오.',
    frequency: '23-2',
    keyword: '고트프레드슨(Gottfredson) 직업포부 발달단계',
    answer: `<ol>
<li><strong>힘과 크기 지향성</strong> : 사고과정이 구체화되며 어른이 된다는 것의 의미를 알게 된다.</li>
<li><strong>성역할 지향성</strong> : 자아개념이 성의 발달에 의해 영향을 받는다.</li>
<li><strong>사회적 가치 지향성</strong> : 사회계층에 대한 개념이 생기면서 '상황 속 자아'를 인식한다.</li>
<li><strong>내적, 고유한 자아 지향성</strong> : 자아성찰과 사회계층의 맥락에서 직업적 포부가 발달한다.</li>
</ol>`,
  },
  {
    num: 73, category: 'counseling',
    title: '진로상담 과정에서 관계수립을 위한 기본 상담기술 6가지를 쓰시오.',
    frequency: '23-1, 20-1',
    keyword: '기본 상담기술',
    answer: `<ol><li>공감</li><li>적극적 경청</li><li>명료화</li><li>반영</li><li>수용</li><li>요약과 재진술</li><li>감정이입</li><li>환언</li><li>직면</li></ol>`,
  },
  {
    num: 74, category: 'counseling',
    title: '행동주의 직업상담의 불안감소기법과 학습촉진기법을 각각 쓰고 설명하시오.',
    frequency: '23-1, 22-1',
    keyword: '불안감소기법 / 학습촉진기법',
    answer: `<h4>불안감소기법</h4>
<ol>
<li><strong>체계적 둔감법</strong> : 불안 위계 목록에 따라 점진적으로 불안을 경험하게 하여 둔감화시키는 방법</li>
<li><strong>홍수법</strong> : 두려워하는 자극에 장시간 지속적으로 노출시켜 두려움을 제거하는 방법</li>
<li><strong>역조건 형성</strong> : 공포를 느꼈던 장면에 바람직한 반응을 연합시켜 부적절한 반응을 소거하는 방법</li>
<li><strong>혐오치료</strong> : 문제행동에 혐오자극을 제시하여 부적절한 행동을 감소시키는 방법</li>
</ol>
<h4>학습촉진기법</h4>
<ol>
<li><strong>강화</strong> : 내담자의 바람직한 직업결정에 긍정적·부정적 반응을 보여 촉진하는 방법</li>
<li><strong>대리학습(모델링)</strong> : 다른 사람의 진로결정 행동 및 결과를 관찰하여 학습을 촉진하는 방법</li>
<li><strong>변별학습</strong> : 상이한 자극을 구별하게 하여 직업결정 능력을 비교해 보도록 하는 방법</li>
</ol>`,
  },
  {
    num: 75, category: 'counseling',
    title: '행동주의 상담의 적응 행동 증진기법 3가지를 설명하시오.',
    frequency: '21-2',
    keyword: '적응 행동 증진기법',
    answer: `<ol>
<li><strong>강화</strong> : 내담자의 행동에 적절하게 긍정·부정적 반응을 보여 바람직한 행동을 강화</li>
<li><strong>변별학습</strong> : 검사도구를 사용해 직업결정 능력 등을 변별하고 비교해보도록 하는 것</li>
<li><strong>사회적 모델링과 대리학습</strong> : 타인의 행동 관찰과 모방을 통해 학습을 촉진</li>
<li><strong>행동조성</strong> : 행동을 단계별로 세분화해 단계마다 강화를 제공하여 학습 촉진</li>
<li><strong>상표제도(토큰경제)</strong> : 바람직한 행동이 이뤄질 때마다 그에 상응하는 보상을 하는 것</li>
</ol>`,
  },
  {
    num: 76, category: 'counseling',
    title: '윌리엄슨의 직업상담 문제유형 4가지를 쓰고 설명하시오.',
    frequency: '22-2, 21-3, 20-4',
    keyword: '윌리엄슨 직업상담 문제유형',
    answer: `<ol>
<li><strong>진로 무선택</strong> : 직업을 선택해 본 적이 없거나, 어떤 것을 선택할지 모르는 유형</li>
<li><strong>불확실한 선택</strong> : 진로를 선택하였으나 이에 대한 확신이 없는 유형</li>
<li><strong>어리석은 선택</strong> : 자신의 특성을 고려하지 않고 특정 직업의 특권이나 갈망으로 직업을 선택한 유형</li>
<li><strong>흥미와 적성의 불일치</strong> : 자신의 흥미나 적성에 모순되는 직업을 선택한 유형</li>
</ol>`,
  },
  {
    num: 77, category: 'counseling',
    title: '집단상담의 형태를 3가지 쓰고 각각 설명하시오.',
    frequency: '19-2',
    keyword: '집단상담 형태',
    answer: `<ol>
<li><strong>성장 집단</strong> : 내담자의 내적, 외적 성장을 위한 집단</li>
<li><strong>교육 집단</strong> : 내담자의 교육을 목표로 하는 집단</li>
<li><strong>상담 집단</strong> : 구성원의 문제 해결, 자아 발견 등을 목표로 하는 집단</li>
</ol>`,
  },
  {
    num: 78, category: 'counseling',
    title: '톨버트가 제시한 집단상담 과정에서 나타나는 활동 유형을 제시하시오.',
    frequency: '19-1',
    keyword: '톨버트 집단상담 활동유형',
    answer: `<ol><li>자기탐색</li><li>상호작용</li><li>개인적 정보의 검토 및 목표와의 연결</li><li>직업적·교육적 정보의 획득과 검토</li><li>의사결정</li></ol>`,
  },
  {
    num: 79, category: 'counseling',
    title: '집단상담의 장점 6가지를 쓰시오.',
    frequency: '23-1, 20-4, 19-1',
    keyword: '집단상담 장점',
    answer: `<ol>
<li>시간과 비용이 경제적이다.</li>
<li>내담자가 사회성을 기를 수 있다.</li>
<li>직업 성숙도가 낮은 내담자에게 적합하다.</li>
<li>타인을 보고 관찰하여 학습하는 효과가 있다.</li>
<li>개인에 대한 집중도가 낮아 내담자의 부담감을 감소시킬 수 있다.</li>
<li>구체적인 경험 및 현실 검증의 기회가 제공된다.</li>
</ol>`,
  },
  {
    num: 80, category: 'counseling',
    title: '집단상담의 단점 3가지를 쓰시오.',
    frequency: '20-4',
    keyword: '집단상담 단점',
    answer: `<ol>
<li>다수 내담자로 인해 비밀 보장이 어렵다.</li>
<li>상담을 위한 집단을 구성하기 어렵다.</li>
<li>모든 구성원이 만족하는 상담을 하기 어렵다.</li>
</ol>`,
  },
  {
    num: 81, category: 'counseling',
    title: '로저스의 인간중심 상담의 철학적 가정 4가지를 쓰시오.',
    frequency: '23-1',
    keyword: '로저스 인간중심 상담 철학적 가정',
    answer: `<ol>
<li>인간은 가치를 지닌 유일한 존재이다.</li>
<li>인간은 성장력을 가지고 있다.</li>
<li>인간은 선한 존재이다.</li>
<li>인간은 자유로운 존재이다.</li>
<li>인간은 자신의 진로를 선택할 권리가 있다.</li>
</ol>`,
  },
  {
    num: 87, category: 'counseling',
    title: '홀랜드 직업흥미검사의 6가지 유형을 쓰시오.',
    frequency: '23-1, 22-1, 20-3, 20-1, 19-2',
    keyword: '홀랜드(Holland) 흥미유형 RIASEC',
    answer: `<ol><li>현실형</li><li>탐구형</li><li>예술형</li><li>사회형</li><li>진취형(기업형)</li><li>관습형</li></ol>`,
  },
  {
    num: 88, category: 'counseling',
    title: '인지적 명확성이 부족한 내담자의 유형 5가지를 쓰시오.',
    frequency: '21-1',
    keyword: '인지적 명확성 부족 유형',
    answer: `<ol><li>단순 오정보</li><li>복잡한 오정보</li><li>구체성의 결여</li><li>강박적 사고</li><li>양면적 사고</li></ol>`,
  },
  {
    num: 89, category: 'counseling',
    title: '내담자와의 상담목표 설정 시 유의사항 5가지를 쓰시오.',
    frequency: '22-2, 20-3',
    keyword: '상담목표 설정 유의사항',
    answer: `<ol>
<li>내담자가 바라고 원하는 것을 목표로 하여야 한다.</li>
<li>상담 목표는 상담자의 기술과 양립 가능한 것이어야 한다.</li>
<li>상담 목표는 구체적인 것이어야 한다.</li>
<li>상담 목표는 실현 가능한 것이어야 한다.</li>
<li>상담 목표는 기한이 있어야 한다.</li>
</ol>`,
  },
  {
    num: 90, category: 'counseling',
    title: '내담자와의 초기면담 수행 시 상담자가 유의해야 할 사항 4가지를 쓰시오.',
    frequency: '20-3',
    keyword: '초기면담 유의사항',
    answer: `<ol><li>내담자와 만나기</li><li>상담 전 사례자료 검토하기</li><li>상담의 초기 목표 명확히 제시하기</li><li>비밀 유지에 대해 설명하기</li></ol>`,
  },
  {
    num: 91, category: 'counseling',
    title: '내담자의 행동을 이해하고 해석하는 데 기본이 되는 상담 기법을 6가지 쓰시오.',
    frequency: '21-2',
    keyword: '상담 기법 (행동이해/해석)',
    answer: `<ol>
<li>가정 사용하기</li><li>의미있는 질문하기</li><li>전이된 오류 정정하기</li><li>분류 및 재구성하기</li>
<li>저항감 재인식하기</li><li>근거없는 믿음 확인하기</li><li>왜곡된 사고 확인하기</li><li>반성의 장 마련하기</li><li>변명에 초점 맞추기</li>
</ol>`,
  },
  {
    num: 95, category: 'counseling',
    title: '벡의 인지치료에서 인지적 오류의 유형을 쓰시오.',
    frequency: '22-2, 19-3',
    keyword: '벡(Beck) 인지적 오류',
    answer: `<ol>
<li><strong>흑백논리</strong> : 중간이 없이 이분법적으로 사고할 때 생기는 오류</li>
<li><strong>선택적 추상화</strong> : 부정적인 일부를 근거로 결론을 내려 전체에 적용하는 오류</li>
<li><strong>과잉 일반화</strong> : 특정 사건의 결과를 관계 없는 상황에 적용할 때 생기는 오류</li>
<li><strong>개인화</strong> : 외부 사건을 자신과 관련짓는 오류</li>
<li><strong>의미의 확대 및 축소</strong> : 사건의 의미를 지나치게 크게 혹은 작게 왜곡하는 오류</li>
<li><strong>임의적 추론</strong> : 근거 없이 자의적으로 결론을 내리는 오류</li>
</ol>`,
  },
  {
    num: 97, category: 'counseling',
    title: '벡의 인지행동적 상담에서 부정적 사고를 반박하는 방법 3가지를 설명하시오.',
    frequency: '19-3',
    keyword: '벡(Beck) 인지행동 상담기법',
    answer: `<ol>
<li><strong>언어적 기법</strong> : 비합리적 신념을 논박하여 내담자의 언어를 변화시키는 방법</li>
<li><strong>정서적 기법</strong> : 내담자가 합리적 정서를 상상하도록 하는 방법</li>
<li><strong>행동적 기법</strong> : 내담자에게 목표 행동을 부여하고 실행하도록 하여 신념체계를 변화시키는 방법</li>
</ol>`,
  },
  {
    num: 102, category: 'counseling',
    title: '인지 정서 상담기법의 기본 가정, 기본개념, 상담의 목표를 쓰시오.',
    frequency: '20-4',
    keyword: '인지정서 상담(REBT) 기본가정/개념/목표',
    answer: `<ol>
<li><strong>기본가정</strong> : 인간은 합리적일 수도, 비합리적일 수도 있는 존재이며, 내담자의 문제는 비합리적 사고로 인해 생긴다.</li>
<li><strong>기본개념</strong> : 내담자의 문제를 해결하기 위해 상담자의 논박이 필요하며, ABCDEF 모델을 제시한다.</li>
<li><strong>상담의 목표</strong> : 내담자의 비합리적 신념을 합리적 신념으로 변화시켜 문제를 해결한다.</li>
</ol>`,
  },
  {
    num: 103, category: 'counseling',
    title: 'ABCDEF 모형의 의미를 쓰시오.',
    frequency: '22-2, 21-3, 21-2, 20-3, 20-2',
    keyword: 'REBT ABCDEF 모형',
    answer: `<ol>
<li><strong>A (선행사건)</strong> : 내담자의 감정이나 행동에 영향을 미치는 사건</li>
<li><strong>B (비합리적 신념)</strong> : 선행사건에 대한 비합리적 신념체계</li>
<li><strong>C (결과)</strong> : 비합리적 신념으로 인한 부적응적인 정서·행동적 결과</li>
<li><strong>D (논박)</strong> : 비합리적 신념을 논리적으로 반박하는 것</li>
<li><strong>E (효과)</strong> : 논박으로 인해 비합리적 신념이 합리적 신념으로 전환</li>
<li><strong>F (새로운 감정)</strong> : 합리적 신념에서 비롯된 긍정적이고 수용적인 감정</li>
</ol>`,
  },
  {
    num: 104, category: 'counseling',
    title: 'ABCDEF 기법을 사례에 적용하여 설명하시오. (정리해고 사례)',
    frequency: '21-1',
    keyword: 'REBT ABCDEF 사례 적용',
    answer: `<ol>
<li><strong>A (선행사건)</strong> : 회사에서 정리해고를 당하는 사건이 발생하였다.</li>
<li><strong>B (비합리적 신념)</strong> : 해고가 자신이 무가치한 존재인 것을 의미한다는 비합리적 신념을 갖게 되었다.</li>
<li><strong>C (결과)</strong> : 비합리적 신념의 결과로 우울증과 자살 시도 등의 행동이 발생하였다.</li>
<li><strong>D (논박)</strong> : 상담을 통해 정리해고가 무가치함을 의미하는 것이 아님을 논박한다.</li>
<li><strong>E (효과)</strong> : 논박의 효과로 우울감을 극복하고 자신을 재평가한다.</li>
<li><strong>F (새로운 감정)</strong> : 자신에 대해 긍정적으로 평가하기 시작하고 다시 구직활동을 한다.</li>
</ol>`,
  },

  /* ===================================================================
     직업심리학 (psychology)
     =================================================================== */
  {
    num: 8, category: 'psychology',
    title: '규준 제작 시 사용되는 확률표집방법 3가지를 쓰고 설명하시오.',
    frequency: '22-3, 20-2',
    keyword: '확률표집방법',
    answer: `<ol>
<li><strong>단순 무선 표집</strong> : 구성원들에게 번호를 부여하고 무작위로 번호를 뽑아 표집. 모집단의 구성원이 표본에 속할 확률이 동일</li>
<li><strong>층화표집</strong> : 모집단이 서로 이질적인 하위 집단으로 구성된 경우 각 하위 집단에서 표집하여 추출</li>
<li><strong>군집표집</strong> : 모집단이 서로 동질적인 하위 집단으로 구성된 경우에 한 집단 자체를 표본으로 추출</li>
</ol>`,
  },
  {
    num: 9, category: 'psychology',
    title: '측정오차를 줄이기 위한 구체적인 방법 6가지를 쓰시오.',
    frequency: '22-3, 19-2',
    keyword: '측정오차 감소 방법',
    answer: `<ol><li>검사 문항의 수를 늘린다.</li><li>신뢰도에 나쁜 영향을 주는 문항을 제거한다.</li><li>표준화된 검사를 사용한다.</li><li>균일한 검사 조건을 유지한다.</li><li>검사 실시와 채점 방식을 표준화한다.</li><li>적절한 표본을 추출하여 측정한다.</li></ol>`,
  },
  {
    num: 10, category: 'psychology',
    title: '준거 타당도 계수의 크기에 영향을 미치는 요인을 쓰고 설명하시오.',
    frequency: '22-3, 22-2, 18-3',
    keyword: '준거타당도 계수 영향요인',
    answer: `<ol>
<li><strong>표집오차</strong> : 표집집단이 전체 모집단을 대표하지 못하게 되어 발생하는 오차</li>
<li><strong>준거측정치의 신뢰도</strong> : 준거측정치의 신뢰도가 낮으면 검사의 타당도도 낮아짐</li>
<li><strong>준거측정치의 타당도</strong> : 준거를 측정하는 도구가 해당 준거를 잘 반영하는지</li>
<li><strong>범위 제한</strong> : 자료가 전체 범위를 포괄하지 않고 일부만 포괄하는 경우 상관계수가 실제보다 작아짐</li>
</ol>`,
  },
  {
    num: 11, category: 'psychology',
    title: '자기 보고형 검사(설문지 형태 검사)의 장점 5가지를 쓰시오.',
    frequency: '22-3, 19-2',
    keyword: '자기보고형 검사 장점',
    answer: `<ol><li>검사 실시 시간이 짧다.</li><li>검사 비용이 경제적이다.</li><li>검사 결과에 대한 해석이 용이하다.</li><li>신뢰도와 타당도가 높은 편이다.</li><li>검사 환경의 영향을 적게 받는다.</li></ol>`,
  },
  {
    num: 12, category: 'psychology',
    title: '자기 보고형 검사(설문지 형태의 검사)가 가지는 단점 3가지를 쓰시오.',
    frequency: '19-3',
    keyword: '자기보고형 검사 단점',
    answer: `<ol>
<li>내담자가 문항의 의도를 파악하여 방어를 할 수 있다.</li>
<li>내담자의 반응이 제한적이어서 다양한 반응 관찰이 어렵고 무의식까지 관찰할 수 없다.</li>
<li>내담자의 반응 경향성에 따라 답변이 오염될 수 있다.</li>
</ol>`,
  },
  {
    num: 13, category: 'psychology',
    title: '투사적 검사와 비교하여 객관적 검사의 장점 3가지를 쓰시오.',
    frequency: '21-2',
    keyword: '객관적 검사 장점',
    answer: `<ol><li>검사의 실시가 간편하다.</li><li>시간과 노력이 절감된다.</li><li>검사의 신뢰도와 타당도가 검증되어 있다.</li><li>검사의 객관성이 보장된다.</li><li>부적합한 응답을 최소화할 수 있다.</li><li>비용적 측면에서 경제적이다.</li></ol>`,
  },
  {
    num: 14, category: 'psychology',
    title: '투사적 검사의 장점과 단점을 각 3가지씩 쓰시오.',
    frequency: '20-3',
    keyword: '투사적 검사 장단점',
    answer: `<h4>장점</h4><ol><li>수검자의 방어를 무력화할 수 있다.</li><li>수검자의 무의식을 이끌어 낼 수 있다.</li><li>수검자의 다양한 반응을 관찰할 수 있다.</li></ol>
<h4>단점</h4><ol><li>검사 결과 해석을 위해 고도로 훈련된 전문가가 필요하다.</li><li>검사 시행에 비용과 시간이 많이 든다.</li><li>신뢰도와 타당도가 낮다.</li></ol>`,
  },
  {
    num: 15, category: 'psychology',
    title: '진로 성숙도 검사(CMI)의 태도 척도와 능력 척도를 각각 쓰시오.',
    frequency: '22-3',
    keyword: 'CMI 태도/능력 척도',
    answer: `<h4>태도척도</h4><ol><li>진로 결정성</li><li>참여도</li><li>독립성</li><li>성향</li><li>타협성</li></ol>
<h4>능력척도</h4><ol><li>자기평가</li><li>직업정보</li><li>목표선정</li><li>계획</li><li>문제해결</li></ol>`,
  },
  {
    num: 16, category: 'psychology',
    title: 'CMI검사에서 능력척도 3가지를 쓰고 설명하시오.',
    frequency: '20-3',
    keyword: 'CMI 능력척도 상세',
    answer: `<ol>
<li><strong>자기평가</strong> : 자신의 능력과 성격, 흥미를 이해하는 능력</li>
<li><strong>직업정보</strong> : 관심 직업에 대해 얼마나 정보를 가지고 있고, 수집할 수 있는지에 대한 능력</li>
<li><strong>목표선정</strong> : 자신이 갖고 있는 정보와 직업세계를 연결하여 직업 목표를 선정하는 능력</li>
</ol>`,
  },
  {
    num: 43, category: 'psychology',
    title: '틴슬레이와 브래들리가 제시한 검사 해석의 4단계를 설명하시오.',
    frequency: '23-2, 20-4',
    keyword: '검사 해석 4단계',
    answer: `<ol>
<li><strong>해석 준비하기</strong> : 검사 결과와 내담자의 정보를 어떻게 연관지어 해석할 수 있는지 검토</li>
<li><strong>내담자 준비시키기</strong> : 내담자가 검사 결과를 수용할 수 있도록 준비</li>
<li><strong>결과 전달하기</strong> : 내담자가 이해할 수 있도록 검사 결과를 전달</li>
<li><strong>추후활동</strong> : 내담자가 검사 결과를 잘 이해했는지 확인하고 의견 교환</li>
</ol>`,
  },
  {
    num: 44, category: 'psychology',
    title: '틴슬레이와 브래들리가 제시한 검사 결과 검토의 2단계를 쓰고 설명하시오.',
    frequency: '22-3',
    keyword: '검사 결과 검토 2단계',
    answer: `<ol>
<li><strong>이해 단계</strong> : 규준을 참조하여 검사점수의 의미를 충분히 이해하는 단계</li>
<li><strong>통합 단계</strong> : 이해를 통해 얻은 정보와 상담자가 수집한 다른 정보들을 통합하는 단계</li>
</ol>`,
  },
  {
    num: 46, category: 'psychology',
    title: '수퍼의 직업발달(진로발달) 5단계를 쓰고 설명하시오.',
    frequency: '23-2, 20-4',
    keyword: '수퍼(Super) 발달단계',
    answer: `<ol>
<li><strong>성장기</strong> : 가정과 학교에서 자아개념을 발달시키는 시기</li>
<li><strong>탐색기</strong> : 여러 가지 활동을 통해 자아를 검증하고 자신에게 맞는 직업을 탐색하는 시기</li>
<li><strong>확립기</strong> : 자신에게 적합한 직업을 선택하여 기반을 다지는 시기</li>
<li><strong>유지기</strong> : 자신의 직업에 안착하여 안정된 생활을 유지하는 시기</li>
<li><strong>쇠퇴기</strong> : 은퇴를 준비하며 새로운 직업이나 활동을 모색하는 시기</li>
</ol>`,
  },
  {
    num: 47, category: 'psychology',
    title: '수퍼의 경력개발 단계 중 성장기의 3단계를 쓰고 설명하시오.',
    frequency: '19-2',
    keyword: '수퍼(Super) 성장기 하위단계',
    answer: `<ol>
<li><strong>환상기</strong> : 아동적 욕구가 지배적이며, 직업에 대해 환상을 갖고 있는 단계</li>
<li><strong>흥미기</strong> : 흥미에 따라 직업을 선택하는 단계</li>
<li><strong>능력기</strong> : 직업을 선택할 때 조건을 고려하며, 능력을 중요하게 생각하는 단계</li>
</ol>`,
  },
  {
    num: 48, category: 'psychology',
    title: '수퍼의 발달적 직업상담에서 평가 3가지를 설명하시오.',
    frequency: '20-4, 22-3',
    keyword: '수퍼(Super) 평가 유형',
    answer: `<ol>
<li><strong>문제의 평가</strong> : 내담자가 겪고 있는 어려움이나 상담에 대한 기대를 평가</li>
<li><strong>개인의 평가</strong> : 심리검사나 사례 연구 등을 통해 내담자 개인의 상태에 대해 분석하고 평가</li>
<li><strong>예언 평가</strong> : 내담자가 직업적으로 성공하고 만족할 수 있는지 예언</li>
</ol>`,
  },
  {
    num: 50, category: 'psychology',
    title: '집단 내 규준 3가지를 쓰고 설명하시오.',
    frequency: '23-2, 23-1, 21-2, 20-1, 19-1',
    keyword: '집단 내 규준',
    answer: `<ol>
<li><strong>백분위 점수</strong> : 개인이 집단에서 차지하는 상대적 위치. 100개의 동일한 구간으로 나누어 측정</li>
<li><strong>표준 점수</strong> : 평균으로부터 떨어진 거리를 표준편차 단위로 측정</li>
<li><strong>표준 등급</strong> : 9개의 구간으로 나누어 어디에 속하는지 측정(스테나인)</li>
</ol>`,
  },
  {
    num: 51, category: 'psychology',
    title: '규준 참조 검사와 준거 참조 검사를 각각 예를 들어 설명하시오.',
    frequency: '21-3, 21-1, 19-2',
    keyword: '규준참조검사 / 준거참조검사',
    answer: `<ol>
<li><strong>규준참조검사</strong> : 개인의 점수를 다른 사람의 점수와 비교하여 평가하는 상대평가. 예) 각종 심리검사</li>
<li><strong>준거참조검사</strong> : 개인의 점수를 기준 점수와 비교하여 평가하는 절대평가. 예) 국가 자격시험</li>
</ol>`,
  },
  {
    num: 52, category: 'psychology',
    title: '직업심리검사의 신뢰도를 추정하는 방법 3가지를 쓰고 설명하시오.',
    frequency: '23-2, 21-3, 20-2',
    keyword: '신뢰도 추정 방법',
    answer: `<ol>
<li><strong>검사-재검사 신뢰도</strong> : 동일한 사람에게 동일한 검사를 시간 간격을 두고 두 번 실시하여 상관관계로 추정</li>
<li><strong>동형 검사 신뢰도</strong> : 신뢰도가 검증된 검사와 유사한 검사를 함께 실시하여 두 검사 점수 간 상관관계로 추정</li>
<li><strong>반분 신뢰도</strong> : 한 개의 검사를 두 부분으로 나누어 각 부분 간의 결과를 비교하여 추정</li>
</ol>`,
  },
  {
    num: 53, category: 'psychology',
    title: '반분 신뢰도를 추정하기 위해 사용하는 방법 3가지를 쓰고 설명하시오.',
    frequency: '19-3',
    keyword: '반분 신뢰도 추정 방법',
    answer: `<ol>
<li><strong>전후 반분법</strong> : 검사 문항을 전반부와 후반부로 나누는 방법</li>
<li><strong>기우 반분법</strong> : 검사 문항을 짝수와 홀수로 나누는 방법</li>
<li><strong>짝진 임의 배치법</strong> : 유사한 두 문항씩 짝을 지은 후, 각 짝에서 한 문항을 임의로 선택하여 양분하는 방법</li>
</ol>`,
  },
  {
    num: 54, category: 'psychology',
    title: '극대수행검사와 습관적 수행 검사를 설명하고 대표적 유형을 각각 쓰시오.',
    frequency: '20-4',
    keyword: '극대수행검사 / 습관적 수행검사',
    answer: `<ol>
<li><strong>극대수행검사</strong> : 난이도가 낮은 다수의 문제를 제한 시간 내에 풀도록 하는 검사. 예) 지능검사, 적성검사, 성취도검사</li>
<li><strong>습관적 수행검사</strong> : 일상생활에서 이루어지는 습관적 행동에 대해 최대한 정직하게 응답할 것을 요구하는 검사. 예) 성격검사, 흥미검사, 태도검사</li>
</ol>`,
  },
  {
    num: 55, category: 'psychology',
    title: '측정의 기본 단위인 척도의 4가지 유형을 쓰고 설명하시오.',
    frequency: '20-2',
    keyword: '척도의 4가지 유형',
    answer: `<ol>
<li><strong>명명척도</strong> : 측정 대상 간 숫자의 차이만 있는 척도</li>
<li><strong>서열척도</strong> : 측정 대상 간에 숫자의 차이와 순위관계 정보가 있는 척도</li>
<li><strong>등간척도</strong> : 측정 대상 간 숫자의 차이와 순위 정보 그리고 간격이 포함된 척도</li>
<li><strong>비율척도</strong> : 측정 대상 간 숫자의 차이, 순위, 간격, 비율을 모두 포함하는 척도</li>
</ol>`,
  },
  {
    num: 56, category: 'psychology',
    title: '심리검사에서 신뢰도의 종류와 신뢰도에 영향을 주는 요인을 각각 3가지씩 쓰시오.',
    frequency: '23-1, 21-2, 21-1',
    keyword: '신뢰도 종류 / 영향요인',
    answer: `<h4>신뢰도의 종류</h4><ol><li>검사-재검사 신뢰도</li><li>동형 검사 신뢰도</li><li>반분 신뢰도</li></ol>
<h4>신뢰도에 영향을 주는 요인</h4><ol><li>개인차</li><li>문항 수</li><li>문항 반응 수</li><li>검사유형</li><li>신뢰도 추정방법</li></ol>`,
  },
  {
    num: 57, category: 'psychology',
    title: '심리검사 사용의 윤리적 문제와 관련하여 주의할 사항 6가지를 쓰시오.',
    frequency: '22-2, 19-3',
    keyword: '심리검사 윤리적 주의사항',
    answer: `<ol>
<li>심리검사가 시대에 뒤떨어질 수 있음을 인정한다.</li>
<li>피검사자가 이해하기 쉬운 용어를 사용한다.</li>
<li>피검사자의 비밀을 보장한다.</li>
<li>검사의 결과는 목적에 맞게 제한적으로 사용한다.</li>
<li>타당도와 신뢰도가 높은 검사를 활용한다.</li>
<li>적절한 훈련을 받은 사람이 검사를 실시한다.</li>
</ol>`,
  },
  {
    num: 58, category: 'psychology',
    title: '검사-재검사 신뢰도에 영향을 미치는 요인 4가지를 쓰시오.',
    frequency: '23-1, 20-3',
    keyword: '검사-재검사 신뢰도 영향요인',
    answer: `<ol><li>검사와 재검사 사이의 시간 간격</li><li>검사가 시행되는 환경의 변화</li><li>응답자의 속성 변화</li><li>응답자가 검사를 치른 경험</li></ol>`,
  },
  {
    num: 59, category: 'psychology',
    title: '구성타당도의 유형에 속하는 타당도 2가지를 쓰고 설명하시오.',
    frequency: '23-2, 20-4, 20-3, 19-3',
    keyword: '구성타당도 유형',
    answer: `<ol>
<li><strong>수렴 타당도</strong> : 검사 결과가 그 속성과 관계 있는 변인들과 얼마나 높은 상관관계를 갖는지를 나타내는 타당도</li>
<li><strong>변별 타당도</strong> : 검사 결과가 그 속성과 관계 없는 변인들과 얼마나 낮은 상관관계를 갖는지를 나타내는 타당도</li>
<li><strong>요인분석법</strong> : 검사 문항 간의 상관관계를 분석하여 상관성이 높은 문항끼리 묶어주는 방법</li>
</ol>`,
  },
  {
    num: 83, category: 'psychology',
    title: '예언 타당도와 동시(공인) 타당도를 예를 포함하여 설명하시오.',
    frequency: '23-1',
    keyword: '예언타당도 / 동시타당도',
    answer: `<ol>
<li><strong>예언타당도</strong> : 검사 점수가 미래 행위를 얼마나 잘 예측하는가의 타당도. 예) 적성검사에서 점수가 높았던 사람이 입사 후 우수한 업무 실적을 냈다면 예언타당도가 높다.</li>
<li><strong>동시(공인)타당도</strong> : 이미 타당도가 검증된 검사와 유사한 검사를 실시하고 두 검사 점수를 비교하여 측정하는 타당도. 예) 토익 점수가 높은 사람이 새로 개발한 영어 시험 점수가 높다면 동시타당도가 높다.</li>
</ol>`,
  },
  {
    num: 84, category: 'psychology',
    title: '직업상담을 위한 심리검사 선정 시 고려사항 3가지를 쓰시오.',
    frequency: '23-1, 20-1',
    keyword: '심리검사 선정 고려사항',
    answer: `<ol>
<li>신뢰도와 타당도가 검증된 검사를 선정한다.</li>
<li>검사를 하는 목적에 부합하는 검사를 선정해야 한다.</li>
<li>검사의 간편성, 경제성 등을 고려해야 한다.</li>
<li>검사 선택 시 내담자도 포함하여야 한다.</li>
<li>내담자의 문제점을 파악한 후 검사를 선정해야 한다.</li>
</ol>`,
  },
  {
    num: 85, category: 'psychology',
    title: '심리검사 제작을 위한 예비문항 제작 시 고려사항 5가지를 쓰시오.',
    frequency: '21-2',
    keyword: '예비문항 제작 고려사항',
    answer: `<ol>
<li><strong>문항의 적절성</strong> : 성별, 종교, 인종, 문화 등 특정집단에 유리하도록 제작해서는 안 된다.</li>
<li><strong>문항의 난이도</strong> : 수검자의 수준에 따라 난이도를 적절하게 구성한다.</li>
<li><strong>문항의 구조화</strong> : 문항 내용은 구체적이고 명확해야 한다.</li>
<li><strong>문항의 동기유발</strong> : 문항은 수검자로 하여금 학습동기를 유발할 수 있어야 한다.</li>
<li><strong>문항의 참신성</strong> : 기존검사에 중복되지 않는 새로운 문항을 제시한다.</li>
<li><strong>문항의 중립성</strong> : 특정집단에 불쾌감을 주는 문항이 포함되지 않도록 주의한다.</li>
</ol>`,
  },
  {
    num: 98, category: 'psychology',
    title: '부정적인 심리검사 결과를 내담자에게 통보하는 방법 4가지를 쓰시오.',
    frequency: '22-2, 20-1',
    keyword: '부정적 검사결과 통보 방법',
    answer: `<ol>
<li>내담자가 충격을 받지 않도록 주의하여 설명한다.</li>
<li>전문적 용어나 통계적 숫자보다는 일상적인 용어를 사용하여 설명한다.</li>
<li>적절한 해석과 함께 검사 결과를 설명한다.</li>
<li>검사결과가 유출되지 않도록 비밀보장에 유의한다.</li>
</ol>`,
  },
  {
    num: 99, category: 'psychology',
    title: '심리검사의 사용목적 3가지를 쓰고 설명하시오.',
    frequency: '22-2, 20-1',
    keyword: '심리검사 사용목적',
    answer: `<ol>
<li><strong>개인적 기능</strong> : 내담자의 자기이해를 증진시키고 성공 가능성이 높은 진로를 선택할 수 있도록 돕는다.</li>
<li><strong>예측적 기능</strong> : 내담자의 성격이나 적성 등을 파악하여 수행능력을 예측한다.</li>
<li><strong>진단적 기능</strong> : 내담자의 문제 원인을 파악하고 해결한다.</li>
<li><strong>조사적 기능</strong> : 특정 집단의 성향을 조사하여 집단의 특징을 규명한다.</li>
</ol>`,
  },
  {
    num: 101, category: 'psychology',
    title: '표집 절차의 오류를 해결하기 위한 방법 3가지를 쓰고 설명하시오.',
    frequency: '22-2, 19-3',
    keyword: '정규분포 이탈 해결 방법',
    answer: `<ol>
<li><strong>완곡법</strong> : 검사결과가 정규분포와 비슷한 모양을 갖는 경우, 점수를 더하거나 빼서 정상분포 모양이 되도록 하는 방법</li>
<li><strong>절미법</strong> : 꼬리가 작은 경우 분포 곡선에서 한쪽으로 치우친 편포의 꼬리를 잘라내는 방법</li>
<li><strong>면적 환산법</strong> : 각 점수의 백분위를 찾아, 이에 해당하는 Z점수를 찾는 방법</li>
</ol>`,
  },

  /* ===================================================================
     직업정보론 (jobinfo)
     =================================================================== */
  {
    num: 17, category: 'jobinfo',
    title: '직무분석 방법 중 최초분석법의 종류를 쓰시오.',
    frequency: '22-3, 21-1',
    keyword: '최초분석법 종류',
    answer: `<ol><li>면접법</li><li>관찰법</li><li>체험법</li><li>설문지법</li><li>중요사건법(결정적 사건법)</li><li>녹화법</li><li>작업일지법</li></ol>`,
  },
  {
    num: 18, category: 'jobinfo',
    title: '최초 분석법에 해당하는 방법을 쓰고 각각 설명하시오.',
    frequency: '19-1',
    keyword: '최초분석법 상세',
    answer: `<ol>
<li><strong>체험법</strong> : 직무 분석자가 직접 직무를 체험하여 자료를 얻는 방법</li>
<li><strong>면접법</strong> : 직무 분석자가 직무 담당자와 면접을 진행하여 자료를 얻는 방법</li>
<li><strong>설문지법</strong> : 직무 담당자에게 설문지를 작성하도록 하여 자료를 얻는 방법</li>
<li><strong>관찰법</strong> : 직무 분석자가 현장에서 직무 담당자를 관찰하여 자료를 얻는 방법</li>
<li><strong>결정적 사건법</strong> : 직무에서 크게 성공하거나 실패한 경우와 관련된 자료를 수집하여 분석하는 방법</li>
<li><strong>녹화법</strong> : 작업 장면을 녹화하여 직무에 관한 자료를 얻는 방법</li>
<li><strong>작업일지법</strong> : 직무 담당자가 작성한 작업 일지를 바탕으로 자료를 얻는 방법</li>
</ol>`,
  },
  {
    num: 19, category: 'jobinfo',
    title: '한국 직업사전의 부가직업정보 중 작업강도 5단계를 쓰시오.',
    frequency: '20-1',
    keyword: '작업강도 5단계',
    answer: `<ol><li>아주 가벼운 작업</li><li>가벼운 작업</li><li>보통작업</li><li>힘든작업</li><li>아주 힘든 작업</li></ol>`,
  },
  {
    num: 20, category: 'jobinfo',
    title: '직무기능의 사물 세부사항을 쓰시오.',
    frequency: '20-3',
    keyword: '직무기능 - 사물',
    answer: `<ol><li>설치</li><li>정밀작업</li><li>제어조작</li><li>조작운전</li><li>수동조작</li><li>유지</li><li>투입-인출</li><li>단순작업</li></ol>`,
  },
  {
    num: 21, category: 'jobinfo',
    title: '부가직업정보 중 정규 교육, 숙련기간, 직무기능의 의미를 기술하시오.',
    frequency: '22-3',
    keyword: '정규교육 / 숙련기간 / 직무기능',
    answer: `<ol>
<li><strong>정규교육</strong> : 해당 직무를 수행하기 위해 필요한 정규교육 수준</li>
<li><strong>숙련기간</strong> : 해당 직무를 평균적인 수준으로 수행하기 위해 필요한 교육·훈련 등의 기간</li>
<li><strong>직무기능</strong> : 해당 직무를 수행하는 과정에서 자료, 사람, 사물과 맺는 관계의 특성</li>
</ol>`,
  },
  {
    num: 22, category: 'jobinfo',
    title: '직무기능 중 사람과 관련된 세부사항을 쓰시오.',
    frequency: '22-2',
    keyword: '직무기능 - 사람',
    answer: `<ol><li>자문</li><li>협의</li><li>교육</li><li>감독</li><li>오락제공</li><li>설득</li><li>말하기-신호</li><li>서비스 제공</li></ol>`,
  },
  {
    num: 23, category: 'jobinfo',
    title: '직무기능 중 자료와 관련된 세부사항을 쓰시오.',
    frequency: '22-2, 21-3',
    keyword: '직무기능 - 자료',
    answer: `<ol><li>종합</li><li>조정</li><li>분석</li><li>수집</li><li>계산</li><li>기록</li><li>비교</li></ol>`,
  },
  {
    num: 24, category: 'jobinfo',
    title: '부가직업 정보 중 육체활동의 구분을 쓰시오.',
    frequency: '23-2, 20-4',
    keyword: '육체활동 구분',
    answer: `<ol><li>균형감각</li><li>시각</li><li>청각</li><li>언어력</li><li>손사용</li><li>웅크림</li></ol>`,
  },
  {
    num: 25, category: 'jobinfo',
    title: '한국직업사전에 수록된 부가 직업정보 5가지를 쓰시오.',
    frequency: '21-1',
    keyword: '부가직업정보 종류',
    answer: `<ol><li>작업 강도</li><li>작업 환경</li><li>작업 장소</li><li>육체활동</li><li>정규 교육</li></ol>`,
  },
  {
    num: 26, category: 'jobinfo',
    title: '직무기능 중 자료에 대한 기능별 설명',
    frequency: '23-1',
    keyword: '직무기능 자료 상세',
    answer: `<table>
<tr><th>기능</th><th>설명</th></tr>
<tr><td><strong>조정</strong></td><td>데이터의 분석에 기초하여 시간, 장소, 작업순서, 활동 등을 결정. 결정을 실행하거나 상황을 보고한다.</td></tr>
<tr><td><strong>분석</strong></td><td>조사하고 평가한다. 평가와 관련된 대안적 행위의 제시가 빈번하게 포함된다.</td></tr>
<tr><td><strong>수집</strong></td><td>자료, 사람, 사물에 관한 정보를 수집, 대조, 분류한다.</td></tr>
<tr><td><strong>계산</strong></td><td>사칙연산을 실시하고 관련하여 규정된 활동을 수행하거나 보고한다. 수를 세는 것은 포함되지 않는다.</td></tr>
<tr><td><strong>기록</strong></td><td>데이터를 옮겨 적거나 입력하거나 표시한다.</td></tr>
<tr><td><strong>비교</strong></td><td>자료, 사람, 사물의 기능적, 구조적, 조합적 특성을 판단한다.</td></tr>
</table>`,
  },
  {
    num: 27, category: 'jobinfo',
    title: '한국직업사전의 작업강도 상세 기준 (빈칸채우기)',
    frequency: '22-2',
    keyword: '작업강도 상세 기준',
    answer: `<ol>
<li><strong>아주 가벼운 작업</strong> : 최고 <strong>4</strong>kg</li>
<li><strong>보통 작업</strong> : 최고 <strong>20</strong>kg, 빈번히 <strong>10</strong>kg</li>
<li><strong>힘든 작업</strong> : 최고 <strong>40</strong>kg, 빈번히 <strong>20</strong>kg</li>
</ol>`,
  },
  {
    num: 28, category: 'jobinfo',
    title: '한국 표준산업분류의 세 가지 분류기준을 쓰시오.',
    frequency: '19-1',
    keyword: 'KSIC 분류기준',
    answer: `<ol><li>산출물의 특성</li><li>투입물의 특성</li><li>생산활동의 일반적인 결합형태(생산공정)</li></ol>`,
  },
  {
    num: 29, category: 'jobinfo',
    title: '한국 표준직업분류에서 직업으로 보지 않는 활동을 쓰시오.',
    frequency: '22-2, 20-1, 19-3',
    keyword: '직업으로 보지 않는 활동',
    answer: `<ol><li>이자, 임대료 등의 수입</li><li>연금법, 고용보험법 등에 의한 수입</li><li>경마, 경륜, 복권 등에 의한 수입</li><li>예금이나 적금의 인출</li><li>가사활동</li><li>사회 수용 시설 내 경제활동</li><li>수형자의 강제노동</li></ol>`,
  },
  {
    num: 30, category: 'jobinfo',
    title: '한국표준직업분류의 포괄적 업무와 다수 직업 종사자의 분류 원칙을 쓰시오.',
    frequency: '22-3',
    keyword: 'KSCO 분류 원칙 종합',
    answer: `<h4>포괄적인 업무에 대한 직업분류 원칙</h4><ol><li>주된 직무 우선원칙</li><li>최상급 직능 수준 우선 원칙</li><li>생산업무 우선 원칙</li></ol>
<h4>다수 직업 종사자의 분류 원칙</h4><ol><li>취업시간 우선의 원칙</li><li>수입우선의 원칙</li><li>조사 시 최근의 직업 원칙</li></ol>`,
  },
  {
    num: 31, category: 'jobinfo',
    title: '다수 직업 종사자의 분류 원칙을 순서대로 쓰고 설명하시오.',
    frequency: '22-1, 21-3, 19-2',
    keyword: 'KSCO 다수직업 분류 원칙',
    answer: `<ol>
<li><strong>취업시간 우선의 원칙</strong> : 투자하는 취업 시간이 가장 긴 직업으로 분류</li>
<li><strong>수입우선의 원칙</strong> : 시간으로 분류하기 어려운 경우, 수입이 높은 직업으로 분류</li>
<li><strong>조사 시 최근의 직업 원칙</strong> : 시간과 수입으로 결정할 수 없는 경우 가장 최근 직업으로 분류</li>
</ol>`,
  },
  {
    num: 32, category: 'jobinfo',
    title: '포괄적 업무 분류 원칙 3가지를 설명하시오.',
    frequency: '23-1, 20-4, 20-3, 20-2',
    keyword: 'KSCO 포괄적 업무 분류 원칙',
    answer: `<ol>
<li><strong>주된 직무 우선 원칙</strong> : 여러 직무를 수행하는 경우 가장 주된 직업으로 분류</li>
<li><strong>최상급 직능 수준 우선 원칙</strong> : 가장 높은 직무능력을 필요로 하는 일로 분류</li>
<li><strong>생산업무 우선 원칙</strong> : 생산과 공급이 함께 이루어지는 경우 생산으로 분류</li>
</ol>`,
  },
  {
    num: 33, category: 'jobinfo',
    title: '한국표준산업분류에서 생산단위 활동형태 3가지를 설명하시오.',
    frequency: '22-3, 23-2, 21-2',
    keyword: 'KSIC 생산단위 활동형태',
    answer: `<ol>
<li><strong>주된 산업활동</strong> : 생산된 재화 또는 제공된 서비스 중에서 부가가치가 가장 큰 활동</li>
<li><strong>부차적 산업활동</strong> : 주된 산업활동 이외의 재화 생산 및 서비스 제공 활동</li>
<li><strong>보조활동</strong> : 회계, 창고, 운송 등과 같이 주된 산업활동과 부차적 산업활동을 지원하는 활동</li>
</ol>`,
  },
  {
    num: 34, category: 'jobinfo',
    title: '한국 표준산업분류의 산업, 산업활동, 산업활동의 범위, 산업분류의 정의를 쓰시오.',
    frequency: '22-2, 21-1, 20-2, 20-1',
    keyword: 'KSIC 기본 정의',
    answer: `<ol>
<li><strong>산업</strong> : 유사한 산업활동에 종사하는 생산단위의 집합</li>
<li><strong>산업활동</strong> : 각 생산단위가 노동, 자본, 자원 등을 투입하여 재화 또는 서비스를 생산·제공하는 일련의 활동과정</li>
<li><strong>산업활동의 범위</strong> : 영리, 비영리 활동은 포함하지만 가사활동은 포함되지 않는다.</li>
<li><strong>산업분류</strong> : 생산단위가 수행하는 생산활동을 그 유사성에 따라 체계적으로 분류한 것</li>
</ol>`,
  },
  {
    num: 35, category: 'jobinfo',
    title: '한국표준직업분류에서 직무 유사성의 판단기준 4가지를 쓰시오.',
    frequency: '21-2',
    keyword: 'KSCO 직무 유사성 판단기준',
    answer: `<ol><li>지식</li><li>경험</li><li>기능</li><li>직무수행자가 입직하기 위해 필요한 요건</li></ol>`,
  },
  {
    num: 36, category: 'jobinfo',
    title: '한국 표준산업분류에서 산업 결정방법과 산업분류의 적용원칙을 쓰시오.',
    frequency: '20-4',
    keyword: 'KSIC 산업 결정방법/적용원칙',
    answer: `<h4>산업 결정방법</h4>
<ol>
<li>생산단위가 수행하는 주된 산업으로 결정한다.</li>
<li>계절적으로 산업이 달라지는 경우, 조사기간 중 산출액이 가장 많은 산업으로 결정한다.</li>
<li>휴업·청산 중인 경우에는 영업 중 또는 청산을 시작하기 전 산업으로 결정, 설립 중인 경우에는 개시하는 산업으로 결정한다.</li>
</ol>
<h4>산업분류 적용원칙</h4>
<ol>
<li>산출물, 투입물, 생산공정을 모두 고려하여 분류한다.</li>
<li>대분류를 결정한 후 중, 소, 세, 세세 단위로 분류한다.</li>
<li>산업활동이 결합되어 있는 경우에는 생산단위의 주된 활동으로 분류한다.</li>
</ol>`,
  },
  {
    num: 37, category: 'jobinfo',
    title: '한국표준직업분류와 직능 수준의 관계 (빈칸 채우기)',
    frequency: '23-2, 21-1',
    keyword: 'KSCO 대분류와 직능수준',
    answer: `<table>
<tr><th>대분류 항목</th><th>직능수준</th></tr>
<tr><td>관리자</td><td>제<strong>4</strong>직능수준 혹은 제<strong>3</strong>직능수준 필요</td></tr>
<tr><td>판매종사자</td><td>제<strong>2</strong>직능수준 필요</td></tr>
<tr><td>장치·기계 조작 및 조립 종사자</td><td>제<strong>2</strong>직능수준 필요</td></tr>
<tr><td>군인</td><td>제<strong>2</strong>직능수준 이상 필요</td></tr>
<tr><td>단순 노무직</td><td>제<strong>1</strong>직능수준</td></tr>
</table>`,
  },
  {
    num: 45, category: 'jobinfo',
    title: '직무평가 방법을 쓰고 설명하시오.',
    frequency: '23-2, 21-3',
    keyword: '직무평가방법',
    answer: `<ol>
<li><strong>서열법</strong> : 직무의 상대적 중요도에 따라 순위를 정하는 방법</li>
<li><strong>분류법</strong> : 사전에 작성한 등급표에 따라 직무에 등급을 부여하는 방법</li>
<li><strong>점수법</strong> : 직무의 구성 요소별 중요도에 따라 점수를 부여한 후 계산하여 가치를 평가하는 방법</li>
<li><strong>요소비교법</strong> : 핵심이 되는 직무를 기준으로 비교함으로써 상대적 가치를 결정하는 방법</li>
</ol>`,
  },
  {
    num: 82, category: 'jobinfo',
    title: '직무분석 방법 중 면접법의 장점과 단점을 각각 2가지씩 쓰시오.',
    frequency: '23-1',
    keyword: '면접법 장단점',
    answer: `<h4>장점</h4><ol>
<li>수행자의 정신적인 활동까지 파악할 수 있다.</li>
<li>질문지법에 비해 응답률이 높다.</li>
<li>추가질문, 설명 등을 통해 답변의 오류를 줄일 수 있다.</li>
</ol>
<h4>단점</h4><ol>
<li>피면접자의 주관적인 의견이 반영되어 분석의 정확도에 영향을 줄 수 있다.</li>
<li>정보의 수집에 많은 시간과 노력이 필요하다.</li>
<li>익명성이 보장되지 않아 민감한 질문은 하기 어렵다.</li>
</ol>`,
  },
  {
    num: 86, category: 'jobinfo',
    title: '한국 표준산업분류에서 통계 단위의 산업을 결정하는 방법을 쓰시오.',
    frequency: '23-1, 21-3, 20-3',
    keyword: 'KSIC 산업 결정 방법',
    answer: `<ol>
<li>생산 단위가 수행하는 주된 산업활동의 종류에 따라 결정한다.</li>
<li>계절에 따라 산업이 달라지는 경우에는 조사 기간 중 산출액이 많았던 산업으로 결정한다.</li>
<li>휴업·청산 중인 경우에는 영업 중 또는 청산을 시작하기 전 산업으로, 설립 중인 경우에는 개시하는 산업으로 결정한다.</li>
</ol>`,
  },
  {
    num: 92, category: 'jobinfo',
    title: '직무분석 방법 중 결정적 사건법의 단점을 3가지 쓰시오.',
    frequency: '22-2, 19-3',
    keyword: '결정적 사건법 단점',
    answer: `<ol>
<li>응답자의 주관적 의견 개입으로 인해 사건이 왜곡될 수 있다.</li>
<li>직무를 전체적으로 반영하지 못하고 일부만 강조될 수 있다.</li>
<li>정확한 조사를 위해 특별히 훈련받은 사람이 필요하다.</li>
<li>조사를 위하여 많은 시간과 노력을 필요로 한다.</li>
<li>일상적 업무 정보가 배제될 수 있다.</li>
</ol>`,
  },
  {
    num: 93, category: 'jobinfo',
    title: '직무분석 자료 활용의 용도 4가지를 쓰시오.',
    frequency: '20-3',
    keyword: '직무분석 자료 활용',
    answer: `<ol>
<li>구인과 채용에 활용한다.</li><li>직무평가의 기초 자료로 활용한다.</li><li>승진, 배치 등에 활용한다.</li><li>교육과 훈련에 활용한다.</li>
<li>직무수행평가 및 인사고과에 활용한다.</li><li>작업환경 개선, 산업 안전 관리에 활용한다.</li><li>직무 분류에 활용한다.</li>
</ol>`,
  },
  {
    num: 94, category: 'jobinfo',
    title: '겔라트가 제시한 직업 의사결정의 상담과정 8단계를 순서대로 쓰시오.',
    frequency: '22-2, 19-3, 19-1',
    keyword: '겔라트(Gelatt) 의사결정 8단계',
    answer: `<ol>
<li>목표의식</li><li>정보수집</li><li>대안의 열거</li><li>대안의 결과 예측</li><li>대안의 실현 가능성 예측</li><li>가치평가</li><li>의사결정</li><li>평가 &amp; 재투입</li>
</ol>`,
  },

  /* ===================================================================
     노동시장론 (labor_market)
     =================================================================== */
  {
    num: 38, category: 'labor_market',
    title: '내부 노동시장의 형성 요인과 장점을 각각 3가지씩 쓰시오.',
    frequency: '22-3, 23-2',
    keyword: '내부노동시장 형성요인/장점',
    answer: `<h4>형성 요인</h4><ol><li>숙련의 특수성</li><li>현장훈련</li><li>기업 내의 관습</li></ol>
<h4>장점</h4><ol>
<li>우수한 인적자원을 확보하고 유지할 수 있다.</li>
<li>승진, 배치전환 등을 통하여 동기를 유발할 수 있다.</li>
<li>인적자원 확보 및 동기유발을 통해 생산성이 향상된다.</li>
</ol>`,
  },
  {
    num: 40, category: 'labor_market',
    title: '산업별로 임금격차가 발생하는 원인을 쓰시오.',
    frequency: '22-3, 19-3',
    keyword: '산업별 임금격차 원인',
    answer: `<ol>
<li><strong>노동조합의 존재 여부</strong> : 강력한 노동조합이 존재하는 산업은 급여가 높음</li>
<li><strong>보상적 임금</strong> : 근무 환경이나 조건이 열악한 산업의 경우 금전적 보상</li>
<li><strong>노동생산성의 차이</strong> : 노동생산성이 높은 산업은 임금이 높음</li>
<li>지리적 요인</li>
<li>산업의 종류</li>
</ol>`,
  },
  {
    num: 60, category: 'labor_market',
    title: '야호다의 박탈이론에서 고용으로 인한 잠재효과 5가지를 쓰시오.',
    frequency: '23-2',
    keyword: '야호다(Jahoda) 박탈이론',
    answer: `<ol><li>시간의 조직화</li><li>사회적 접촉</li><li>공동의 목표 참여</li><li>의미 있는 활동</li><li>사회적 정체감과 지위 확보</li></ol>`,
  },
  {
    num: 67, category: 'labor_market',
    title: '기혼여성의 경제활동 참가율을 낮게 하는 요인 6가지를 쓰시오.',
    frequency: '23-2, 21-1',
    keyword: '기혼여성 경제활동참가율 저해요인',
    answer: `<ol><li>배우자 소득의 증가</li><li>많은 자녀의 수</li><li>높은 사회 전체 실업률</li><li>낮은 자녀의 연령</li><li>열악한 법적, 제도적 환경</li><li>낮은 여성의 교육수준</li></ol>`,
  },
  {
    num: 71, category: 'labor_market',
    title: '노동수요의 탄력성 공식과 영향 요인을 쓰시오.',
    frequency: '23-1, 21-3, 19-3, 19-2',
    keyword: '노동수요 탄력성',
    answer: `<h4>공식</h4>
<p>노동수요 탄력성 = | 노동수요 변화율 / 임금 변화율 |</p>
<h4>영향을 주는 요인</h4>
<ol><li>총생산비에서 노동 비용이 차지하는 비중</li><li>다른 생산요소의 노동에 대한 대체 가능성</li><li>노동 외 생산요소의 공급 탄력성</li><li>생산품에 대한 수요의 탄력성</li></ol>`,
  },
  {
    num: 72, category: 'labor_market',
    title: '임금의 하방경직성의 의미와 원인 5가지를 쓰시오.',
    frequency: '23-1',
    keyword: '임금 하방경직성',
    answer: `<h4>의미</h4>
<p>한번 인상된 임금이 경제 여건의 변화에도 불구하고 하락하지 않고 현재 수준을 유지하는 현상</p>
<h4>원인</h4>
<ol><li>최저임금제</li><li>강력한 노동조합의 존재</li><li>장기 고용계약</li><li>연공급제 임금 형태</li><li>노동자의 화폐환상</li></ol>`,
  },
  {
    num: 100, category: 'labor_market',
    title: '노동수요의 임금 탄력성 계산 문제',
    frequency: '22-2',
    keyword: '노동수요 탄력성 계산',
    answer: `<p><strong>조건:</strong> Ld = 5,000 - 2W, W = 2,000원</p>
<h4>① 임금 탄력성</h4>
<p>탄력성 = (△Ld/△W) × (W/Ld)</p>
<p>△Ld/△W = -2 (기울기)</p>
<p>W = 2,000일 때, Ld = 5,000 - (2×2,000) = 1,000</p>
<p>|-2 × (2,000/1,000)| = <strong>4</strong></p>
<h4>② 근로자의 수입</h4>
<p>수입 = Ld × W = 1,000 × 2,000 = <strong>2,000,000원</strong></p>`,
  },
];

/** 카테고리별 문항 필터 */
export function getQuestionsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return SILGI_FREQUENT;
  return SILGI_FREQUENT.filter(q => q.category === categoryId);
}

/** 전체 문항 수 */
export function getTotalCount() {
  return SILGI_FREQUENT.length;
}

/** 카테고리별 문항 수 */
export function getCategoryCounts() {
  const counts = {};
  for (const cat of FREQUENT_CATEGORIES) {
    if (cat.id === 'all') continue;
    counts[cat.id] = SILGI_FREQUENT.filter(q => q.category === cat.id).length;
  }
  counts.all = SILGI_FREQUENT.length;
  return counts;
}
