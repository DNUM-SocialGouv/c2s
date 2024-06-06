import { useRef } from 'react';
import { Search } from '@/components/common/svg/Search';
import { useUserContext } from '@/contexts/UserContext';
import { MODERATOR_USERS } from '@/wording';
import { OrganisationType } from '@/domain/ModerateurUsers';
import './Filters.css';

export const Filters = () => {
  const {
    statut,
    setStatut,
    organisationType,
    setOrganisationType,
    setSearchTerm,
  } = useUserContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatut(event.target.value);
  };

  const handleOrganizationTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrganisationType(event.target.value as OrganisationType);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      setSearchTerm(inputRef.current.value || '');
    }
  };

  return (
    <div className="fr-grid-row filters">
      <div className="filters__filter">
        <div className="fr-select-group">
          {' '}
          <label className="fr-label" htmlFor="select-statut">
            {MODERATOR_USERS.statut}
          </label>{' '}
          <select
            className="fr-select"
            id="select-statut"
            name="select-statut"
            onChange={handleStatusChange}
            value={statut}
            aria-labelledby="status-select-label"
          >
            {' '}
            <option disabled={true} value="">
              {MODERATOR_USERS.selectStatut}
            </option>
            <option value="2">A modérer</option>{' '}
            <option value="1">Actifs</option> <option value="5">Refusés</option>{' '}
            <option value="4">Inactifs</option>{' '}
          </select>
        </div>
      </div>
      <div className="filters__filter">
        <div className="fr-select-group">
          {' '}
          <label className="fr-label" htmlFor="select-organisation">
            {MODERATOR_USERS.organisationType}
          </label>{' '}
          <select
            className="fr-select"
            id="select-organisation"
            name="select-organisation"
            onChange={handleOrganizationTypeChange}
            defaultValue={organisationType}
            aria-labelledby="organisation-select-label"
          >
            {' '}
            <option disabled={true} value="">
              {MODERATOR_USERS.selectStatutOrganisationType}
            </option>
            <option value="OC">Organisme complémentaire</option>{' '}
            <option value="CAISSE">Caisse</option>{' '}
          </select>
        </div>
      </div>
      <div className="filters__filter">
        <div className="fr-input-group">
          <label className="fr-label" htmlFor="text-input-icon">
            {MODERATOR_USERS.search}
          </label>
          <div className="fr-input-wrap fr-icon-alert-line search">
            <input
              className="fr-input"
              aria-describedby="text-input-icon-messages"
              id="text-input-icon"
              type="text"
              placeholder="Mots clés"
              ref={inputRef}
              aria-label="Search input"
            />
            <button
              className="fr-btn search__button"
              title="Label bouton"
              onClick={handleButtonClick}
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
    </div>
  );
};
