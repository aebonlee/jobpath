import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

export default function SilgiHome() {
  return (
    <>
      <SEOHead title="실기 시험" description="직업상담사 2급 실기 시험 준비" />
      <div className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-file-pen" /> 실기 시험</h1>
          <p className="page-desc">직업상담 실무 - 주관식/서술형, 150분, 60점 이상 합격</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="pilgi-modes">
          <Link to="/silgi/practice" className="pilgi-mode-card">
            <div className="pilgi-mode-icon study">
              <i className="fa-solid fa-pen" />
            </div>
            <h3>서술형 연습</h3>
            <p>주관식/서술형 문제를 풀고 모범답안과 비교하세요</p>
            <span className="pilgi-mode-badge">모범답안 비교</span>
          </Link>

          <Link to="/silgi/past" className="pilgi-mode-card">
            <div className="pilgi-mode-icon exam">
              <i className="fa-solid fa-scroll" />
            </div>
            <h3>기출문제 해설</h3>
            <p>회차별 기출문제와 상세 해설을 확인하세요</p>
            <span className="pilgi-mode-badge">해설 포함</span>
          </Link>

          <Link to="/silgi/frequent" className="pilgi-mode-card">
            <div className="pilgi-mode-icon study">
              <i className="fa-solid fa-fire" />
            </div>
            <h3>5개년 빈출 정리</h3>
            <p>2019~2023 5개년 빈출 기출문제 177문항 상세 해설</p>
            <span className="pilgi-mode-badge">177문항</span>
          </Link>

          <Link to="/silgi/terms" className="pilgi-mode-card">
            <div className="pilgi-mode-icon exam">
              <i className="fa-solid fa-book" />
            </div>
            <h3>핵심 용어</h3>
            <p>실기 시험에 자주 출제되는 핵심 용어를 학습하세요</p>
            <span className="pilgi-mode-badge">핵심 정리</span>
          </Link>
        </div>

        <div className="silgi-info mt-4">
          <h3>실기 시험 안내</h3>
          <ul>
            <li>과목: 직업상담 실무</li>
            <li>문제 유형: 주관식 (단답형, 서술형, 계산형)</li>
            <li>시험 시간: 150분</li>
            <li>합격 기준: 100점 만점 중 60점 이상</li>
          </ul>
        </div>
      </div>
    </>
  );
}
