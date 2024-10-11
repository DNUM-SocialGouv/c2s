import React, { useState } from 'react';
import { Thematique } from '../thematiquesForm/ThematiquesForm';
import '@/components/common/filters/Filters.css';
import { Search } from '@/components/common/svg/Search';
import { MODERATOR_RESOURCES_FILTERS } from '@/wording';

interface FiltersProps {
  thematiquesList: Thematique[];
}

export const Filters: React.FC<FiltersProps> = ({ thematiquesList }) => {
  const [thematique, setThematique] = useState('');

  const cible = ['Tout afficher', 'Organisme complémentaire', 'Caisse'];

  const handleThematiqueChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setThematique(event.target.value);
  };

  return (
    <div className="fr-grid-row filters flex items-center justify-between w-full">
      <div className="filters__filter">
        <div className="fr-input-group">
          <label className="fr-label" htmlFor="text-input-icon">
            Rechercher
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
        <div className="fr-select-group">
          <label className="fr-label" htmlFor="thematique">
            {MODERATOR_RESOURCES_FILTERS.thematique}
          </label>
          <select
            className="fr-select"
            id="thematique"
            name="thematique"
            onChange={(event) => handleThematiqueChange(event)}
            value={thematique}
          >
            <option value="Tout afficher">
              {' '}
              {MODERATOR_RESOURCES_FILTERS.displayAll}
            </option>
            {thematiquesList.length > 0 &&
              thematiquesList.map((item, index) => (
                <option key={index} value={item.titre}>
                  {item.titre}
                </option>
              ))}
          </select>
        </div>
      </div>
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
