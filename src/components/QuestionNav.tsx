export default function QuestionNav({ questions, answers, currentIndex, onNavigate, bookmarkedIds = [] }) {
  return (
    <div className="question-nav">
      <div className="question-nav-header">
        <span>문항 네비게이션</span>
        <span className="question-nav-count">
          {Object.keys(answers).length} / {questions.length}
        </span>
      </div>
      <div className="question-nav-grid">
        {questions.map((q, idx) => {
          let cls = 'question-nav-item';
          if (idx === currentIndex) cls += ' current';
          if (answers[q.id]) cls += ' answered';
          if (bookmarkedIds.includes(q.id)) cls += ' bookmarked';
          return (
            <button
              key={q.id}
              className={cls}
              onClick={() => onNavigate(idx)}
              title={`문항 ${idx + 1}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
      <div className="question-nav-legend">
        <span className="legend-item"><span className="legend-dot current" /> 현재</span>
        <span className="legend-item"><span className="legend-dot answered" /> 답변</span>
        <span className="legend-item"><span className="legend-dot bookmarked" /> 북마크</span>
        <span className="legend-item"><span className="legend-dot" /> 미답변</span>
      </div>
    </div>
  );
}
