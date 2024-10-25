import { axiosInstance } from '@/RequestInterceptor';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useRef, useCallback } from 'react';

export const useLogoutUserAfterInactivity = (timeout: number) => {
  const { keycloak } = useKeycloak();

  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resetLogoutTimer = useCallback(() => {
    const logoutOptions = {};
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    logoutTimerRef.current = setTimeout(() => {
      console.info('User logged out due to inactivity');
      axiosInstance.post('/logout').then(() => {
        keycloak.logout(logoutOptions);
      });
    }, timeout);
  }, [timeout, keycloak]);

  const handleUserActivity = useCallback(() => {
    resetLogoutTimer();
  }, [resetLogoutTimer]);

  useEffect(() => {
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);

    resetLogoutTimer();

    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);

      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [timeout, handleUserActivity, resetLogoutTimer]);

  return resetLogoutTimer;
};
