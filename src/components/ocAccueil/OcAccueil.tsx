import { OcAccueilTuiles } from './ocAccueilTuiles/OcAccueilTuiles';
import { OcAccueilCitation } from './ocAccueilCitation/OcAccueilCitation';
import { OcAccueilHeader } from './ocAccueilHeader/OcAccueilHeader';
import './OcAccueil.css';
import { Separator } from '../common/svg/Seperator';
import { OcAccueilLinks } from './ocAccueilLinks/OcAccueilLinks';
import { useContext, useEffect } from 'react';
import { axiosInstance } from '@/RequestInterceptor';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';
import { WelcomeAPIResponse } from '@/domain/OcAccueil';
import { LoginContext } from '@/contexts/LoginContext';
import { Loader } from '../common/loader/Loader';

export const OcAccueil = () => {
  const context = useContext(OcWelcomePageContext);
  const { isLogged } = useContext(LoginContext);

  useEffect(() => {
    if (isLogged) {
      axiosInstance
        .get<WelcomeAPIResponse>('/partenaire/welcome')
        .then((response) => {
          const message = ocWelcomeMessageMapper(response.data.messageAccueil);
          context.setMessage(message);
          context.setLinks(response.data.ressourceFiles);
        });
    }
    // Suite au renommage de OcLoginContext en LoginContext,
    // inclure le context dans le tableau de dépendances du useEffect,
    // Entraine une boucle infinie/erreur.
    // Afin de corriger cela, il est nécessaire de supprimer le context du tableau de dépendances.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return (
    <>
      {!isLogged ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid" data-testid="ocAccueil">
          <OcAccueilHeader />
          <Separator />
          <OcAccueilCitation />
          <Separator />
          <OcAccueilTuiles />
          <OcAccueilLinks />
        </div>
      )}
    </>
  );
};
