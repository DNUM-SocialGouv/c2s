import React, { useContext, useState } from 'react';
import { Thematique } from '../thematiquesForm/ThematiquesForm';
import '@/components/common/filters/Filters.css';
import { Search } from '@/components/common/svg/Search';
import { COMMON, MODERATOR_RESOURCES_FILTERS } from '@/wording';
import { ModeratorRessourcesContext } from '@/contexts/ModeratorRessourceContext';
import { ModeratorThematiqueFromAPI } from '@/domain/ModeratorRessources';
import { axiosInstance } from '@/RequestInterceptor';

export const Filters: React.FC = () => {
  const [selectedThematiqueTitle, setSelectedThematiqueTitle] = useState('');
  const cible = ['Tout afficher', 'Organisme complémentaire', 'Caisse'];

  const { thematiques, setThematiques } = useContext(
    ModeratorRessourcesContext
  );

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

  const handleThematiqueChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedThematiqueTitle(event.target.value);
    if (event.target.value === 'Tout afficher') {
      fetchThematiques();
    } else {
      setThematiques(
        thematiques.filter(
          (thematique: Thematique) => thematique.titre === event.target.value
        )
      );
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
            {MODERATOR_RESOURCES_FILTERS.thematique}
          </label>
          <select
            className="fr-select"
            id="thematique"
            name="thematique"
            onChange={(event) => handleThematiqueChange(event)}
            value={selectedThematiqueTitle}
          >
            <option value="Tout afficher">
              {' '}
              {MODERATOR_RESOURCES_FILTERS.displayAll}
            </option>
            {thematiques.length > 0 &&
              thematiques.map((item, index) => (
                <option key={index} value={item.titre}>
                  {item.titre}
                </option>
              ))}
          </select>
        </div>
      </div>
      {/* Cible */}
      <div className="filters__filter">
        <div className="fr-select-group">
          <label className="fr-label" htmlFor="public">
            {MODERATOR_RESOURCES_FILTERS.public}
          </label>
          <select
            className="fr-select"
            id="public"
            name="public"
            value=""
            disabled
          >
            {cible.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
