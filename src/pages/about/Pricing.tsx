import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { PLANS } from '../../config/site';

const FEATURES_LIST = [
  '시험안내 열람',
  '서비스 소개 열람',
  '필기 CBT 1회 체험',
  '필기 CBT 무제한',
  '실기 연습',
  '과목별 학습',
  '학습 요약',
  '대시보드·분석',
  '오답노트',
  '북마크',
  '합격 예측',
];

const FREE_ACCESS = [true, true, true, false, false, false, false, false, false, false, false];
const PAID_ACCESS = [true, true, true, true, true, true, true, true, true, true, true];

const PLAN_FEATURES = [
  '필기 CBT 모의시험 무제한',
  '실기 주관식 연습',
  '5과목 이론 학습',
  '학습 요약 노트',
  '대시보드 & 성적 분석',
  '합격 예측 AI',
  '오답노트 & 북마크',
];

function formatPrice(price: number) {
  return price.toLocaleString('ko-KR');
}

export default function Pricing() {
  return (
    <>
      <SEOHead title="요금제" description="JobPath 이용권 요금제 안내" />

      <div className="about-hero">
        <div className="container">
          <h1><i className="fa-solid fa-tags" /> 요금제</h1>
          <p>합리적인 가격으로 직업상담사 2급 시험을 준비하세요</p>
        </div>
      </div>

      <div className="container">
        <div className="pricing-grid">
          {PLANS.map(plan => (
            <div key={plan.id} className={`pricing-card${plan.recommended ? ' pricing-card--recommended' : ''}`}>
              <h3>{plan.label}</h3>
              <p className="pricing-period">{plan.days ? `${plan.days}일간 이용` : '기간 제한 없음'}</p>
              <div className="pricing-price">{formatPrice(plan.price)}원</div>
              <p className="pricing-price-sub">
                {plan.days ? `일 ${Math.round(plan.price / plan.days).toLocaleString()}원` : '한 번 결제로 평생'}
              </p>
              <ul className="pricing-features">
                {PLAN_FEATURES.map((f, i) => (
                  <li key={i}><i className="fa-solid fa-check" /> {f}</li>
                ))}
              </ul>
              <Link to="/checkout" className={`btn btn-block ${plan.recommended ? 'btn-primary' : 'btn-secondary'}`}>
                구매하기
              </Link>
            </div>
          ))}
        </div>

        <div className="pricing-compare">
          <h2>기능 비교</h2>
          <table>
            <thead>
              <tr>
                <th>기능</th>
                <th>무료</th>
                <th>유료 이용권</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES_LIST.map((f, i) => (
                <tr key={i}>
                  <td>{f}</td>
                  <td>{FREE_ACCESS[i] ? <i className="fa-solid fa-check check" /> : <i className="fa-solid fa-xmark cross" />}</td>
                  <td>{PAID_ACCESS[i] ? <i className="fa-solid fa-check check" /> : <i className="fa-solid fa-xmark cross" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="guide-faq">
          <h2><i className="fa-solid fa-circle-question" /> 결제 FAQ</h2>
          <div className="faq-item">
            <h4><i className="fa-solid fa-q" /> 결제 수단은 무엇인가요?</h4>
            <p>신용카드(KG이니시스) 결제를 지원합니다.</p>
          </div>
          <div className="faq-item">
            <h4><i className="fa-solid fa-q" /> 이용 기간은 언제부터 시작되나요?</h4>
            <p>결제 완료 시점부터 시작됩니다. 평생 이용권은 기한 제한이 없습니다.</p>
          </div>
          <div className="faq-item">
            <h4><i className="fa-solid fa-q" /> 환불 규정은 어떻게 되나요?</h4>
            <p>결제 후 7일 이내, 유료 콘텐츠 이용 이력이 없는 경우 전액 환불 가능합니다.</p>
          </div>
          <div className="faq-item">
            <h4><i className="fa-solid fa-q" /> 여러 기기에서 사용 가능한가요?</h4>
            <p>네, 동일 계정으로 로그인하면 PC, 태블릿, 모바일 어디서든 이용 가능합니다.</p>
          </div>
        </div>
      </div>
    </>
  );
}
