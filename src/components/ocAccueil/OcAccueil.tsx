import { OcAccueilTuiles } from './ocAccueilTuiles/OcAccueilTuiles';
import { OcAccueilCitation } from './ocAccueilCitation/OcAccueilCitation';
import { OcAccueilHeader } from './ocAccueilHeader/OcAccueilHeader';
import './ocAccueil.css';
import { Separator } from '../common/svg/Seperator';

export const OcAccueil = () => {
  return (
    <div className="fr-container--fluid">
      <OcAccueilHeader />
      <Separator />
      <OcAccueilCitation />
      <Separator />
      <OcAccueilTuiles />
      <Separator />
    </div>
  );
};
