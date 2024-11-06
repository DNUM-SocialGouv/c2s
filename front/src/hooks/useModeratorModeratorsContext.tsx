import { useContext } from 'react';
import { ModeratorModeratorsContext } from '@/contexts/ModeratorModeratorsContext';

export const useModeratorModeratorsContext = () => {
  const context = useContext(ModeratorModeratorsContext);
  if (!context) {
    throw new Error(
      'useModeratorModeratorsContext must be used within an ModeratorModeratorsContext.Provider'
    );
  }
  return context;
};
