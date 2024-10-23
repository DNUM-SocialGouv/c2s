import { LoginContext } from '../../contexts/LoginContext.tsx';
import { useContext, useEffect } from 'react';
import { Separator } from '../common/svg/Seperator.tsx';
import { RessourcesHeader } from './ressourceHeader/RessourcesHeader.tsx';
import { RessourceForm } from './ressourcesForm/RessourcesForm.tsx';
import { Loader } from '../common/loader/Loader.tsx';
import { Filters } from './filters/Filters.tsx';
import { ModeratorThematiqueFromAPI } from '../../domain/ModeratorRessources.ts';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import { ModeratorRessourcesContext } from '../../contexts/ModeratorRessourceContext.tsx';

export const ModeratorRessources: React.FC = () => {
  const { isLogged } = useContext(LoginContext);
  const { setThematiques } = useContext(ModeratorRessourcesContext);

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
          <Filters />
          <Separator />
          <RessourceForm />
        </div>
      )}
    </>
  );
};
