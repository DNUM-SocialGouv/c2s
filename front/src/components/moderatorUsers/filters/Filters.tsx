import { useEffect, useRef } from 'react';
import { Search } from '../../common/svg/Search.tsx';
import { useUserContext } from '../../../contexts/UserContext.tsx';
import { MODERATOR_USERS, COMMON } from '../../../wording.ts';
import { UserStatus } from '../../../domain/ModerateurUsers.ts';
import { OrganisationType } from '../../../domain/Commons.ts';
import '../../common/filters/Filters.css';

export const Filters = () => {
  const {
    statut,
    setStatut,
    organisationType,
    setOrganisationType,
    searchTerm,
    setSearchTerm,
  } = useUserContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      if (searchTerm) {
        inputRef.current.value = searchTerm;
      } else {
        inputRef.current.value = '';
      }
    }
  }, [statut, organisationType, searchTerm, setSearchTerm]);

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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchTerm((event.target as HTMLInputElement).value || '');
    }
  };

  return (
    <div className="fr-grid-row filters" data-testid="filters">
      <div className="filters__filter">
        <div className="fr-select-group">
          <label className="fr-label" htmlFor="select-statut">
            {MODERATOR_USERS.statut}
          </label>
          <select
            className="fr-select"
            id="select-statut"
            name="select-statut"
            onChange={handleStatusChange}
            value={statut}
            aria-labelledby="status-select-label"
            data-testid="status-select"
          >
            <option disabled={true} value="">
              {MODERATOR_USERS.selectStatut}
            </option>
            <option value={UserStatus.AModerer}>
              {MODERATOR_USERS.aModerer}
            </option>
            <option value={UserStatus.Valide}>{MODERATOR_USERS.valides}</option>
            <option value={UserStatus.Refuse}>{MODERATOR_USERS.refuses}</option>
            <option value={UserStatus.Desinscrit}>
              {MODERATOR_USERS.desinscrit}
            </option>
          </select>
        </div>
      </div>
      <div className="filters__filter">
        <div className="fr-select-group">
          <label className="fr-label" htmlFor="select-organisation">
            {MODERATOR_USERS.organisationType}
          </label>
          <select
            className="fr-select"
            id="select-organisation"
            name="select-organisation"
            onChange={handleOrganizationTypeChange}
            defaultValue={organisationType}
            aria-labelledby="organisation-select-label"
            data-testid="organisation-select"
          >
            <option disabled={true} value="">
              {MODERATOR_USERS.selectStatutOrganisationType}
            </option>
            <option value="ORGANISME_COMPLEMENTAIRE">{COMMON.oc}</option>
            <option value="CAISSE">{COMMON.caisseShortened}</option>
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
              onKeyDown={handleKeyPress}
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
