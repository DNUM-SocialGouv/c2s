import { OcAccueilTuiles } from './ocAccueilTuiles/OcAccueilTuiles';
import { OcAccueilCitation } from './ocAccueilCitation/OcAccueilCitation';
import { OcAccueilHeader } from './ocAccueilHeader/OcAccueilHeader';
import './OcAccueil.css';
import { Separator } from '../common/svg/Seperator';
import { OcAccueilLinks } from './ocAccueilLinks/OcAccueilLinks';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/RequestInterceptor';
// import { OcWelcomePageProvider } from '@/contexts/OcWelcomePageContext';

interface Thematique {
  id: number;
  titre: string;
  description: string;
  cible: string;
  ordre: number;
  publique: boolean;
}

interface RessourceFile {
  id: number;
  thematique: Thematique;
  repertoire: string | null;
  nom: string;
  taille: number;
  extension: string;
  dateCrea: string;
  dateMaj: string;
  type: string;
}

interface WelcomeAPIResponse {
  messageAccueil: {
    id: number;
    contenu: string;
    cible: string;
    dateCrea: string;
    dateMaj: string;
  };
  ressourceFiles: RessourceFile[];
}

export const OcAccueil = () => {
  const [welcomeData, setWelcomeData] = useState<WelcomeAPIResponse | null>(
    null
  );

  useEffect(() => {
    axiosInstance
      .get<WelcomeAPIResponse>('/partenaire/welcome')
      .then((response) => {
        setWelcomeData(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="fr-container--fluid">
      {/* <OcWelcomePageProvider> */}
      <OcAccueilHeader />
      <Separator />
      <OcAccueilCitation content={''} updateDate={''} />
      <Separator />
      <OcAccueilTuiles />
      {welcomeData && (
        <OcAccueilLinks
          downloadLinks={welcomeData.ressourceFiles.map(
            (file: RessourceFile) => ({
              fileName: file.nom,
              fileType: file.extension,
              fileUrl: '',
              fileWeight: file.taille,
            })
          )}
        />
      )}
      {/* </OcWelcomePageProvider> */}
    </div>
  );
};
