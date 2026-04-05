import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SUBJECTS } from '../config/site';
import { useAuth } from '../contexts/AuthContext';
import { supabase, TABLES } from '../lib/supabase';

function LoggedInHome({ user }: { user: any }) {
  const [stats, setStats] = useState<{
    lastPilgiScore: number | null;
    lastSilgiMatch: number | null;
    totalExams: number;
    streak: number;
  }>({ lastPilgiScore: null, lastSilgiMatch: null, totalExams: 0, streak: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const userId = user.id;

        const [pilgiRes, silgiRes, countRes] = await Promise.all([
          supabase
            .from(TABLES.EXAM_SESSIONS)
            .select('score_total')
            .eq('user_id', userId)
            .eq('exam_type', 'pilgi')
            .not('completed_at', 'is', null)
            .order('completed_at', { ascending: false })
            .limit(1),
          supabase
            .from(TABLES.EXAM_SESSIONS)
            .select('score_total')
            .eq('user_id', userId)
            .eq('exam_type', 'silgi_practice')
            .not('completed_at', 'is', null)
            .order('completed_at', { ascending: false })
            .limit(1),
          supabase
            .from(TABLES.EXAM_SESSIONS)
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId)
            .not('completed_at', 'is', null),
        ]);

        setStats({
          lastPilgiScore: pilgiRes.data?.[0]?.score_total ?? null,
          lastSilgiMatch: silgiRes.data?.[0]?.score_total ?? null,
          totalExams: countRes.count ?? 0,
          streak: 0,
        });
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [user.id]);

  const displayName = user.user_metadata?.name || user.user_metadata?.full_name || '학습자';

  return (
    <div className="home-personalized">
      <div className="container">
        {/* Greeting */}
        <div className="home-greeting">
          <h1>안녕하세요, <span className="highlight">{displayName}</span>님!</h1>
          <p>오늘도 합격을 향해 한 걸음 더 가까이</p>
        </div>

        {/* Quick Actions */}
        <div className="home-quick-grid">
          <Link to="/pilgi/select" className="home-quick-card">
            <div className="home-quick-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
              <i className="fa-solid fa-desktop" />
            </div>
            <h3>필기 CBT 시작</h3>
            <p>실전 모의시험으로 실력 점검</p>
          </Link>
          <Link to="/silgi/practice" className="home-quick-card">
            <div className="home-quick-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
              <i className="fa-solid fa-pen" />
            </div>
            <h3>실기 연습 시작</h3>
            <p>서술형 문제 풀고 모범답안 비교</p>
          </Link>
          <Link to="/wrong-answers" className="home-quick-card">
            <div className="home-quick-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
              <i className="fa-solid fa-rotate-left" />
            </div>
            <h3>오답노트 복습</h3>
            <p>틀린 문제를 다시 풀어보기</p>
          </Link>
          <Link to="/summary" className="home-quick-card">
            <div className="home-quick-icon" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>
              <i className="fa-solid fa-graduation-cap" />
            </div>
            <h3>학습요약 보기</h3>
            <p>핵심 개념 빠르게 복습</p>
          </Link>
        </div>

        {/* Mini Stats */}
        {loading ? (
          <div className="home-mini-stats">
            <div className="home-mini-stats-inner">
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>학습 현황 불러오는 중...</p>
            </div>
          </div>
        ) : (
          <div className="home-mini-stats">
            <div className="home-mini-stats-inner">
              <div className="home-mini-stat">
                <span className="home-mini-stat-label">최근 필기 점수</span>
                <span className="home-mini-stat-value">
                  {stats.lastPilgiScore !== null ? `${stats.lastPilgiScore}점` : '-'}
                </span>
              </div>
              <div className="home-mini-stat">
                <span className="home-mini-stat-label">최근 실기 점수</span>
                <span className="home-mini-stat-value">
                  {stats.lastSilgiMatch !== null ? `${stats.lastSilgiMatch}점` : '-'}
                </span>
              </div>
              <div className="home-mini-stat">
                <span className="home-mini-stat-label">총 시험 횟수</span>
                <span className="home-mini-stat-value">{stats.totalExams}회</span>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard CTA */}
        <div className="home-dashboard-cta">
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            <i className="fa-solid fa-chart-pie" /> 대시보드에서 상세 분석 보기
          </Link>
        </div>
      </div>
    </div>
  );
}

function LandingHome() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="particle" style={{
              width: `${4 + i * 3}px`,
              height: `${4 + i * 3}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              '--duration': `${15 + i * 3}s`,
              '--delay': `${i * 2}s`,
            }} />
          ))}
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fa-solid fa-award" /> 2026년 직업상담사 2급
            </div>
            <h1 className="hero-title">
              직업상담사 2급<br />
              <span className="highlight">합격을 위한 최적의 학습</span>
            </h1>
            <p className="hero-description">
              기출문제 CBT, 모의시험, 과목별 분석, 오답노트까지.<br />
              체계적인 시험 준비로 한 번에 합격하세요.
            </p>
            <div className="hero-buttons">
              <Link to="/pilgi" className="btn btn-primary">
                <i className="fa-solid fa-pen-to-square" /> 필기 시작하기
              </Link>
              <Link to="/info" className="btn btn-secondary">
                <i className="fa-solid fa-circle-info" /> 시험 안내
              </Link>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"><div className="wheel" /></div>
          <span className="scroll-text">Scroll Down</span>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="home-section" style={{ padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">SUBJECTS</div>
            <h2 className="section-title">5개 필기 과목</h2>
            <p className="section-subtitle">
              과목별 맞춤 학습으로 약점을 보완하고 합격을 준비하세요
            </p>
          </div>
          <div className="home-subjects-grid">
            {SUBJECTS.map((subject, idx) => (
              <div
                key={subject.code}
                className="home-subject-card fade-in-up"
                style={{ borderLeftColor: subject.color, animationDelay: `${idx * 0.1}s` }}
              >
                <div className="home-subject-icon" style={{ background: `${subject.color}15`, color: subject.color }}>
                  <i className={subject.icon} />
                </div>
                <h4>{subject.name}</h4>
                <p className="home-subject-desc">
                  {subject.code === 'counseling' && '상담이론, 상담기법, 직업상담 과정 등'}
                  {subject.code === 'psychology' && '직업심리검사, 직업적성, 흥미이론 등'}
                  {subject.code === 'jobinfo' && '직업분류, 직업정보 수집·분석, 워크넷 등'}
                  {subject.code === 'labor_market' && '노동시장 이론, 임금, 실업, 인적자본 등'}
                  {subject.code === 'labor_law' && '근로기준법, 고용보험법, 직업안정법 등'}
                </p>
                <span className="home-subject-questions">20문항 / 과목</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-section home-features-section" style={{ padding: 'var(--section-padding) 0', background: 'var(--bg-light-gray)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">FEATURES</div>
            <h2 className="section-title">학습 기능</h2>
            <p className="section-subtitle">합격을 위한 다양한 학습 도구를 제공합니다</p>
          </div>
          <div className="home-features-grid">
            {[
              { icon: 'fa-solid fa-desktop', title: 'CBT 모의시험', desc: '실제 시험과 동일한 환경의 온라인 CBT로 실전 감각을 키우세요' },
              { icon: 'fa-solid fa-book-open', title: '학습 모드', desc: '답 선택 즉시 정답과 해설을 확인하며 효율적으로 학습하세요' },
              { icon: 'fa-solid fa-chart-pie', title: '과목별 분석', desc: '레이더 차트로 강점과 약점을 한눈에 파악하세요' },
              { icon: 'fa-solid fa-rotate-left', title: '오답 노트', desc: '틀린 문제를 모아 반복 학습으로 실력을 올리세요' },
              { icon: 'fa-solid fa-trophy', title: '합격 예측', desc: '최근 시험 결과를 분석하여 합격 확률을 예측합니다' },
              { icon: 'fa-solid fa-file-pen', title: '실기 연습', desc: '서술형 문제와 모범답안 비교로 실기도 준비하세요' },
            ].map((feat, idx) => (
              <div key={idx} className="home-feature-card">
                <div className="home-feature-icon">
                  <i className={feat.icon} />
                </div>
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats-section">
        <div className="container">
          <div className="home-stats-grid">
            <div className="home-stat-item">
              <span className="home-stat-number">5</span>
              <span className="home-stat-label">필기 과목</span>
            </div>
            <div className="home-stat-item">
              <span className="home-stat-number">100</span>
              <span className="home-stat-label">문항</span>
            </div>
            <div className="home-stat-item">
              <span className="home-stat-number">100</span>
              <span className="home-stat-label">분 (필기시험)</span>
            </div>
            <div className="home-stat-item">
              <span className="home-stat-number">60</span>
              <span className="home-stat-label">점 (합격기준)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta-section">
        <div className="container">
          <div className="home-cta-content">
            <h2>지금 바로 시작하세요</h2>
            <p>무료 회원가입 후 기출문제와 모의시험을 무제한으로 이용하세요</p>
            <div className="home-cta-buttons">
              <Link to="/login" className="btn btn-primary btn-lg">
                <i className="fa-solid fa-rocket" /> 무료로 시작하기
              </Link>
              <Link to="/pilgi" className="btn btn-secondary btn-lg">
                <i className="fa-solid fa-play" /> 바로 학습하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <SEOHead />
      {user ? <LoggedInHome user={user} /> : <LandingHome />}
    </>
  );
}
