import React, { useContext } from 'react';
import { Loader } from '../common/loader/Loader';
import { LoginContext } from '@/contexts/LoginContext';
import { PartenairesRessourcesHeader } from '../common/partenairesRessourcesHeader/PartenairesRessourcesHeader';
import { Separator } from '../common/svg/Seperator';
import { PartenairesReferentsList } from '../moderatorRessources/PartenairesReferentsList/PartenairesReferentsList';

export const CaisseRessources: React.FC = () => {
  const { isLogged } = useContext(LoginContext);

  return (
    <>
      {!isLogged ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid" data-testid="caisseRessources">
          <PartenairesRessourcesHeader />
          <Separator />
          <PartenairesReferentsList />
          <Separator />
        </div>
      )}
    </>
  );
};
