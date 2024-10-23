import { useContext } from 'react';
import { OcTeamContext } from '../contexts/OcTeamContext.tsx';

export const useOcTeam = () => {
  const context = useContext(OcTeamContext);
  if (!context) {
    throw new Error('useOcTeam must be used within an OcTeamProvider');
  }
  return context;
};
