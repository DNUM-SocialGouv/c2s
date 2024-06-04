import { Avatar } from '@/components/common/svg/Avatar';
import { Community } from '@/components/common/svg/Community';
import { Hospital } from '@/components/common/svg/Hospital';
import { Tuile } from '@/components/common/tuile/Tuile';
import { OC_ACCUEIL_TUILES_WORDING } from '../OcAccueilWording';

export const OcAccueilTuiles = () => {
  return (
    <div className="fr-grid-row tuile__body--content">
      <Tuile
        title={OC_ACCUEIL_TUILES_WORDING.informations.titre}
        detail={OC_ACCUEIL_TUILES_WORDING.informations.detail}
      >
        <Avatar />
      </Tuile>
      <Tuile
        title={OC_ACCUEIL_TUILES_WORDING.etablissement.titre}
        detail={OC_ACCUEIL_TUILES_WORDING.etablissement.detail}
      >
        <Hospital />
      </Tuile>
      <Tuile
        title={OC_ACCUEIL_TUILES_WORDING.equipe.titre}
        detail={OC_ACCUEIL_TUILES_WORDING.equipe.detail}
      >
        <Community />
      </Tuile>
    </div>
  );
};
