/**
 * PortOne V1 (iamport) 결제 유틸리티
 */

const IMP_CODE = import.meta.env.VITE_IMP_CODE || '';
const PG_PROVIDER = import.meta.env.VITE_PG_PROVIDER || '';

/** SDK 로드 대기 (최대 10초) */
function waitForIMP(timeout = 10000) {
  if (window.IMP) return Promise.resolve(window.IMP);
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = setInterval(() => {
      if (window.IMP) {
        clearInterval(check);
        resolve(window.IMP);
      } else if (Date.now() - start > timeout) {
        clearInterval(check);
        reject(new Error('PortOne SDK 로드 시간 초과'));
      }
    }, 200);
  });
}

export function initPortOne() {
  if (!window.IMP) {
    console.warn('PortOne SDK not loaded');
    return false;
  }
  if (!IMP_CODE) {
    console.warn('VITE_IMP_CODE not configured');
    return false;
  }
  window.IMP.init(IMP_CODE);
  return true;
}

/**
 * 결제 요청
 * @param {Object} params
 * @param {string} params.orderNumber - 주문번호
 * @param {string} params.name - 상품명
 * @param {number} params.amount - 결제금액
 * @param {string} params.buyerName - 구매자 이름
 * @param {string} params.buyerEmail - 구매자 이메일
 * @param {string} params.buyerTel - 구매자 전화번호
 * @param {'card'|'trans'} params.payMethod - 결제수단
 * @returns {Promise<{success: boolean, paymentId?: string, txId?: string, error?: string}>}
 */
export async function requestPayment({ orderNumber, name, amount, buyerName, buyerEmail, buyerTel, payMethod = 'card' }) {
  if (!IMP_CODE || !PG_PROVIDER) {
    // Demo mode
    console.log('[PortOne Demo]', { orderNumber, name, amount });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          paymentId: `demo_${Date.now()}`,
          txId: `demo_tx_${Date.now()}`,
        });
      }, 1000);
    });
  }

  // SDK 로드 대기
  let IMP;
  try {
    IMP = await waitForIMP();
  } catch {
    return { success: false, error: 'PortOne 결제 모듈을 불러오지 못했습니다. 페이지를 새로고침 해주세요.' };
  }

  IMP.init(IMP_CODE);

  return new Promise((resolve) => {
    IMP.request_pay(
      {
        pg: PG_PROVIDER,
        pay_method: payMethod,
        merchant_uid: orderNumber,
        name,
        amount,
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        buyer_tel: buyerTel,
      },
      (response) => {
        if (response.success) {
          resolve({
            success: true,
            paymentId: response.imp_uid,
            txId: response.merchant_uid,
          });
        } else {
          resolve({
            success: false,
            error: response.error_msg || '결제에 실패했습니다.',
          });
        }
      }
    );
  });
}
