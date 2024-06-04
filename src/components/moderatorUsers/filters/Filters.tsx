import { Search } from '@/components/common/svg/Search';
import './Filters.css';

export const Filters: React.FC = () => {
  return (
    <div className="fr-grid-row filters">
      <div className="filters__filter">
        <div className="fr-select-group">
          {' '}
          <label className="fr-label" htmlFor="select">
            Statut
          </label>{' '}
          <select className="fr-select" id="select" name="select">
            {' '}
            <option value="" selected disabled hidden>
              Sélectionner un statut
            </option>{' '}
            <option value="1">Option 1</option>{' '}
            <option value="2">Option 2</option>{' '}
            <option value="3">Option 3</option>{' '}
            <option value="4">Option 4</option>{' '}
          </select>
        </div>
      </div>
      <div className="filters__filter">
        <div className="fr-select-group">
          {' '}
          <label className="fr-label" htmlFor="select">
            Type d’organisation
          </label>{' '}
          <select className="fr-select" id="select" name="select">
            {' '}
            <option value="" selected disabled hidden>
              Sélectionner un type d'organisation
            </option>{' '}
            <option value="1">Option 1</option>{' '}
            <option value="2">Option 2</option>{' '}
            <option value="3">Option 3</option>{' '}
            <option value="4">Option 4</option>{' '}
          </select>
        </div>
      </div>
      <div className="filters__filter">
        <div className="fr-input-group">
          <label className="fr-label" htmlFor="text-input-icon">
            Recherche
          </label>
          <div className="fr-input-wrap fr-icon-alert-line search">
            <input
              className="fr-input"
              aria-describedby="text-input-icon-messages"
              id="text-input-icon"
              type="text"
              placeholder="Mots clés"
            />
            <button className="fr-btn search__button" title="Label bouton">
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
    </div>
  );
};
