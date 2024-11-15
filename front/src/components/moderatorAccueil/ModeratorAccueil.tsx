import { useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../../RequestInterceptor';
import { LoginContext } from '../../contexts/LoginContext';
import { AccueilHeader } from '../common/accueilHeader/AccueilHeader';
import { Loader } from '../common/loader/Loader';
import { Separator } from '../common/svg/Seperator';
import { Tuile } from '../../components/common/tuile/Tuile';
import { MembreInfoSvg } from '../../assets/MembreInfoSvg';
import { MODERATEUR_ACCUEIL } from '../../wording';
import { SectionTitle } from '../../components/common/sectionTitle/SectionTitle';
import { ModeratorAccueilMetrics } from '../../components/moderatorAccueil/moderatorAccueilMetrics/ModeratorAccueilMetrics';
import type { ModeratorAccueilMetricsTypes } from '../../domain/ModerateurAccueil';

const ENDPOINT = '/moderateur/welcome';

export const ModeratorAccueil = () => {
  const { isLogged } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);
  const [accueilMetrics, setAccueilMetrics] =
    useState<ModeratorAccueilMetricsTypes>({
      membresAModerer: [],
      membresActifCount: 0,
      organisationsActifCount: 0,
      pointAccueilActifCount: 0,
    });

  const fetchMetrics = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(ENDPOINT);
      setAccueilMetrics(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLogged) {
      fetchMetrics();
    }
  }, [isLogged]);

  if (!isLogged || isLoading) {
    return <Loader />;
  }

  return (
    <div className="fr-container--fluid" data-testid="CaisseAccueil">
      <AccueilHeader />
      <Separator className="mb-4" />
      <Tuile
        title={MODERATEUR_ACCUEIL.newMembersNumber(
          accueilMetrics.membresAModerer.length
        )}
        tabId={'2'}
        arrow={true}
        variant="full-width"
        badge={MODERATEUR_ACCUEIL.badge}
      >
        <MembreInfoSvg />
      </Tuile>
      <Separator />
      <SectionTitle title={MODERATEUR_ACCUEIL.figuresTitle} />
      <ModeratorAccueilMetrics metrics={accueilMetrics} />
    </div>
  );
};
