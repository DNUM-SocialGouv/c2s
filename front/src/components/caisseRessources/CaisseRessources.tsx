import React, { useContext, useEffect } from 'react';
import { Loader } from '../common/loader/Loader';
import { LoginContext } from '../../contexts/LoginContext';
import { PartenairesRessourcesHeader } from '../common/partenairesRessourcesHeader/PartenairesRessourcesHeader';
import { Separator } from '../common/svg/Seperator';
import { PartenairesReferentsList } from '../common/partenairesReferentsList/PartenairesReferentsList';
import { PartenaireRessourcesFiles } from '../common/partenaireRessourcesFiles/PartenaireRessourcesFiles';
import { useFetchPartenairesRessources } from '../../hooks/useFetchPartenairesRessources';
import { Alert } from '../common/alert/Alert';
import { PartenaireRessourcesContext } from '@/contexts/PartenaireRessourceContext';
import { partenaireRessourcesMapper } from '@/utils/PartenaireRessources.mapper';

export const CaisseRessources: React.FC = () => {
  const { isLogged } = useContext(LoginContext);
  const { setRessourcesFromAPI, setMappedRessources } = useContext(
    PartenaireRessourcesContext
  );
  const { loading, error, data } = useFetchPartenairesRessources();

  useEffect(() => {
    if (data) {
      setRessourcesFromAPI(data);
      setMappedRessources(partenaireRessourcesMapper(data));
    }
  }, [data, setMappedRessources, setRessourcesFromAPI]);

  return (
    <>
      {!isLogged || loading ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid" data-testid="caisseRessources">
          <PartenairesRessourcesHeader />
          {error && (
            <Alert
              label="Erreur"
              description="Une erreur est survenue lors de la récupération des ressources publiées."
              type="error"
            />
          )}
          <Separator />
          <PartenairesReferentsList />
          <Separator />
          <PartenaireRessourcesFiles />
        </div>
      )}
    </>
  );
};
