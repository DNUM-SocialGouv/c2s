import { OcAccueilTuiles } from './ocAccueilTuiles/OcAccueilTuiles';
import { OcAccueilCitation } from './ocAccueilCitation/OcAccueilCitation';
import { OcAccueilHeader } from './ocAccueilHeader/OcAccueilHeader';
import './OcAccueil.css';
import { Separator } from '../common/svg/Seperator';
import { OcAccueilLinks } from './ocAccueilLinks/OcAccueilLinks';
import { useEffect } from 'react';
import { axiosInstance } from '@/RequestInterceptor';
import { OcWelcomePageProvider } from '@/contexts/OcWelcomePageContext';

export const OcAccueil = () => {
  useEffect(() => {
    axiosInstance.get('/partenaire/welcome').then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <div className="fr-container--fluid">
      <OcWelcomePageProvider>
        <OcAccueilHeader />
        <Separator />
        <OcAccueilCitation content={''} updateDate={''} />
        <Separator />
        <OcAccueilTuiles />
        <OcAccueilLinks />
      </OcWelcomePageProvider>
    </div>
  );
};
