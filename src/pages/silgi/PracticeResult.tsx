import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

export default function PracticeResult() {
  return (
    <>
      <SEOHead title="실기 결과" />
      <div className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-chart-column" /> 실기 연습 결과</h1>
        </div>
      </div>
      <div className="container text-center" style={{ paddingBottom: 80 }}>
        <p style={{ color: 'var(--text-secondary)', marginTop: 40 }}>
          실기 시험은 자기 채점 방식입니다. 모범답안과 비교하여 학습하세요.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
          <Link to="/silgi" className="btn btn-primary">실기 홈</Link>
          <Link to="/silgi/terms" className="btn btn-secondary">핵심 용어</Link>
        </div>
      </div>
    </>
  );
}
