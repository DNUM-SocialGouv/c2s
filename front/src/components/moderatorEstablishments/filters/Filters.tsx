import { useEffect, useRef, useState } from 'react';
import { useModeratorEstablishmentsContext } from '../../../contexts/ModeratorEstablishmentsContext.tsx';
import {
  FiltersApiResponse,
} from '../../../domain/ModeratorEstablishments.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { COMMON, MODERATOR_ESTABLISHMENTS } from '../../../wording.ts';
import { Search } from '../../common/svg/Search.tsx';
import '../../common/filters/Filters.css';

const apiEndpoint = '/moderateur/etablissements/home';

export const Filters = () => {
  const {
    setSearchTerm,
    region,
    userSocieteData,
    establishements,
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
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userSocieteData?.societe && inputRef.current) {
      inputRef.current.value =
        userSocieteData.societe.trim().charAt(0).toUpperCase() +
        userSocieteData.societe.slice(1).toLowerCase();
      setSearchTerm(userSocieteData.sirenOrganisation);
    }
  }, [userSocieteData, setSearchTerm]);

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
  }, [ establishements]); //on ajoute "establishements" pour MAJ du nombre d'OC et de points d'accueil dans les filtres après une suppression notamment

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
