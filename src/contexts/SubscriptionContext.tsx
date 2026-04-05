import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { checkSubscription, checkFreeTrial, isExpiringSoon } from '../utils/subscription';

interface SubscriptionState {
  hasAccess: boolean;
  subscription: any | null;
  expiresAt: Date | null;
  expiringSoon: boolean;
  freeTrialRemaining: number;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionState | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [freeTrialRemaining, setFreeTrialRemaining] = useState(1);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setHasAccess(false);
      setSubscription(null);
      setExpiresAt(null);
      setFreeTrialRemaining(1);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [subResult, trialResult] = await Promise.all([
        checkSubscription(user.id),
        checkFreeTrial(user.id),
      ]);

      setHasAccess(subResult.hasAccess);
      setSubscription(subResult.subscription);
      setExpiresAt(subResult.expiresAt);
      setFreeTrialRemaining(trialResult.canTrial ? 1 : 0);
    } catch (err) {
      console.error('Subscription check error:', err);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const expiringSoon = isExpiringSoon(expiresAt);

  return (
    <SubscriptionContext.Provider value={{
      hasAccess, subscription, expiresAt, expiringSoon,
      freeTrialRemaining, loading, refresh,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider');
  return ctx;
}
