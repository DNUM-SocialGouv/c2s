import React, { useContext } from 'react';
import { Loader } from '../common/loader/Loader';
import { LoginContext } from '@/contexts/LoginContext';
import { PartenairesRessourcesHeader } from '../common/partenairesRessourcesHeader/PartenairesRessourcesHeader';

export const OcRessources: React.FC = () => {
  const { isLogged } = useContext(LoginContext);

  return (
    <>
      {!isLogged ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid" data-testid="ocRessources">
          <PartenairesRessourcesHeader />
        </div>
      )}
    </>
  );
};
