import { EtablishmentSvg } from '@/assets/EtablishmentSvg';
import { OC_MES_ETABLISSEMENTS } from '@/wording';

interface EtablissementTabHeaderProps {
  updateDate: string;
}

export const EtablissementTabHeader: React.FC<EtablissementTabHeaderProps> = ({
  updateDate,
}) => {
  return (
    <div className="flex items-center">
      <EtablishmentSvg />
      <div className="ml-4">
        <h2 className="mb-0">{OC_MES_ETABLISSEMENTS.title}</h2>
        <p>
          {OC_MES_ETABLISSEMENTS.updateDate} {updateDate}
        </p>
      </div>
    </div>
  );
};
