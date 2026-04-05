import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { supabase, TABLES } from '../../lib/supabase';
import { useToast } from '../../contexts/ToastContext';

export default function PracticeMode() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from(TABLES.SILGI_QUESTIONS)
      .select('*')
      .order('exam_year', { ascending: false })
      .order('question_number')
      .limit(20)
      .then(({ data, error }) => {
        if (error) {
          showToast('문제를 불러오지 못했습니다.', 'error');
        }
        setQuestions(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-page" style={{ paddingTop: 'var(--nav-height)' }}><div className="loading-spinner" /></div>;
  }

  if (!questions.length) {
    return (
      <>
        <SEOHead title="실기 연습" />
        <div className="page-header">
          <div className="container">
            <h1><i className="fa-solid fa-pen" /> 실기 연습</h1>
          </div>
        </div>
        <div className="container text-center mt-4" style={{ paddingBottom: 80 }}>
          <p style={{ color: 'var(--text-secondary)' }}>등록된 실기 문제가 없습니다.</p>
        </div>
      </>
    );
  }

  const question = questions[currentIndex];
  const keywords = question.keywords || [];

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setUserAnswer('');
    setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1));
  };

  const matchedKeywords = keywords.filter(kw =>
    userAnswer.toLowerCase().includes(kw.toLowerCase())
  );

  return (
    <>
      <SEOHead title="실기 연습" />
      <div className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-pen" /> 실기 연습</h1>
          <p className="page-desc">답안을 작성하고 모범답안과 비교하세요</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="practice-container">
          <div className="practice-question-header">
            <span className="question-number">Q{currentIndex + 1}</span>
            <span className="practice-type-badge">{question.question_type === 'short' ? '단답형' : question.question_type === 'essay' ? '서술형' : '계산형'}</span>
            {question.max_points && <span className="practice-points">{question.max_points}점</span>}
          </div>

          <p className="question-text">{question.question_text}</p>

          <div className="practice-answer-section">
            <label className="form-label">답안 작성</label>
            <textarea
              className="form-textarea answer-textarea"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="답안을 작성하세요..."
              rows={6}
              disabled={showAnswer}
            />
          </div>

          {!showAnswer ? (
            <button className="btn btn-primary" onClick={handleShowAnswer} style={{ width: '100%' }}>
              <i className="fa-solid fa-eye" /> 모범답안 확인
            </button>
          ) : (
            <>
              <div className="model-answer">
                <h4><i className="fa-solid fa-star" /> 모범답안</h4>
                <p>{question.model_answer}</p>
              </div>

              {keywords.length > 0 && (
                <div className="keyword-analysis">
                  <h4><i className="fa-solid fa-key" /> 키워드 매칭</h4>
                  <div className="keyword-list">
                    {keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className={`keyword-tag ${matchedKeywords.includes(kw) ? 'keyword-match' : 'keyword-miss'}`}
                      >
                        {matchedKeywords.includes(kw) ? <i className="fa-solid fa-check" /> : <i className="fa-solid fa-xmark" />}
                        {kw}
                      </span>
                    ))}
                  </div>
                  <p className="keyword-result">
                    {matchedKeywords.length} / {keywords.length} 키워드 일치
                  </p>
                </div>
              )}

              <div className="exam-nav-buttons mt-3">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => { setShowAnswer(false); setUserAnswer(''); setCurrentIndex(prev => Math.max(0, prev - 1)); }}
                  disabled={currentIndex === 0}
                >
                  <i className="fa-solid fa-chevron-left" /> 이전
                </button>
                <span className="exam-page-info">{currentIndex + 1} / {questions.length}</span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleNext}
                  disabled={currentIndex >= questions.length - 1}
                >
                  다음 <i className="fa-solid fa-chevron-right" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
