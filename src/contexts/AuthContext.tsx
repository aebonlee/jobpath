import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, setSharedSession, getSharedSession, clearSharedSession, TABLES } from '../lib/supabase';
import { useToast } from './ToastContext';
import { useIdleTimeout } from '../hooks/useIdleTimeout';
import { SUPERADMIN_EMAILS } from '../config/admin';
import ProfileCompleteModal from '../components/ProfileCompleteModal';

import PaymentNudgePopup from '../components/PaymentNudgePopup';
const AuthContext = createContext({});

const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin;
const DISMISS_KEY = 'jp_profile_modal_dismissed';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [_userProfile, _setUserProfile] = useState<any>(null);
  const [_profileDismissed, _setProfileDismissed] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem(DISMISS_KEY) === '1'
  );
  const [_signingIn, _setSigningIn] = useState(false);
  const { showToast } = useToast();

  // user_profiles 프로필 로드 (프로필 완성 체크용)
  const _loadUserProfile = useCallback(async (uid: string) => {
    try {
      const { data } = await supabase.from('user_profiles').select('name,phone').eq('id', uid).maybeSingle();
      _setUserProfile(data);
    } catch { _setUserProfile(null); }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.refresh_token) setSharedSession(session.refresh_token);
      if (event === 'SIGNED_OUT') clearSharedSession();

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const email = (currentUser.email || currentUser.user_metadata?.email || '').toLowerCase();
        const name = currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || '';

        // 프로필 자동 생성/업데이트 (회원목록 정확성 보장)
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          try {
            await supabase.from(TABLES.PROFILES).upsert({
              id: currentUser.id,
              email,
              name: name || undefined,
              created_at: currentUser.created_at || new Date().toISOString(),
            }, {
              onConflict: 'id',
              ignoreDuplicates: false,
            });
          } catch (err) {
            console.warn('forjob_profiles upsert 실패:', err);
          }

          // user_profiles 이중 기록 (글로벌 회원 가시성)
          try {
            const upsertData: Record<string, unknown> = {
              id: currentUser.id,
              email,
              display_name: name || '',
              provider: currentUser.app_metadata?.provider || 'email',
              signup_domain: window.location.hostname,
              visited_sites: [window.location.hostname],
            };
            // OAuth에서 이름이 제공된 경우에만 name 설정 (기존 사용자 입력값 보존)
            if (name) upsertData.name = name;
            await supabase.from('user_profiles').upsert(upsertData, { onConflict: 'id' });
            await _loadUserProfile(currentUser.id);
          } catch (err) {
            console.warn('user_profiles upsert 실패:', err);
          }
        }

        // 최고관리자 이메일 fallback (DB 장애 시에도 접근 보장)
        const allEmails = [
          currentUser.email,
          currentUser.user_metadata?.email,
        ].filter(Boolean).map(e => (e as string).toLowerCase());
        const isSuperByEmail = allEmails.some(e => SUPERADMIN_EMAILS.includes(e));

        try {
          const { data } = await supabase
            .from(TABLES.PROFILES)
            .select('role')
            .eq('id', currentUser.id)
            .single();
          setIsAdmin(isSuperByEmail || data?.role === 'admin' || data?.role === 'superadmin');
        } catch {
          setIsAdmin(isSuperByEmail);
        }
      } else {
        setIsAdmin(false);
      }

      if (event === 'INITIAL_SESSION') {
        if (!currentUser) {
          const rt = getSharedSession();
          if (rt) {
            try {
              const { data } = await supabase.auth.refreshSession({ refresh_token: rt });
              if (!data.session) {
                clearSharedSession();
              } else {
                // refreshSession 성공 → TOKEN_REFRESHED 이벤트에서 loading 해제
                return;
              }
            } catch { clearSharedSession(); }
          }
        }
        setLoading(false);
      }
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setLoading(false);
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    // Fallback: 5초 타임아웃 (INITIAL_SESSION이 오지 않는 경우 방지)
    const fallback = setTimeout(() => {
      setLoading((prev) => {
        if (prev) console.warn('Auth: INITIAL_SESSION timeout, forcing loading=false');
        return false;
      });
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(fallback);
    };
  }, []);

  const signInWithGoogle = async () => {
    if (_signingIn) return;
    _setSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: SITE_URL },
      });
      if (error) {
        console.error('Google login error:', error.message);
        showToast('Google 로그인에 실패했습니다.', 'error');
        _setSigningIn(false);
      }
      // 성공 시 브라우저 redirect → 이후 코드 도달 불필요
    } catch (err: any) {
      console.error('Google login error:', err);
      showToast('Google 로그인에 실패했습니다.', 'error');
      _setSigningIn(false);
    }
  };

  const signInWithKakao = async () => {
    if (_signingIn) return;
    _setSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: SITE_URL,
          scopes: 'profile_nickname profile_image account_email',
        },
      });
      if (error) {
        console.error('Kakao login error:', error.message);
        showToast('카카오 로그인에 실패했습니다.', 'error');
        _setSigningIn(false);
      }
    } catch (err: any) {
      console.error('Kakao login error:', err);
      showToast('카카오 로그인에 실패했습니다.', 'error');
      _setSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      clearSharedSession();
      showToast('로그아웃되었습니다.', 'success');
    } catch (err: any) {
      console.error('Logout error:', err);
      // signOut 실패해도 로컬 상태 완전 정리 보장
      clearSharedSession();
      setUser(null);
      setIsAdmin(false);
      showToast('로그아웃되었습니다.', 'success');
    }
  };

  // 10분 무동작 세션 타임아웃
  useIdleTimeout({
    enabled: !!user,
    onTimeout: () => {
      supabase?.auth.signOut();
      clearSharedSession();
    },
  });

  const refreshProfile = useCallback(async () => {
    if (user) await _loadUserProfile(user.id);
  }, [user, _loadUserProfile]);
  const needsProfileCompletion = !!user && !!_userProfile && !_userProfile.name && !_profileDismissed;

  const dismissProfileModal = useCallback(() => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    _setProfileDismissed(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signingIn: _signingIn, signInWithGoogle, signInWithKakao, signOut }}>
      {children}
      {needsProfileCompletion && (
        <ProfileCompleteModal user={user} onComplete={refreshProfile} onDismiss={dismissProfileModal} />
      )}
    {!!user && !needsProfileCompletion && (
      <PaymentNudgePopup user={user} siteSlug="jobpath" />
    )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
