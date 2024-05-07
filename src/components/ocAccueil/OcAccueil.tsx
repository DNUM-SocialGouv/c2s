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

interface Thematique {
  ressourceThematiqueId: number;
  titre: string;
  description: string;
  cible: string;
  ordre: number;
  publique: boolean;
}

interface RessourceFile {
  ressourceFichierId: number;
  thematique: Thematique;
  repertoire: string;
  nom: string;
  taille: number;
  extension: string;
  dateCrea: string;
  dateMaj: string;
  type: string;
}

interface WelcomeAPIResponse {
  messageAccueil: {
    messageAccueilId: number;
    contenu: string;
    cible: string;
    dateCrea: string;
    dateMaj: string;
  };
  ressourceFiles: RessourceFile[];
}

export const OcAccueil = () => {
  const [isLoading, setIsloading] = useState<boolean>(true);

  const context = useContext(OcWelcomePageContext);

  useEffect(() => {
    axiosInstance
      .get<WelcomeAPIResponse>('/partenaire/welcome')
      .then((response) => {
        const message = ocWelcomeMessageMapper(response.data.messageAccueil);
        context!.setMessage(message);
        context.setLinks(response.data.ressourceFiles);
      })
      .then(() => setIsloading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="fr-container--fluid">
      <OcAccueilHeader />
      <Separator />
      <OcAccueilCitation />
      <Separator />
      <OcAccueilTuiles />
      <OcAccueilLinks />
    </div>
  );
};
