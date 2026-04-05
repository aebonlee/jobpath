import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { supabase, TABLES } from '../../lib/supabase';

export default function ExamSelect() {
  const [examYear, setExamYear] = useState('random');
  const [examSession, setExamSession] = useState('random');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const years = [2024, 2023, 2022, 2021, 2020, 2019];
  const sessions = [1, 2, 3];

  const handleStart = async () => {
    setLoading(true);
    try {
      let query = supabase.from(TABLES.QUESTIONS).select('*');

      if (examYear !== 'random') {
        query = query.eq('exam_year', parseInt(examYear));
      }
      if (examSession !== 'random') {
        query = query.eq('exam_session', parseInt(examSession));
      }

      query = query.order('subject_id').order('question_number');

      const { data: questions, error } = await query;

      if (error) throw error;

      if (!questions?.length) {
        showToast('해당 조건의 문제가 없습니다. 랜덤으로 시작합니다.', 'info');
        const { data: allQuestions } = await supabase
          .from(TABLES.QUESTIONS)
          .select('*')
          .order('subject_id')
          .order('question_number')
          .limit(100);

        if (!allQuestions?.length) {
          showToast('등록된 문제가 없습니다.', 'error');
          setLoading(false);
          return;
        }

        // Create session
        const session = await createSession(allQuestions, null, null);
        navigate(`/pilgi/exam/${session.id}`, { state: { questions: allQuestions, session } });
        return;
      }

      // Limit to 100 questions
      const limitedQuestions = questions.slice(0, 100);
      const session = await createSession(
        limitedQuestions,
        examYear !== 'random' ? parseInt(examYear) : null,
        examSession !== 'random' ? parseInt(examSession) : null,
      );
      navigate(`/pilgi/exam/${session.id}`, { state: { questions: limitedQuestions, session } });
    } catch (err: any) {
      console.error(err);
      showToast('시험 시작에 실패했습니다.', 'error');
    }
    setLoading(false);
  };

  const createSession = async (questions, year, session) => {
    const sessionData = {
      user_id: user?.id || null,
      exam_type: 'pilgi',
      mode: 'exam',
      exam_year: year,
      total_questions: questions.length,
      correct_count: 0,
      score_total: 0,
      is_pass: false,
      time_spent_sec: 0,
      started_at: new Date().toISOString(),
    };

    if (!user) {
      return { id: `local_${Date.now()}`, ...sessionData };
    }

    const { data, error } = await supabase
      .from(TABLES.EXAM_SESSIONS)
      .insert(sessionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return (
    <>
      <SEOHead title="시험 선택" />
      <div className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-list-check" /> 시험 선택</h1>
          <p className="page-desc">연도와 회차를 선택하거나 랜덤으로 시험을 시작하세요</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="exam-select-card">
          <div className="form-group">
            <label className="form-label">출제 연도</label>
            <select className="form-select" value={examYear} onChange={e => setExamYear(e.target.value)}>
              <option value="random">랜덤 (전체 연도)</option>
              {years.map(y => (
                <option key={y} value={y}>{y}년</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">회차</label>
            <select className="form-select" value={examSession} onChange={e => setExamSession(e.target.value)}>
              <option value="random">랜덤 (전체 회차)</option>
              {sessions.map(s => (
                <option key={s} value={s}>{s}회</option>
              ))}
            </select>
          </div>

          <div className="exam-select-info">
            <p><i className="fa-solid fa-circle-info" /> 총 100문항 (5과목 x 20문항), 제한시간 150분</p>
            <p><i className="fa-solid fa-check" /> 평균 60점 이상 + 과목당 40점 이상 합격</p>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleStart}
            disabled={loading}
            style={{ width: '100%', marginTop: 24 }}
          >
            {loading ? (
              <><div className="loading-spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> 시작 중...</>
            ) : (
              <><i className="fa-solid fa-play" /> 시험 시작</>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
