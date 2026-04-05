import { useLocation, useNavigate, Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { RadarChart } from '../../components/ScoreChart';
import { SUBJECTS } from '../../config/site';
import { checkPass, getGrade, formatTime } from '../../utils/scoring';

export default function ExamResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, answers, session, subjectScores } = location.state || {};

  if (!session) {
    return (
      <div className="loading-page" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="text-center">
          <p>결과 데이터가 없습니다.</p>
          <Link to="/pilgi" className="btn btn-primary mt-3">필기 홈으로</Link>
        </div>
      </div>
    );
  }

  const { isPass, failedSubjects } = checkPass(subjectScores, session.score_total);
  const grade = getGrade(session.score_total);

  return (
    <>
      <SEOHead title="시험 결과" />
      <div className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-chart-column" /> 시험 결과</h1>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        {/* Pass/Fail Banner */}
        <div className={`result-banner ${isPass ? 'pass' : 'fail'}`}>
          <div className="result-banner-icon">
            <i className={isPass ? 'fa-solid fa-trophy' : 'fa-solid fa-rotate-left'} />
          </div>
          <div className="result-banner-content">
            <h2>{isPass ? '합격' : '불합격'}</h2>
            <p>{isPass ? '축하합니다! 합격 기준을 충족했습니다.' : '아쉽지만 합격 기준에 미달했습니다.'}</p>
          </div>
          <div className="result-banner-score">
            <span className="result-total-score">{session.score_total}</span>
            <span className="result-total-label">/ 100점</span>
          </div>
        </div>

        {/* Summary */}
        <div className="result-summary-grid">
          <div className="result-stat-card">
            <i className="fa-solid fa-check-double" />
            <span className="result-stat-value">{session.correct_count}</span>
            <span className="result-stat-label">정답 수</span>
          </div>
          <div className="result-stat-card">
            <i className="fa-solid fa-percentage" />
            <span className="result-stat-value">{session.score_total}점</span>
            <span className="result-stat-label">총점</span>
          </div>
          <div className="result-stat-card">
            <i className="fa-solid fa-clock" />
            <span className="result-stat-value">{formatTime(session.time_spent_sec)}</span>
            <span className="result-stat-label">소요 시간</span>
          </div>
          <div className="result-stat-card">
            <i className="fa-solid fa-award" />
            <span className="result-stat-value" style={{ color: grade.color }}>{grade.label}</span>
            <span className="result-stat-label">등급</span>
          </div>
        </div>

        {/* Subject Scores */}
        <div className="result-subjects">
          <h3>과목별 성적</h3>
          <div className="result-subjects-grid">
            {SUBJECTS.map(subject => {
              const score = subjectScores[subject.code] ?? 0;
              const passed = score >= 40;
              return (
                <div key={subject.code} className={`subject-score-card ${passed ? '' : 'failed'}`}>
                  <div className="subject-score-header">
                    <span className="subject-score-name" style={{ color: subject.color }}>
                      <i className={subject.icon} /> {subject.name}
                    </span>
                    <span className={`subject-pass-badge ${passed ? 'pass' : 'fail'}`}>
                      {passed ? '통과' : '과락'}
                    </span>
                  </div>
                  <div className="subject-score-bar">
                    <div
                      className="subject-score-fill"
                      style={{ width: `${score}%`, background: passed ? subject.color : 'var(--color-wrong)' }}
                    />
                  </div>
                  <span className="subject-score-value">{score}점</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="result-chart-section">
          <h3>과목별 분석</h3>
          <RadarChart scores={subjectScores} />
        </div>

        {/* Failed Subjects Warning */}
        {failedSubjects.length > 0 && (
          <div className="result-warning">
            <i className="fa-solid fa-triangle-exclamation" />
            <div>
              <strong>과락 과목:</strong>
              {failedSubjects.map(s => (
                <span key={s.code} className="result-failed-subject" style={{ color: s.color }}>
                  {s.name} ({subjectScores[s.code]}점)
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="result-actions">
          <Link
            to={`/pilgi/review/${session.id}`}
            className="btn btn-primary"
            state={{ questions, answers }}
          >
            <i className="fa-solid fa-magnifying-glass" /> 오답 복습
          </Link>
          <Link to="/pilgi/select" className="btn btn-secondary">
            <i className="fa-solid fa-rotate-right" /> 다시 시험보기
          </Link>
          <Link to="/dashboard" className="btn btn-secondary">
            <i className="fa-solid fa-chart-pie" /> 대시보드
          </Link>
        </div>
      </div>
    </>
  );
}
