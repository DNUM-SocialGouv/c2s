import { useModeratorEstablishmentsContext } from '@/contexts/ModeratorEstablishmentsContext';
import { SectionTitle } from '@/components/common/sectionTitle/SectionTitle';

export const Establishments = () => {
  const { establishements } = useModeratorEstablishmentsContext();

  return (
    <div className="fr-container--fluid">
      <SectionTitle title="432 sièges et points d’accueil enregistrés" />
      Establishments:
      {establishements.length &&
        establishements.map((establishment) => establishment.name)}
    </div>
  );
};
