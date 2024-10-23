import { OcAccueilTuiles } from './ocAccueilTuiles/OcAccueilTuiles.tsx';
import { AccueilCitation } from '../common/accueilCitation/AccueilCitation.tsx';
import { Separator } from '../common/svg/Seperator.tsx';
import { AccueilLinks } from '../common/accueilLinks/AccueilLinks.tsx';
import { useContext, useEffect } from 'react';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import { OcWelcomePageContext } from '../../contexts/OcWelcomeContext.tsx';
import { ocWelcomeMessageMapper } from '../../utils/ocWelcomeMessage.mapper.ts';
import { WelcomeAPIResponse } from '../../domain/OcAccueil.ts';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { Loader } from '../common/loader/Loader.tsx';
import { AccueilHeader } from '../common/accueilHeader/AccueilHeader.tsx';

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
          <AccueilHeader />
          <Separator />
          <AccueilCitation />
          <Separator />
          <OcAccueilTuiles />
          <AccueilLinks />
        </div>
      )}
    </>
  );
};
