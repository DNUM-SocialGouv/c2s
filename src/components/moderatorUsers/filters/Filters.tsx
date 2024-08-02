import { useEffect, useRef } from 'react';
import { Search } from '@/components/common/svg/Search';
import { useUserContext } from '@/contexts/UserContext';
import { MODERATOR_USERS, COMMON } from '@/wording';
import { UserStatus } from '@/domain/ModerateurUsers';
import { OrganisationType } from '@/domain/Commons';
import '@/components/common/filters/Filters.css';

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
      if (inputRef.current.value !== searchTerm) {
        inputRef.current.value = '';
        setSearchTerm('');
      }
    }
  }, [statut, organisationType]);

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
            <option value={UserStatus.ToModerate}>
              {MODERATOR_USERS.toModerate}
            </option>
            <option value={UserStatus.Validated}>
              {MODERATOR_USERS.active}
            </option>
            <option value={UserStatus.Refused}>
              {MODERATOR_USERS.refused}
            </option>
            <option value={UserStatus.Unsubscribed}>
              {MODERATOR_USERS.inactive}
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
