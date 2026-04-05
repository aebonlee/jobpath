import { supabase, TABLES } from '../lib/supabase';

/**
 * 구독(이용권) 상태 확인 유틸리티
 */

/**
 * 현재 유효한 구독 조회
 * @param {string} userId
 * @returns {Promise<{hasAccess: boolean, subscription: object|null, expiresAt: Date|null}>}
 */
export async function checkSubscription(userId) {
  if (!userId) return { hasAccess: false, subscription: null, expiresAt: null };

  const { data, error } = await supabase
    .from(TABLES.ORDERS)
    .select('*')
    .eq('user_id', userId)
    .eq('payment_status', 'paid')
    .order('paid_at', { ascending: false });

  if (error || !data?.length) {
    return { hasAccess: false, subscription: null, expiresAt: null };
  }

  // 평생 이용권 확인
  const lifetime = data.find(o => o.plan_type === 'lifetime');
  if (lifetime) {
    return { hasAccess: true, subscription: lifetime, expiresAt: null };
  }

  // 기간제 이용권 확인 (가장 늦게 만료되는 것)
  const now = new Date();
  const active = data
    .filter(o => o.expires_at && new Date(o.expires_at) > now)
    .sort((a, b) => new Date(b.expires_at) - new Date(a.expires_at));

  if (active.length > 0) {
    return {
      hasAccess: true,
      subscription: active[0],
      expiresAt: new Date(active[0].expires_at),
    };
  }

  return { hasAccess: false, subscription: null, expiresAt: null };
}

/**
 * 무료 체험 횟수 확인
 * @param {string} userId
 * @returns {Promise<number>} 사용한 무료 체험 횟수
 */
export async function getUsedFreeTrials(userId) {
  if (!userId) return 0;

  const { count, error } = await supabase
    .from(TABLES.EXAM_SESSIONS)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('exam_type', 'pilgi')
    .not('completed_at', 'is', null);

  if (error) return 0;
  return count || 0;
}

/**
 * 무료 체험 가능 여부 확인
 * @param {string} userId
 * @returns {Promise<{canTrial: boolean, usedCount: number}>}
 */
export async function checkFreeTrial(userId) {
  const usedCount = await getUsedFreeTrials(userId);
  return { canTrial: usedCount < 1, usedCount };
}

/**
 * 만료 임박 여부 (7일 이내)
 * @param {Date|null} expiresAt
 * @returns {boolean}
 */
export function isExpiringSoon(expiresAt) {
  if (!expiresAt) return false;
  const diff = new Date(expiresAt) - new Date();
  return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
}
