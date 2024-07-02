import { EstablishmentBlock } from '@/components/moderatorEstablishments/establishmentBlock/estalishmentBlock';
import { useModeratorEstablishmentsContext } from '@/contexts/ModeratorEstablishmentsContext';
import { SectionTitle } from '@/components/common/sectionTitle/SectionTitle';

export const Establishments = () => {
  const { establishements } = useModeratorEstablishmentsContext();

  return (
    <div className="fr-container--fluid">
      <SectionTitle title="432 sièges et points d’accueil enregistrés" />
      Establishments:
      <ul className="list-none flex flex-wrap flex-col gap-y-6 ps-0 pe-0">
        {establishements.length > 0 &&
          establishements.map((establishement) => (
            <li key={establishement.nom}>
              <EstablishmentBlock establishment={establishement} />
            </li>
          ))}
      </ul>
    </div>
  );
};
