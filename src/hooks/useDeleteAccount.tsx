import { useContext } from 'react';
import { AccountContext } from '@/contexts/AccountContext.tsx';

export function useDeleteAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useDeleteAccount must be used within an AccountProvider');
  }
  return context;
}
