import { useContext } from 'react';
import { LoginContext } from '@/contexts/LoginContext';
import { AccueilHeader } from '../common/accueilHeader/AccueilHeader';
import { Loader } from '../common/loader/Loader';
import { Separator } from '../common/svg/Seperator';
import { Tuile } from '@/components/common/tuile/Tuile';
import { MembreInfoSvg } from '@/assets/MembreInfoSvg';
import { MODERATEUR_ACCUEIL } from '@/wording';

export const ModeratorAccueil = () => {
  const { isLogged } = useContext(LoginContext);

  return (
    <>
      {!isLogged ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid" data-testid="CaisseAccueil">
          <AccueilHeader />
          <Separator className="mb-4" />
          <Tuile
            title={MODERATEUR_ACCUEIL.newMembesNumber(2)}
            tabId={'3'}
            arrow={true}
            variant="full-width"
            badge={MODERATEUR_ACCUEIL.badge}
          >
            <MembreInfoSvg />
          </Tuile>
          {/* <Separator />
              <AccueilCitation />
              <Separator />
              <AccueilLinks /> */}
        </div>
      )}
    </>
  );
};
