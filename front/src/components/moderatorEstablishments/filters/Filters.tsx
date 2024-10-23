import { useEffect, useRef, useState } from 'react';
import { Search } from '../../common/svg/Search.tsx';
import { useModeratorEstablishmentsContext } from '../../../contexts/ModeratorEstablishmentsContext.tsx';
import { COMMON, MODERATOR_ESTABLISHMENTS } from '../../../wording.ts';
import {
  // EstablishmentType,
  // establissementTypes,
  FiltersApiResponse,
} from '../../../domain/ModeratorEstablishments.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
// import { stringToConstantCase } from '@/utils/stringToConstantCase';
import '../../common/filters/Filters.css';

const apiEndpoint = '/moderateur/etablissements/home';

export const Filters = () => {
  const {
    setSearchTerm,
    // establishmentType,
    // setEstablishmentType,
    region,
    setRegion,
    departement,
    setDepartement,
    setActiveOC,
    setPointsAccueilCount,
  } = useModeratorEstablishmentsContext();
  const [availableRegions, setAvailableRegions] = useState<string[]>([]);
  const [availableDepartements, setAvailableDepartements] = useState<string[]>(
    []
  );
  // const [availableEstablishmentTypes, setAvailableEstablishmentTypes] =
  //   useState<establissementTypes>({});
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    axiosInstance
      .get<FiltersApiResponse>(apiEndpoint, {
        withCredentials: true,
        signal: newAbortController.signal,
      })
      .then((response) => {
        setActiveOC(response.data.ocActifsCount);
        setPointsAccueilCount(response.data.pointsAccueilCount);
        setAvailableRegions(response.data.regions);
        setAvailableDepartements(response.data.departements);
        // setAvailableEstablishmentTypes(response.data.etablissementTypes);
      })
      .catch((error) => {
        // FIXME: abort controller est inutile ici.
        // On utilise Axios. On peut utiliser AxiosError.
        if (error.name === 'AbortError') {
          console.log('Request was aborted');
        } else {
          console.error('Error fetching data:', error);
        }
      });

    return () => {
      newAbortController.abort();
    };
  }, []); //FIXME: add dependencies

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

  // const handleEstablishmentTypeChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setEstablishmentType(event.target.value as EstablishmentType);
  // };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value);
  };

  const handleDepartementChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDepartement(event.target.value);
  };

  return (
    <div className="fr-grid-row filters" data-testid="establishements-filters">
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
      {/* {Object.keys(availableEstablishmentTypes).length > 0 && (
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
              {Object.entries(availableEstablishmentTypes).map(
                ([key, value]) => (
                  <option key={key} value={stringToConstantCase(value)}>
                    {value}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      )} */}

      {availableRegions.length > 0 && (
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
              <option value="">{COMMON.allBis}</option>
              {availableRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {availableDepartements.length > 0 && (
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
              <option value="">{COMMON.all}</option>
              {availableDepartements.map((departement) => (
                <option key={departement} value={departement}>
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
