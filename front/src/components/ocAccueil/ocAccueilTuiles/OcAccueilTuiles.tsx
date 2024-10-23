import { Avatar } from '../../common/svg/Avatar.tsx';
import { Community } from '../../common/svg/Community.tsx';
import { Hospital } from '../../common/svg/Hospital.tsx';
import { Tuile } from '../../common/tuile/Tuile.tsx';
import { OC_ACCUEIL_TUILES_WORDING } from '../../../wording.ts';

export const OcAccueilTuiles = () => {
  return (
    <div className="fr-grid-row tuile__body--content">
      <Tuile
        title={OC_ACCUEIL_TUILES_WORDING.informations.titre}
        detail={OC_ACCUEIL_TUILES_WORDING.informations.detail}
        tabId={'3'}
      >
        <Avatar />
      </Tuile>
      <Tuile
        title={OC_ACCUEIL_TUILES_WORDING.etablissement.titre}
        detail={OC_ACCUEIL_TUILES_WORDING.etablissement.detail}
        tabId={'4'}
      >
        <Hospital />
      </Tuile>
      <Tuile
        title={OC_ACCUEIL_TUILES_WORDING.equipe.titre}
        detail={OC_ACCUEIL_TUILES_WORDING.equipe.detail}
        tabId={'5'}
      >
        <Community />
      </Tuile>
    </div>
  );
};
