import { LoginContext } from '../../contexts/LoginContext.tsx';
import { useContext } from 'react';
import { Separator } from '../common/svg/Seperator.tsx';
import { RessourcesHeader } from './ressourceHeader/RessourcesHeader.tsx';
import { RessourceForm } from './ressourcesForm/RessourcesForm.tsx';
import { Loader } from '../common/loader/Loader.tsx';
import { Filters } from './filters/Filters.tsx';
import { useFetchModeratorRessources } from '../../hooks/useFetchModeratorRessources.tsx';
import { PartenairesReferentsList } from '../common/partenairesReferentsList/PartenairesReferentsList';

export const ModeratorRessources: React.FC = () => {
  const { isLogged } = useContext(LoginContext);
  useFetchModeratorRessources();

  return (
    <>
      {!isLogged ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid">
          <RessourcesHeader />
          <Filters />
          <Separator />
          <PartenairesReferentsList profile="moderateur" />
          <Separator />
          <RessourceForm />
        </div>
      )}
    </>
  );
};
