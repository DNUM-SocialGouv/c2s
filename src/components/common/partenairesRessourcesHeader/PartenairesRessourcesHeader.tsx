import React, { useState } from 'react';
import { Ressources } from '../svg/Ressources';
import { Alert } from '../alert/Alert';
import { COMMON, PARTENAIRES_RESSOURCES } from '@/wording';
import { Search } from '../svg/Search';

export const PartenairesRessourcesHeader: React.FC = () => {
  const [error] = useState<string>('');

  return (
    <>
      <header className="header flex flex-col md:flex-row justify-start items-start md:items-center">
        <div className="md:mr-6">
          <Ressources />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col">
            <h2 className="mb-0 mt-4 ressources__header--font-size">
              {PARTENAIRES_RESSOURCES.title}
            </h2>
            <p className="txt-chapo mb-0">Mise à jour le 5 décembre 2023</p>
          </div>
        </div>
      </header>
      {/* TODO: à mutualiser avec ressources modérateur */}
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
              value={'Thématique 1'}
              disabled
            >
              <option value="Tout afficher"> Tout afficher</option>
              {/* {thematiques.length > 0 &&
                thematiques.map((item, index) => (
                  <option key={index} value={item.titre}>
                    {item.titre}
                  </option>
                ))} */}
            </select>
          </div>
        </div>
      </div>
      {error !== '' && (
        <Alert
          label="Erreur"
          description="Une erreur est survenue lors de la récupération des ressources publiées."
          type="error"
        />
      )}
    </>
  );
};
