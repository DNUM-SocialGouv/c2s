import { EtablishmentSvg } from '../../../assets/EtablishmentSvg.tsx';
import { OC_MES_ETABLISSEMENTS } from '../../../wording.ts';

interface EtablissementTabHeaderProps {
  updateDate: string;
}

export const EtablissementTabHeader: React.FC<EtablissementTabHeaderProps> = ({
  updateDate,
}) => {
  return (
    <header className="flex items-center justify-center">
      <EtablishmentSvg />
      <div className="ml-4">
        <h2 className="mb-0">{OC_MES_ETABLISSEMENTS.title}</h2>
        <p className="mb-0">
          {OC_MES_ETABLISSEMENTS.updateDate} {updateDate}
        </p>
      </div>
    </header>
  );
};
