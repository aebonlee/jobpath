import { useState, useCallback, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Timer from '../../components/Timer';
import QuestionCard from '../../components/QuestionCard';
import QuestionNav from '../../components/QuestionNav';
import Modal from '../../components/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { supabase, TABLES } from '../../lib/supabase';
import { calculatePilgiScore, checkPass } from '../../utils/scoring';
import { EXAM_CONFIG, SUBJECTS } from '../../config/site';
import SEOHead from '../../components/SEOHead';

export default function ExamMode() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [questions] = useState(location.state?.questions || []);
  const [session] = useState(location.state?.session || null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!questions.length) {
      navigate('/pilgi/select', { replace: true });
    }
  }, [questions, navigate]);

  const handleSelectAnswer = useCallback((questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleToggleBookmark = useCallback((questionId) => {
    setBookmarkedIds(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  }, []);

  const handleTimeUp = useCallback(() => {
    showToast('시간이 종료되었습니다. 자동 제출합니다.', 'info');
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const { subjectScores, totalScore, totalCorrect } = calculatePilgiScore(questions, answers);
    const { isPass } = checkPass(subjectScores, totalScore);

    const resultData = {
      score_total: totalScore,
      correct_count: totalCorrect,
      score_by_subject: subjectScores,
      is_pass: isPass,
      time_spent_sec: timeSpent,
      completed_at: new Date().toISOString(),
    };

    try {
      if (user && session && !String(session.id).startsWith('local_')) {
        await supabase
          .from(TABLES.EXAM_SESSIONS)
          .update(resultData)
          .eq('id', session.id);

        // Save individual answers
        const answerRows = questions.map(q => ({
          session_id: session.id,
          question_id: q.id,
          selected_answer: answers[q.id] || null,
          is_correct: answers[q.id] === q.correct_answer,
        }));
        await supabase.from(TABLES.EXAM_ANSWERS).insert(answerRows);

        // Update wrong answers
        const wrongQuestions = questions.filter(q => answers[q.id] && answers[q.id] !== q.correct_answer);
        for (const q of wrongQuestions) {
          const { data: existing } = await supabase
            .from(TABLES.WRONG_ANSWERS)
            .select('id, wrong_count')
            .eq('user_id', user.id)
            .eq('question_id', q.id)
            .single();

          if (existing) {
            await supabase.from(TABLES.WRONG_ANSWERS)
              .update({ wrong_count: existing.wrong_count + 1, resolved: false })
              .eq('id', existing.id);
          } else {
            await supabase.from(TABLES.WRONG_ANSWERS).insert({
              user_id: user.id,
              question_id: q.id,
              wrong_count: 1,
              resolved: false,
            });
          }
        }
      }

      navigate(`/pilgi/result/${session?.id || 'local'}`, {
        state: { questions, answers, session: { ...session, ...resultData }, subjectScores },
        replace: true,
      });
    } catch (err: any) {
      console.error(err);
      showToast('결과 저장에 실패했습니다.', 'error');
      // Navigate anyway
      navigate(`/pilgi/result/${session?.id || 'local'}`, {
        state: { questions, answers, session: { ...session, ...resultData }, subjectScores },
        replace: true,
      });
    }
    setSubmitting(false);
  };

  if (!questions.length) return null;

  const currentQuestion = questions[currentIndex];
  const currentSubject = SUBJECTS.find(s => s.id === currentQuestion?.subject_id);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="exam-container">
      <SEOHead title="필기 시험" />

      {/* Exam Header */}
      <div className="exam-header">
        <div className="exam-header-left">
          <div className="exam-subject-badge" style={{ background: `${currentSubject?.color}15`, color: currentSubject?.color, borderColor: currentSubject?.color }}>
            <i className={currentSubject?.icon} /> {currentSubject?.name}
          </div>
          <span className="exam-progress-text">{answeredCount} / {questions.length} 답변</span>
        </div>
        <Timer
          totalSeconds={EXAM_CONFIG.pilgi.timeLimit}
          onTimeUp={handleTimeUp}
          running={true}
        />
      </div>

      {/* Exam Body */}
      <div className="exam-body">
        <div className="exam-main">
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onSelectAnswer={(answer) => handleSelectAnswer(currentQuestion.id, answer)}
            questionIndex={currentIndex}
            isBookmarked={bookmarkedIds.includes(currentQuestion.id)}
            onToggleBookmark={handleToggleBookmark}
          />

          {/* Navigation */}
          <div className="exam-nav-buttons">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
            >
              <i className="fa-solid fa-chevron-left" /> 이전
            </button>

            <span className="exam-page-info">{currentIndex + 1} / {questions.length}</span>

            {currentIndex < questions.length - 1 ? (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              >
                다음 <i className="fa-solid fa-chevron-right" />
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowSubmitModal(true)}
              >
                <i className="fa-solid fa-paper-plane" /> 제출
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="exam-sidebar">
          <QuestionNav
            questions={questions}
            answers={answers}
            currentIndex={currentIndex}
            onNavigate={setCurrentIndex}
            bookmarkedIds={bookmarkedIds}
          />
          <button
            className="btn btn-primary"
            onClick={() => setShowSubmitModal(true)}
            style={{ width: '100%', marginTop: 16 }}
          >
            <i className="fa-solid fa-paper-plane" /> 시험 제출
          </button>
        </div>
      </div>

      {/* Submit Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="시험 제출"
        actions={
          <>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowSubmitModal(false)}>취소</button>
            <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={submitting}>
              {submitting ? '제출 중...' : '제출하기'}
            </button>
          </>
        }
      >
        <p>시험을 제출하시겠습니까?</p>
        <p style={{ marginTop: 8 }}>
          <strong>{answeredCount}</strong>문항 답변 완료 /
          <strong style={{ color: 'var(--color-wrong)' }}> {questions.length - answeredCount}</strong>문항 미답변
        </p>
      </Modal>
    </div>
  );
}
