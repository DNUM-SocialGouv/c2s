import { useContext } from 'react';
import { LoginContext } from '@/contexts/LoginContext';
import { AccueilHeader } from '../common/accueilHeader/AccueilHeader';
import { Loader } from '../common/loader/Loader';
import { Separator } from '../common/svg/Seperator';

export const ModeratorAccueil = () => {
  const { isLogged } = useContext(LoginContext);

  return (
    <>
      {!isLogged ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid" data-testid="CaisseAccueil">
          <AccueilHeader />
          <Separator />

          {/* <Separator />
              <AccueilCitation />
              <Separator />
              <AccueilLinks /> */}
        </div>
      )}
    </>
  );
};
