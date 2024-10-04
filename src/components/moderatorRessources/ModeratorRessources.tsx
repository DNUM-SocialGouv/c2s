import { LoginContext } from '@/contexts/LoginContext';
import { useContext } from 'react';
import { Separator } from '../common/svg/Seperator';
import { RessourcesHeader } from './ressourceHeader/RessourcesHeader';
import { RessourceForm } from './ressourcesForm/RessourcesForm';
import { Loader } from '../common/loader/Loader';
import { Filters } from './filters/Filters';

export const ModeratorRessources: React.FC = () => {
  const { isLogged } = useContext(LoginContext);
  return (
    <>
      {!isLogged ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid">
          <RessourcesHeader />
          <Filters thematiquesList={[]} />
          <Separator />
          <RessourceForm />
        </div>
      )}
    </>
  );
};
