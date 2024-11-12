import { OcEtablissementsContext } from '@/contexts/OcEtablissementsContext.tsx';
import { useContext } from 'react';
import { EtablishmentSvg } from '../../../assets/EtablishmentSvg.tsx';
import { OC_MES_ETABLISSEMENTS } from '../../../wording.ts';

export const EtablissementTabHeader: React.FC = () => {
  const { siegeData } = useContext(OcEtablissementsContext);
  return (
    <header className="flex items-center">
      <EtablishmentSvg />
      <div className="ml-4">
        <h2 className="mb-0">{OC_MES_ETABLISSEMENTS.title}</h2>
        <p>
          {OC_MES_ETABLISSEMENTS.updateDate} {siegeData.dateMaj}
        </p>
      </div>
    </header>
  );
};
