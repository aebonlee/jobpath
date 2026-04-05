import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { SUBJECTS } from '../../config/site';

export default function PilgiHome() {
  return (
    <>
      <SEOHead title="필기 시험" description="직업상담사 2급 필기 시험 준비" />
      <div className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-pen-to-square" /> 필기 시험</h1>
          <p className="page-desc">5과목 100문항, 4지선다. 평균 60점 이상 + 과목당 40점 이상 합격</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        {/* Mode Selection */}
        <div className="pilgi-modes">
          <Link to="/pilgi/select" className="pilgi-mode-card">
            <div className="pilgi-mode-icon exam">
              <i className="fa-solid fa-desktop" />
            </div>
            <h3>시험 모드</h3>
            <p>실제 시험과 동일한 환경으로 100문항을 150분 내에 풀어보세요</p>
            <span className="pilgi-mode-badge">150분 타이머</span>
          </Link>

          <Link to="/pilgi/study" className="pilgi-mode-card">
            <div className="pilgi-mode-icon study">
              <i className="fa-solid fa-book-open" />
            </div>
            <h3>학습 모드</h3>
            <p>답 선택 즉시 정답과 해설을 확인하며 학습할 수 있습니다</p>
            <span className="pilgi-mode-badge">즉시 해설</span>
          </Link>
        </div>

        {/* Subject Overview */}
        <div className="section-header mt-4">
          <div className="section-badge">SUBJECTS</div>
          <h2 className="section-title">과목 안내</h2>
        </div>
        <div className="pilgi-subjects-grid">
          {SUBJECTS.map(subject => (
            <div key={subject.code} className="pilgi-subject-card" style={{ borderTopColor: subject.color }}>
              <div className="pilgi-subject-icon" style={{ color: subject.color, background: `${subject.color}12` }}>
                <i className={subject.icon} />
              </div>
              <h4>{subject.name}</h4>
              <p>20문항 / 과목당 40점 이상</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
