import { LoginContext } from '@/contexts/LoginContext';
import { useContext, useEffect } from 'react';
import { Separator } from '../common/svg/Seperator';
import { RessourcesHeader } from './ressourceHeader/RessourcesHeader';
import { RessourceForm } from './ressourcesForm/RessourcesForm';
import { Loader } from '../common/loader/Loader';
import { Filters } from './filters/Filters';
import { ModeratorThematiqueFromAPI } from '@/domain/ModeratorRessources';
import { axiosInstance } from '@/RequestInterceptor';
import { ModeratorRessourcesContext } from '@/contexts/ModeratorRessourceContext';

export const ModeratorRessources: React.FC = () => {
  const { isLogged } = useContext(LoginContext);
  const { thematiques, setThematiques } = useContext(
    ModeratorRessourcesContext
  );

  useEffect(() => {
    const fetchThematiques = async () => {
      axiosInstance
        .get<ModeratorThematiqueFromAPI[]>('/moderateur/thematiques', {
          withCredentials: true,
        })
        .then((response) => {
          const thematiquesFromAPI = response.data;
          setThematiques(thematiquesFromAPI);
        });
    };

    fetchThematiques();
  }, [setThematiques]);

  return (
    <>
      {!isLogged ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid">
          <RessourcesHeader />
          <Filters thematiquesList={thematiques} />
          <Separator />
          <RessourceForm />
        </div>
      )}
    </>
  );
};
