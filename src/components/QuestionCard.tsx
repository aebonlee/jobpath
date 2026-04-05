import BookmarkButton from './BookmarkButton';

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  showResult = false,
  showExplanation = false,
  questionIndex,
  isBookmarked,
  onToggleBookmark,
}) {
  const { question_text, option_1, option_2, option_3, option_4, correct_answer, explanation } = question;
  const options = [option_1, option_2, option_3, option_4];

  const getOptionClass = (optionIdx) => {
    const num = optionIdx + 1;
    let cls = 'option-item';
    if (selectedAnswer === num) cls += ' selected';
    if (showResult) {
      if (num === correct_answer) cls += ' correct';
      else if (selectedAnswer === num && num !== correct_answer) cls += ' wrong';
    }
    return cls;
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">Q{questionIndex + 1}</span>
        {onToggleBookmark && (
          <BookmarkButton
            isBookmarked={isBookmarked}
            onClick={() => onToggleBookmark(question.id)}
          />
        )}
      </div>
      <p className="question-text">{question_text}</p>
      <div className="options-list">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={getOptionClass(idx)}
            onClick={() => !showResult && onSelectAnswer?.(idx + 1)}
            disabled={showResult}
          >
            <span className="option-number">{idx + 1}</span>
            <span className="option-text">{option}</span>
            {showResult && (idx + 1) === correct_answer && (
              <i className="fa-solid fa-circle-check option-icon correct-icon" />
            )}
            {showResult && selectedAnswer === (idx + 1) && (idx + 1) !== correct_answer && (
              <i className="fa-solid fa-circle-xmark option-icon wrong-icon" />
            )}
          </button>
        ))}
      </div>
      {showExplanation && explanation && (
        <div className="explanation-box">
          <div className="explanation-header">
            <i className="fa-solid fa-lightbulb" /> 해설
          </div>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
