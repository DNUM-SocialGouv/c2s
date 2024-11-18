import { OcEtablissementsContext } from '@/contexts/ocEtablissementsTab/OcEtablissementsContext';
import {
  fetchDepartementData,
  fetchPaginatedPointAccueilList,
  fetchRegionData,
} from '@/utils/OcEtablissements.query';
import { COMMON, OC_MES_ETABLISSEMENTS } from '@/wording';
import { useContext, useEffect, useState } from 'react';
import { POINTS_ACCUEIL_PER_PAGE } from '../Contants';
import { Search } from '@/components/common/svg/Search';

export const FiltresOcEtablissment = ({
  currentPage,
}: {
  currentPage: number;
}) => {
  const { setCount, setPointsAccueilData, siegeData, filters, setFilters } =
    useContext(OcEtablissementsContext);

  const [siren, setSiren] = useState('');
  const [regionList, setRegionList] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [departementList, setDepartementList] = useState<string[]>([]);

  useEffect(() => {
    if (siegeData.locSiren !== '') {
      setSiren(siegeData.locSiren);
      fetchRegionData(siegeData.locSiren).then((regions) => {
        setRegionList(regions);
      });
    }
  }, [siegeData.locSiren]);

  useEffect(() => {
    if (selectedRegion !== '') {
      fetchDepartementData(siren, selectedRegion).then((departements) => {
        setDepartementList(departements);
      });
    }

    if (selectedRegion === '') {
      fetchDepartementData(siren, '').then((departements) => {
        setDepartementList(departements);
      });
    }
  }, [selectedRegion, siren]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = event.target.value;
    setSelectedRegion(newRegion);
    fetchDepartementData(siren, newRegion);
    setFilters({ ...filters, region: newRegion });

    setTimeout(async () => {
      const data = await fetchPaginatedPointAccueilList(
        currentPage,
        POINTS_ACCUEIL_PER_PAGE,
        siren,
        { ...filters, region: newRegion }
      );
      setCount(data.totalElements);
      setPointsAccueilData(data.content);
    }, 2000);
  };

  const handleDepartementChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newDepartement = event.target.value;
    setFilters({ ...filters, department: newDepartement });
    setTimeout(async () => {
      const data = await fetchPaginatedPointAccueilList(
        currentPage,
        POINTS_ACCUEIL_PER_PAGE,
        siren,
        { ...filters, department: newDepartement }
      );
      setCount(data.totalElements);
      setPointsAccueilData(data.content);
    }, 2000);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const searchInput = event.target.value;
    setFilters({ ...filters, searchQuery: searchInput });
  };

  const submitSearch = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    setTimeout(async () => {
      const data = await fetchPaginatedPointAccueilList(
        currentPage,
        POINTS_ACCUEIL_PER_PAGE,
        siren,
        filters
      );
      setCount(data.totalElements);
      setPointsAccueilData(data.content);
    }, 2000);
  };

  return (
    <div className="flex space-x-4 w-full">
      <div className="flex flex-col">
        <label className="fr-label" htmlFor="text-input-icon">
          {COMMON.rechercher}
        </label>
        <div className="fr-input-wrap fr-icon-alert-line search">
          <input
            className="fr-input"
            aria-describedby="text-input-icon-messages"
            id="text-input-icon"
            type="text"
            placeholder="Nom de l'établissement"
            aria-label="Search input"
            onChange={(event) => handleSearchChange(event)}
          />
          <button
            className="fr-btn search__button"
            title="Label bouton"
            onClick={(event) => submitSearch(event)}
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
      <div className="flex flex-col">
        <label className="fr-label" htmlFor="region">
          {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.region}
        </label>
        <select
          className="fr-select p-2"
          id="region"
          name="region"
          onChange={handleRegionChange}
          value={selectedRegion}
        >
          <option value="" disabled hidden>
            {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.selectRegion}
          </option>
          <option value="">
            {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.reinitFilter}
          </option>
          {regionList.length > 0 &&
            regionList.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="fr-label" htmlFor="department">
          {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.departement}
        </label>
        <select
          className="fr-select p-2"
          id="department"
          name="department"
          value={filters.department}
          onChange={(event) => {
            handleDepartementChange(event);
          }}
        >
          <option value="" disabled hidden>
            {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.selectDepartement}
          </option>
          <option value="">
            {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.reinitFilter}
          </option>
          {departementList.length > 0 &&
            departementList.map((departement) => (
              <option key={departement} value={departement}>
                {departement}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
