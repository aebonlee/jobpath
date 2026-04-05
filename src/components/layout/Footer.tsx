import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" aria-label="사이트 푸터">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="brand-main">For</span>
              <span className="brand-sub">Job</span>
            </div>
            <p className="footer-description">
              직업상담사 2급 시험 준비를 위한 CBT 학습 플랫폼.<br />
              기출문제 풀이, 모의시험, 오답노트로 합격을 준비하세요.
            </p>
          </div>

          <div className="footer-links">
            <h4>학습 메뉴</h4>
            <ul className="footer-link-list">
              <li><Link to="/pilgi">필기 시험</Link></li>
              <li><Link to="/silgi">실기 시험</Link></li>
              <li><Link to="/dashboard">대시보드</Link></li>
              <li><Link to="/bookmarks">북마크</Link></li>
              <li><Link to="/wrong-answers">오답노트</Link></li>
              <li><Link to="/info">시험 안내</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>문의</h4>
            <p className="footer-email">
              <span className="footer-email-icon">{'\u2709\uFE0F'}</span>
              <a href="mailto:aebon@dreamitbiz.com">aebon@dreamitbiz.com</a>
            </p>
            <p>010-3700-0629</p>
            <p className="business-hours">평일 09:00 - 18:00</p>

            <div className="footer-family">
              <select
                defaultValue=""
                aria-label="패밀리 사이트"
                onChange={(e) => {
                  if (e.target.value) window.open(e.target.value, '_blank');
                  e.target.value = '';
                }}
              >
                <option value="" disabled>Family Site</option>
                <option value="https://www.dreamitbiz.com">DreamIT Biz</option>
                <option value="https://teaching.dreamitbiz.com">Teaching AI</option>
                <option value="https://competency.dreamitbiz.com">NCS 역량평가</option>
              </select>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 DreamIT Biz. All rights reserved.</p>
          <p className="footer-bottom-info">
            Designed by Ph.D Aebon Lee | 대표이사: 이애본 | 사업자등록번호: 601-45-20154
          </p>
        </div>
      </div>
    </footer>
  );
}
