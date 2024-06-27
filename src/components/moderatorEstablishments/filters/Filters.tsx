import { useRef } from 'react';
import { Search } from '@/components/common/svg/Search';
import { useModeratorEstablishmentsContext } from '@/contexts/ModeratorEstablishmentsContext';
import { normalizeString } from '@/utils/normalizeString';
import { COMMON, MODERATOR_ESTABLISHMENTS } from '@/wording';
import { EstablishmentType } from '@/domain/ModeratorEstablishments';
import '@/components/common/filters/Filters.css';

interface FiltersProps {
  regionsList: string[];
  departementsList: string[];
}

//recherche / type d'etablissement / région / Département
export const Filters = ({ regionsList, departementsList }: FiltersProps) => {
  const {
    setSearchTerm,
    establishmentType,
    setEstablishmentType,
    region,
    setRegion,
    departement,
    setDepartement,
  } = useModeratorEstablishmentsContext();

  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleEstablishmentTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEstablishmentType(event.target.value as EstablishmentType);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value);
  };

  const handleDepartementChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDepartement(event.target.value);
  };

  return (
    <div className="fr-grid-row filters" data-testid="filters">
      <div className="filters__filter">
        <div className="fr-input-group">
          <label className="fr-label" htmlFor="text-input-icon">
            {MODERATOR_ESTABLISHMENTS.search}
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
      <div className="filters__filter">
        <div className="fr-select-group">
          <label className="fr-label" htmlFor="select-establishment-type">
            {MODERATOR_ESTABLISHMENTS.establishmentType}
          </label>
          <select
            className="fr-select"
            id="select-establishment-type"
            name="select-establishment-type"
            onChange={handleEstablishmentTypeChange}
            defaultValue={establishmentType}
            aria-labelledby="organisation-select-label"
            data-testid="organisation-select"
          >
            <option disabled={true} value="">
              {COMMON.all}
            </option>
            <option value="ORGANISME_COMPLEMENTAIRE">{COMMON.oc}</option>
            <option value="CAISSE">{COMMON.caisseShortened}</option>
          </select>
        </div>
      </div>
      {regionsList.length > 0 && (
        <div className="filters__filter">
          <div className="fr-select-group">
            <label className="fr-label" htmlFor="select-region">
              {MODERATOR_ESTABLISHMENTS.region}
            </label>
            <select
              className="fr-select"
              id="select-region"
              name="select-region"
              onChange={handleRegionChange}
              defaultValue={region}
              aria-labelledby="region-select-label"
              data-testid="region-select"
            >
              <option disabled={true} value="">
                {MODERATOR_ESTABLISHMENTS.chooseRegion}
              </option>
              {regionsList.map((region) => (
                <option key={region} value={normalizeString(region)}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {departementsList.length > 0 && (
        <div className="filters__filter">
          <div className="fr-select-group">
            <label className="fr-label" htmlFor="select-departement">
              {MODERATOR_ESTABLISHMENTS.departement}
            </label>
            <select
              className="fr-select"
              id="select-departement"
              name="select-departement"
              onChange={handleDepartementChange}
              defaultValue={departement}
              aria-labelledby="departement-select-label"
              data-testid="departement-select"
            >
              <option disabled={true} value="">
                {MODERATOR_ESTABLISHMENTS.chooseDepartement}
              </option>
              {departementsList.map((departement) => (
                <option key={departement} value={normalizeString(departement)}>
                  {departement}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
