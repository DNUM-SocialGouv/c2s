import { useContext } from 'react';
import { EstablishmentContext } from '@/contexts/EstablishmentContext.tsx';

export function useDeletePA() {
  const context = useContext(EstablishmentContext);
  if (!context) {
    throw new Error('useDeleteAccount must be used within an id PA');
  }
  return context;
}
