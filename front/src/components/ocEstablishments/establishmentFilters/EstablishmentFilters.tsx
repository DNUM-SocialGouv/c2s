import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { axiosInstance } from '../../../RequestInterceptor';
import { OcEstablishmentContext } from '../../../contexts/OcEstablishmentContext';
import { Search } from '../../common/svg/Search';
import { OC_MES_ETABLISSEMENTS } from '../../../wording';

export const EstablishmentFilters: React.FC = () => {
  const {
    refetchEstablishments,
    siren,
    region,
    setRegion,
    departement,
    setDepartement,
    search,
    setSearch,
  } = useContext(OcEstablishmentContext) || {};

  const [regions, setRegions] = useState<{ value: string; label: string }[]>([
    {
      value: '',
      label: OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.selectRegion,
    },
  ]);
  const [departements, setDepartements] = useState<
    { value: string; label: string }[]
  >([
    {
      value: '',
      label: OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.selectDepartement,
    },
  ]);

  // Ref for the search input value
  const searchRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    if (!siren) return;
    await refetchEstablishments?.({
      siren,
      page: 0,
      size: 10,
      region: region || undefined,
      departement: departement || undefined,
      search: search || undefined,
    });
  }, [region, departement, siren, refetchEstablishments, search]);

  useEffect(() => {
    fetchData();
  }, [region, departement, siren, search, fetchData]);

  // Fetch regions
  useEffect(() => {
    if (!siren) return;
    const fetchRegions = async () => {
      try {
        const response = await axiosInstance.get<string[]>(
          `/oc/points-accueil/regions?siren=${siren}`
        );
        const regionOptions = response.data.map((region: string) => ({
          value: region,
          label: region,
        }));
        setRegions([
          {
            value: '',
            label: OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.selectRegion,
          },
          ...regionOptions,
        ]);
      } catch (error) {
        console.error(
          'Une erreur est survenue lors de la récupération des regions:',
          error
        );
      }
    };

    fetchRegions();
  }, [siren]);

  // Fetch departements
  useEffect(() => {
    if (!siren) return;
    const fetchDepartements = async () => {
      try {
        const response = await axiosInstance.get<string[]>(
          `/oc/points-accueil/departements?siren=${siren}`
        );
        const departementOptions = response.data.map((departement: string) => ({
          value: departement,
          label: departement,
        }));
        setDepartements([
          {
            value: '',
            label:
              OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.selectDepartement,
          },
          ...departementOptions,
        ]);
      } catch (error) {
        console.error(
          'Une erreur est survenue lors de la récupération des departements:',
          error
        );
      }
    };

    fetchDepartements();
  }, [siren]);

  return (
    <div className="fr-grid-row gap-x-8 mb-0" data-testid="filters">
      {/* Search Field */}
      <div className="filters__filter">
        <div className="fr-input-group">
          <label className="fr-label" htmlFor="search-input">
            {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.recherche}
          </label>
          <div className="fr-input-wrap search">
            <input
              className="fr-input"
              id="search-input"
              type="text"
              placeholder={
                OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.recherchePlaceholder
              }
              ref={searchRef} // Attach ref to the input
              aria-label="Search input"
            />
            <button
              className="fr-btn search__button"
              title="Search"
              onClick={() => {
                const newSearch = searchRef.current?.value || ''; // Read value from ref
                setSearch?.(newSearch); // Update the search state
              }}
            >
              <Search />
            </button>
          </div>
        </div>
      </div>

      {/* Region Select */}
      <div className="filters__filter">
        <div className="fr-select-group">
          <label
            className="fr-label"
            htmlFor="select-region"
            data-testid="region-select-label"
          >
            {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.region}
          </label>
          <select
            className="fr-select"
            id="select-region"
            name="select-region"
            onChange={(e) => {
              setRegion?.(e.target.value);
            }}
            value={region}
            aria-labelledby="region-select-label"
            data-testid="region-select"
          >
            {regions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Departement Select */}
      <div className="filters__filter">
        <div className="fr-select-group">
          <label
            className="fr-label"
            htmlFor="select-departement"
            data-testid="departement-select-label"
          >
            {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.departement}
          </label>
          <select
            className="fr-select"
            id="select-departement"
            name="select-departement"
            onChange={(e) => {
              setDepartement?.(e.target.value);
            }}
            value={departement}
            aria-labelledby="departement-select-label"
            data-testid="departement-select"
          >
            {departements.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentFilters;
