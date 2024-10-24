import { Tuile } from '@/components/common/tuile/Tuile';
import { MODERATEUR_ACCUEIL } from '@/wording';
import { ModeratorAccueilMetricsTypes } from '@/domain/ModerateurAccueil';

interface ModeratorAccueilMetricsProps {
  metrics: ModeratorAccueilMetricsTypes;
}

export const ModeratorAccueilMetrics = ({
  metrics,
}: ModeratorAccueilMetricsProps) => {
  const { membresActifCount, membresActifEvoPercent, organisationsActifCount } =
    metrics;

  return (
    <div className="fr-grid-row tuile__body--content">
      <Tuile
        badge={MODERATEUR_ACCUEIL.tileUsers}
        title={MODERATEUR_ACCUEIL.countActiveUsers(metrics.membresActifCount)}
        detail={
          metrics.membresActifEvoPercent
            ? MODERATEUR_ACCUEIL.pastMonthDifference(membresActifCount)
            : undefined
        }
        tabId={'2'}
      ></Tuile>
      <Tuile
        badge={MODERATEUR_ACCUEIL.tileOrganisations}
        title={
          metrics.organisationsActifCount
            ? MODERATEUR_ACCUEIL.countActiveOrganisations(
                membresActifEvoPercent
              )
            : undefined
        }
        detail={MODERATEUR_ACCUEIL.pastMonthDifference(2)}
        tabId={'3'}
      ></Tuile>
      <Tuile
        badge={MODERATEUR_ACCUEIL.tilePointsAccueil}
        title={
          metrics.pointAccueilActifCount
            ? MODERATEUR_ACCUEIL.countActiveEstablishments(
                organisationsActifCount
              )
            : undefined
        }
        detail={MODERATEUR_ACCUEIL.pastMonthDifference(5)}
        tabId={'3'}
      ></Tuile>
    </div>
  );
};
