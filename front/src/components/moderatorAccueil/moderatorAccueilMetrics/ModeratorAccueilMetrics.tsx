import { Tuile } from '../../../components/common/tuile/Tuile';
import { MODERATEUR_ACCUEIL } from '../../../wording';
import { ModeratorAccueilMetricsTypes } from '../../../domain/ModerateurAccueil';

interface ModeratorAccueilMetricsProps {
  metrics: ModeratorAccueilMetricsTypes;
}

export const ModeratorAccueilMetrics = ({
  metrics,
}: ModeratorAccueilMetricsProps) => {
  const { membresActifCount, organisationsActifCount, pointAccueilActifCount } =
    metrics;

  return (
    <div className="fr-grid-row tuile__body--content">
      <Tuile
        badge={MODERATEUR_ACCUEIL.tileUsers}
        title={MODERATEUR_ACCUEIL.countActiveUsers(membresActifCount)}
        tabId={'2'}
      ></Tuile>
      <Tuile
        badge={MODERATEUR_ACCUEIL.tileOrganisations}
        title={MODERATEUR_ACCUEIL.countActiveOrganisations(
          organisationsActifCount
        )}
        tabId={'3'}
      ></Tuile>
      <Tuile
        badge={MODERATEUR_ACCUEIL.tilePointsAccueil}
        title={MODERATEUR_ACCUEIL.countActiveEstablishments(
          pointAccueilActifCount
        )}
        tabId={'3'}
      ></Tuile>
    </div>
  );
};
