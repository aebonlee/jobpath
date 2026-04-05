import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { RadarChart, BarChart } from '../../components/ScoreChart';
import PassPrediction from '../../components/PassPrediction';
import AuthGuard from '../../components/AuthGuard';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, TABLES } from '../../lib/supabase';
import { SUBJECTS } from '../../config/site';

function DashboardContent() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgScores, setAvgScores] = useState({});

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from(TABLES.EXAM_SESSIONS)
        .select('*')
        .eq('user_id', user.id)
        .eq('exam_type', 'pilgi')
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false });

      setSessions(data || []);

      // Calculate average scores by subject
      if (data?.length) {
        const totals = {};
        const counts = {};
        SUBJECTS.forEach(s => { totals[s.code] = 0; counts[s.code] = 0; });

        data.forEach(session => {
          if (session.score_by_subject) {
            Object.entries(session.score_by_subject).forEach(([code, score]) => {
              totals[code] = (totals[code] || 0) + score;
              counts[code] = (counts[code] || 0) + 1;
            });
          }
        });

        const avgs = {};
        Object.keys(totals).forEach(code => {
          avgs[code] = counts[code] ? Math.round(totals[code] / counts[code]) : 0;
        });
        setAvgScores(avgs);
      }
    } catch (err: any) {
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="loading-page"><div className="loading-spinner" /></div>;
  }

  const totalExams = sessions.length;
  const avgTotal = totalExams ? Math.round(sessions.reduce((s, e) => s + (e.score_total || 0), 0) / totalExams) : 0;
  const passCount = sessions.filter(s => s.is_pass).length;
  const passRate = totalExams ? Math.round((passCount / totalExams) * 100) : 0;

  // Calculate streak
  let streak = 0;
  const today = new Date();
  const days = new Set(sessions.map(s => new Date(s.completed_at).toDateString()));
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (days.has(d.toDateString())) streak++;
    else if (i > 0) break;
  }

  const weakSubjects = SUBJECTS.filter(s => (avgScores[s.code] || 0) < 60);
  const recentSessions = sessions.slice(0, 5);

  return (
    <>
      <SEOHead title="대시보드" />
      <div className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-chart-pie" /> 학습 대시보드</h1>
          <p className="page-desc">학습 현황을 확인하고 약점을 분석하세요</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        {/* Stats Cards */}
        <div className="dashboard-stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><i className="fa-solid fa-file-lines" /></div>
            <span className="stat-number">{totalExams}</span>
            <span className="stat-label">총 시험 수</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fa-solid fa-percentage" /></div>
            <span className="stat-number">{avgTotal}점</span>
            <span className="stat-label">평균 점수</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fa-solid fa-trophy" /></div>
            <span className="stat-number">{passRate}%</span>
            <span className="stat-label">합격률</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fa-solid fa-fire" /></div>
            <span className="stat-number">{streak}일</span>
            <span className="stat-label">연속 학습</span>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Radar Chart */}
          <div className="dashboard-card">
            <h3><i className="fa-solid fa-chart-pie" /> 과목별 평균 점수</h3>
            {totalExams > 0 ? (
              <RadarChart scores={avgScores} />
            ) : (
              <p className="dashboard-empty">시험 기록이 없습니다.</p>
            )}
          </div>

          {/* Pass Prediction */}
          <PassPrediction sessions={sessions} />

          {/* Score Trend */}
          <div className="dashboard-card">
            <h3><i className="fa-solid fa-chart-line" /> 점수 추이</h3>
            {sessions.length > 0 ? (
              <BarChart sessions={[...sessions].reverse().slice(-10)} />
            ) : (
              <p className="dashboard-empty">시험 기록이 없습니다.</p>
            )}
          </div>

          {/* Weak Subjects */}
          <div className="dashboard-card">
            <h3><i className="fa-solid fa-triangle-exclamation" /> 약점 과목</h3>
            {weakSubjects.length > 0 ? (
              <div className="weakness-list">
                {weakSubjects.map(s => (
                  <div key={s.code} className="weakness-item">
                    <span style={{ color: s.color }}><i className={s.icon} /> {s.name}</span>
                    <span className="weakness-score">{avgScores[s.code] || 0}점</span>
                  </div>
                ))}
              </div>
            ) : totalExams > 0 ? (
              <p className="dashboard-good">모든 과목이 60점 이상입니다!</p>
            ) : (
              <p className="dashboard-empty">시험 기록이 없습니다.</p>
            )}
          </div>
        </div>

        {/* Recent Exams */}
        <div className="dashboard-card mt-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3><i className="fa-solid fa-clock-rotate-left" /> 최근 시험</h3>
            <Link to="/dashboard/history" className="btn btn-sm btn-secondary">전체 보기</Link>
          </div>
          {recentSessions.length > 0 ? (
            <div className="history-table-wrapper">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>총점</th>
                    <th>정답</th>
                    <th>소요시간</th>
                    <th>결과</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSessions.map(s => (
                    <tr key={s.id}>
                      <td>{new Date(s.completed_at).toLocaleDateString('ko-KR')}</td>
                      <td><strong>{s.score_total}점</strong></td>
                      <td>{s.correct_count}/{s.total_questions}</td>
                      <td>{Math.floor(s.time_spent_sec / 60)}분</td>
                      <td>
                        <span className={`pass-badge ${s.is_pass ? 'pass' : 'fail'}`}>
                          {s.is_pass ? '합격' : '불합격'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="dashboard-empty">시험 기록이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
