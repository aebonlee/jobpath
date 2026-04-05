import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { SUBJECTS } from '../../config/site';

export default function ExamInfo() {
  return (
    <>
      <SEOHead title="시험 안내" description="직업상담사 2급 자격시험 안내 - 시험 개요, 일정, 합격 기준, 공부 방법" />
      <div className="page-header">
        <div className="container">
          <h1>직업상담사 2급 시험 안내</h1>
          <p className="page-desc">국가기술자격 시험에 대한 핵심 정보를 안내합니다</p>
        </div>
      </div>

      <div className="container info-page">
        {/* Overview */}
        <section className="info-card">
          <div className="info-card-header">
            <span className="info-card-icon overview"><i className="fa-solid fa-clipboard-list" /></span>
            <h2>시험 개요</h2>
          </div>
          <p className="info-card-text">
            직업상담사 2급은 <strong>한국산업인력공단</strong>에서 시행하는 국가기술자격으로,
            구직자와 구인자에게 직업정보를 제공하고 직업상담을 수행할 수 있는 전문 인력을 양성하기 위한 자격입니다.
            학력, 경력, 연령 제한 없이 <strong>누구나 응시 가능</strong>합니다.
          </p>
          <div className="info-highlight-row">
            <div className="info-highlight">
              <span className="info-highlight-label">응시 자격</span>
              <span className="info-highlight-value">제한 없음</span>
            </div>
            <div className="info-highlight">
              <span className="info-highlight-label">시행 기관</span>
              <span className="info-highlight-value">한국산업인력공단</span>
            </div>
            <div className="info-highlight">
              <span className="info-highlight-label">문제 유형</span>
              <span className="info-highlight-value">객관식 4지택일</span>
            </div>
            <div className="info-highlight">
              <span className="info-highlight-label">연 시행</span>
              <span className="info-highlight-value">3회</span>
            </div>
          </div>
        </section>

        {/* Two Column: Written + Practical */}
        <div className="info-grid-2">
          {/* Written Exam */}
          <section className="info-card">
            <div className="info-card-header">
              <span className="info-card-icon pilgi"><i className="fa-solid fa-pen-to-square" /></span>
              <h2>필기시험</h2>
            </div>
            <table className="info-table">
              <tbody>
                <tr><th>과목 수</th><td>5과목</td></tr>
                <tr><th>문항 수</th><td>총 100문항 (과목당 20문항)</td></tr>
                <tr><th>문제 유형</th><td>객관식 4지 택일형</td></tr>
                <tr><th>시험 시간</th><td><strong>150분</strong> (2시간 30분)</td></tr>
                <tr><th>합격 기준</th><td>전 과목 평균 <strong>60점</strong> 이상 + 과목당 <strong>40점</strong> 이상</td></tr>
              </tbody>
            </table>
            <div className="info-alert">
              <i className="fa-solid fa-triangle-exclamation" />
              <span>한 과목이라도 <strong>40점 미만</strong>이면 과락으로 불합격됩니다.</span>
            </div>
            <div className="info-card-action">
              <Link to="/pilgi" className="btn btn-primary">필기 학습 시작</Link>
            </div>
          </section>

          {/* Practical Exam */}
          <section className="info-card">
            <div className="info-card-header">
              <span className="info-card-icon silgi"><i className="fa-solid fa-file-pen" /></span>
              <h2>실기시험</h2>
            </div>
            <table className="info-table">
              <tbody>
                <tr><th>과목</th><td>직업상담 실무</td></tr>
                <tr><th>문제 유형</th><td>주관식 (단답형, 서술형, 계산형)</td></tr>
                <tr><th>시험 시간</th><td><strong>150분</strong> (2시간 30분)</td></tr>
                <tr><th>합격 기준</th><td>100점 만점 중 <strong>60점</strong> 이상</td></tr>
              </tbody>
            </table>
            <div className="info-alert info-alert-info">
              <i className="fa-solid fa-circle-info" />
              <span>필기시험 합격 후 2년 이내에 실기시험에 합격해야 합니다.</span>
            </div>
            <div className="info-card-action">
              <Link to="/silgi" className="btn btn-primary">실기 학습 시작</Link>
            </div>
          </section>
        </div>

        {/* Subjects */}
        <section className="info-card">
          <div className="info-card-header">
            <span className="info-card-icon subjects"><i className="fa-solid fa-book-open" /></span>
            <h2>필기 과목 (5과목)</h2>
          </div>
          <div className="info-subjects-grid">
            {SUBJECTS.map((subject, idx) => (
              <div key={subject.code} className="info-subject-item" style={{ '--accent': subject.color }}>
                <div className="info-subject-num">{idx + 1}</div>
                <div className="info-subject-body">
                  <h4>{subject.name}</h4>
                  <p>
                    {subject.code === 'counseling' && '직업상담의 개념, 상담이론(파슨스/로저스/엘리스), 상담기법, 직업상담 과정, 직업적응이론'}
                    {subject.code === 'psychology' && '직업발달이론(Super/Holland/Ginzberg), 직업심리검사, 직업적성·흥미·성격검사, 타당도·신뢰도'}
                    {subject.code === 'jobinfo' && '직업정보 제공·수집, 직업분류, 한국표준직업분류(KSCO), 한국표준산업분류(KSIC), 직무분석'}
                    {subject.code === 'labor_market' && '노동시장 이론, 노동공급·수요, 임금이론, 실업이론, 인적자본론, 노동이동'}
                    {subject.code === 'labor_law' && '근로기준법, 고용보험법, 직업안정법, 근로자직업능력개발법, 파견법, 남녀고용평등법'}
                  </p>
                </div>
                <Link to={`/learn/${subject.code}`} className="info-subject-link" title={`${subject.name} 학습하기`}>
                  <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule */}
        <section className="info-card">
          <div className="info-card-header">
            <span className="info-card-icon schedule"><i className="fa-solid fa-calendar-days" /></span>
            <h2>2026년 시험 일정</h2>
          </div>
          <div className="info-table-wrap">
            <table className="info-table schedule">
              <thead>
                <tr><th>구분</th><th>1회</th><th>2회</th><th>3회</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="info-round-badge">필기 접수</span></td>
                  <td>1월 12일 ~ 1월 15일</td>
                  <td>4월 20일 ~ 4월 23일</td>
                  <td>7월 20일 ~ 7월 23일</td>
                </tr>
                <tr>
                  <td><span className="info-round-badge">필기 시험</span></td>
                  <td>1월 30일 ~ 3월 3일</td>
                  <td>5월 9일 ~ 5월 29일</td>
                  <td>8월 7일 ~ 9월 1일</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="info-alert info-alert-info" style={{ marginTop: 16 }}>
            <i className="fa-solid fa-clock" />
            <span>접수는 첫날 <strong>10:00</strong>부터 마지막 날 <strong>18:00</strong>까지 진행됩니다.</span>
          </div>
          <p className="info-note">
            * 시험 접수 및 상세 일정은 <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer"><strong>큐넷(Q-Net)</strong></a>에서 반드시 확인하세요.
            공단 사정에 따라 변경될 수 있으므로 정기적으로 체크하시기 바랍니다.
          </p>
        </section>

        {/* Study Tips */}
        <section className="info-card">
          <div className="info-card-header">
            <span className="info-card-icon tips"><i className="fa-solid fa-lightbulb" /></span>
            <h2>효율적인 공부 방법</h2>
          </div>
          <div className="info-tips-grid">
            <div className="info-tip-card">
              <div className="info-tip-num">1</div>
              <div className="info-tip-body">
                <h4>기출문제 중심 학습</h4>
                <p>
                  직업상담사 필기 시험은 <strong>문제은행 방식</strong>의 비중이 높습니다.
                  이론을 완벽히 이해하기보다는, 기출문제를 반복해서 풀며
                  자주 나오는 개념을 익히는 것이 훨씬 효율적입니다.
                </p>
              </div>
            </div>
            <div className="info-tip-card">
              <div className="info-tip-num">2</div>
              <div className="info-tip-body">
                <h4>오답 노트 작성</h4>
                <p>
                  틀린 문제는 <strong>왜 틀렸는지 확인</strong>하고,
                  관련 이론을 가볍게 찾아보는 방식으로 보완하세요.
                  같은 유형의 문제를 다시 틀리지 않는 것이 핵심입니다.
                </p>
              </div>
            </div>
            <div className="info-tip-card">
              <div className="info-tip-num">3</div>
              <div className="info-tip-body">
                <h4>반복 횟수 늘리기</h4>
                <p>
                  최소 <strong>3~5개년</strong> 이상의 기출문제를
                  <strong> 3회 이상 반복</strong>해서 풀어보시는 것을 추천합니다.
                  반복할수록 출제 패턴이 눈에 들어옵니다.
                </p>
              </div>
            </div>
          </div>
          <div className="info-card-action" style={{ marginTop: 28 }}>
            <Link to="/pilgi" className="btn btn-primary" style={{ marginRight: 12 }}>기출문제 풀기</Link>
            <Link to="/wrong-answers" className="btn btn-secondary">오답노트 보기</Link>
          </div>
        </section>

        {/* Links */}
        <section className="info-card">
          <div className="info-card-header">
            <span className="info-card-icon links"><i className="fa-solid fa-link" /></span>
            <h2>유용한 링크</h2>
          </div>
          <div className="info-links-grid">
            <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer" className="info-link-card">
              <div className="info-link-icon"><i className="fa-solid fa-award" /></div>
              <div>
                <strong>Q-Net (큐넷)</strong>
                <p>시험 접수 및 합격자 조회</p>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square info-link-ext" />
            </a>
            <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" className="info-link-card">
              <div className="info-link-icon"><i className="fa-solid fa-briefcase" /></div>
              <div>
                <strong>워크넷</strong>
                <p>직업정보 및 채용공고</p>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square info-link-ext" />
            </a>
            <a href="https://www.keis.or.kr" target="_blank" rel="noopener noreferrer" className="info-link-card">
              <div className="info-link-icon"><i className="fa-solid fa-building-columns" /></div>
              <div>
                <strong>한국고용정보원</strong>
                <p>고용동향 및 직업연구</p>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square info-link-ext" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
