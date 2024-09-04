import { OcAccueilTuiles } from './ocAccueilTuiles/OcAccueilTuiles';
import { OcAccueilCitation } from './ocAccueilCitation/OcAccueilCitation';
import { OcAccueilHeader } from './ocAccueilHeader/OcAccueilHeader';
import './OcAccueil.css';
import { Separator } from '../common/svg/Seperator';
import { OcAccueilLinks } from './ocAccueilLinks/OcAccueilLinks';
import { useContext, useEffect, useState } from 'react';
import { axiosInstance } from '@/RequestInterceptor';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';
import { WelcomeAPIResponse } from '@/domain/OcAccueil';
import { OcLoginContext } from '@/contexts/OCLoginContext';
import { Loader } from '../common/loader/Loader';

export const OcAccueil = () => {
  const [isLoading, setIsloading] = useState<boolean>(true);

  const context = useContext(OcWelcomePageContext);
  const { isLogged } = useContext(OcLoginContext);

  useEffect(() => {
    if (isLogged) {
      axiosInstance
        .get<WelcomeAPIResponse>('/partenaire/welcome')
        .then((response) => {
          const message = ocWelcomeMessageMapper(response.data.messageAccueil);
          context!.setMessage(message);
          context.setLinks(response.data.ressourceFiles);
        })
        .then(() => setIsloading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isLogged]);

  return (
    <>
      {!isLogged && isLoading ? (
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
