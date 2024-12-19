import React, { useContext, useState } from 'react';
import { Search } from '../svg/Search';
import { COMMON } from '../../../wording';
import { PartenaireRessourcesContext } from '../../../contexts/PartenaireRessourceContext';
import { axiosInstance } from '../../../RequestInterceptor';
import { Alert } from '../alert/Alert';
import { PartenaireMappedThematique } from '../../../domain/RessourceFile';
import { partenaireRessourcesMapper } from '../../../utils/PartenaireRessources.mapper';

export const PartenaireFiltres: React.FC = () => {
  const { mappedRessources, setMappedRessources } = useContext(
    PartenaireRessourcesContext
  );
  const [selectedThematiqueTitle, setSelectedThematiqueTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

  const fetchPartenairesRessources = async () => {
    try {
      const response = await axiosInstance.get('/partenaire/ressources');
      const partenairesRessourcesFromAPI = response.data;
      const formattedRessources = partenaireRessourcesMapper(
        partenairesRessourcesFromAPI
      );
      setMappedRessources(formattedRessources);
    } catch (error) {
      setError(true);
    }
  };

  const handleThematiqueChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedThematiqueTitle(event.target.value);
    if (event.target.value === 'Tout afficher') {
      fetchPartenairesRessources();
    } else {
      setMappedRessources((prevMappedRessources) => ({
        ...prevMappedRessources,
        thematiques: mappedRessources.thematiques.filter(
          (thematique: PartenaireMappedThematique) =>
            thematique.titre === event.target.value
        ),
      }));
    }
  };
  return (
    <div className="fr-grid-row filters flex items-center justify-between w-full">
      <div className="filters__filter">
        {/* Recherche */}
        <div className="fr-input-group">
          <label className="fr-label" htmlFor="text-input-icon">
            {COMMON.rechercher}
          </label>
          <div className="fr-input-wrap fr-icon-alert-line search">
            <input
              className="fr-input"
              aria-describedby="text-input-icon-messages"
              id="text-input-icon"
              type="text"
              placeholder="Mots clés"
              aria-label="Search input"
              disabled
            />
            <button
              className="fr-btn search__button"
              title="Label bouton"
              onClick={() => console.log('search')}
              disabled
            >
              <Search />
            </button>
          </div>
          <div
            className="fr-messages-group"
            id="text-input-icon-messages"
            aria-live="assertive"
          ></div>
        </div>
      </div>
      <div className="filters__filter">
        {/* Thématique */}
        <div className="fr-select-group">
          <label className="fr-label" htmlFor="thematique">
            Thématique
          </label>
          <select
            className="fr-select"
            id="thematique"
            name="thematique"
            onChange={(event) => handleThematiqueChange(event)}
            value={selectedThematiqueTitle}
          >
            <option value="Tout afficher"> Tout afficher</option>
            {mappedRessources.thematiques.length > 0 &&
              mappedRessources.thematiques.map((item, index) => (
                <option key={index} value={item.titre}>
                  {item.titre}
                </option>
              ))}
          </select>
        </div>
      </div>
      {error && (
        <Alert
          label="Erreur"
          description="Une erreur est survenue lors de la récupération des données."
          type="error"
        />
      )}
    </div>
  );
};
