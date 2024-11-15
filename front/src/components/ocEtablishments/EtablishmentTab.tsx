import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDepartementData,
  fetchPaginatedLPAInfo,
  fetchRegionData,
} from './action.ts';
import Pagination from './pagination/Pagination.tsx';
import {
  FormDataOC,
  LpaData,
  PointAcceuilInfo,
  POINTS_ACCUEIL_PER_PAGE,
} from './Contants.ts';
import { LPAForm } from './formulairePointAccueil/LPAForm.tsx';
import { SiegeForm } from './formulaireSiege/SiegeForm.tsx';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useDeletePA } from '../../hooks/useDeletePA.tsx';
import { ErrorMessage } from '../common/error/Error.tsx';
import { COMMON, OC_MES_ETABLISSEMENTS } from '../../wording.ts';
import { EtablissementTabHeader } from './etablissementTabHeader/EtablissementTabHeader.tsx';
import {
  createPointAccueilInfo,
  fetchPaginatedPointAccueilList,
  updatePointAccueilInfo,
} from '@/utils/OcEtablissements.query.tsx';
import { OcEtablissementsContext } from '@/contexts/OcEtablissementsContext.tsx';

interface EtablishmentTab {
  setActionAndOpenModal: (action: () => void, message: string) => void;
}
export interface RootState {
  ocInfo: {
    ocData: FormDataOC | null;
    lpaData: LpaData | null;
    departments: string[];
    regions: string[];
    loadingLPA: boolean;
    loadingOC: boolean;
    error: string | null;
  };
}

export const EtablishmentTab = ({ setActionAndOpenModal }: EtablishmentTab) => {
  const dispatch = useDispatch();

  const {
    departments: lpaDepartment,
    regions: lpaRegions,
    loadingLPA,
    loadingOC,
    lpaData,
    error,
  } = useSelector((state: RootState) => state.ocInfo);

  const { count, setCount, siegeData, setPointsAccueilData } = useContext(
    OcEtablissementsContext
  );

  const [formDataOC] = useState<FormDataOC>({
    locSiren: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    groupe: '',
    siteWeb: '',
    ocAddedtoLPA: false,
    dateMaj: '',
    totalPAitems: 0,
  });

  const [filters, setFilters] = useState({
    searchQuery: '',
    region: '',
    department: '',
    size: POINTS_ACCUEIL_PER_PAGE,
  });

  const [selectedRegion, setSelectedRegion] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = lpaData ? lpaData.totalPages : 0;
  const [siren, setSiren] = useState('');

  const [totalPointsAcceuil, setTotalPointsAcceuil] = useState<number>(
    lpaData?.totalElements || 0
  );

  const formRef = useRef<HTMLDivElement>(null);

  const { deletePoint } = useDeletePA();

  useEffect(() => {
    if (siegeData.locSiren) {
      setSiren(siegeData.locSiren);
      fetchPaginatedPointAccueilList(
        currentPage,
        POINTS_ACCUEIL_PER_PAGE,
        siren,
        filters
      ).then((data) => {
        setCount(data.response.totalElements);
        setPointsAccueilData(data.response.content);
        setTotalPointsAcceuil(Number(count));
      });
    }
  }, [
    count,
    currentPage,
    filters,
    setCount,
    setPointsAccueilData,
    siegeData.locSiren,
    siren,
  ]);

  useEffect(() => {
    if (formDataOC.locSiren) {
      setSiren(formDataOC.locSiren);
      dispatch(
        fetchPaginatedLPAInfo(
          currentPage,
          POINTS_ACCUEIL_PER_PAGE,
          formDataOC.locSiren,
          filters
        )
      );

      dispatch(fetchDepartementData(formDataOC.locSiren, selectedRegion));

      dispatch(fetchRegionData(formDataOC.locSiren));

      // FIXME: quick fix, à remplacer
      const totalPA = localStorage.getItem('totalElementForOC');
      if (totalPA) {
        setTotalPointsAcceuil(Number(totalPA));
      }
    }
  }, [
    currentPage,
    formDataOC.locSiren,
    lpaData?.totalElements,
    filters,
    selectedRegion,
    dispatch,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handleSubmitLPA = async (
    formData: PointAcceuilInfo,
    isEditing: boolean
  ) => {
    if (isEditing) {
      await updatePointAccueilInfo(formData);

      setTimeout(async () => {
        const data = await fetchPaginatedPointAccueilList(
          currentPage,
          POINTS_ACCUEIL_PER_PAGE,
          siren,
          filters
        );
        setCount(data.response.totalElements);
        setPointsAccueilData(data.response.content);
      }, 3000);
    } else {
      await createPointAccueilInfo(formData);

      setTimeout(async () => {
        const data = await fetchPaginatedPointAccueilList(
          currentPage,
          POINTS_ACCUEIL_PER_PAGE,
          siren,
          filters
        );
        setCount(data.response.totalElements);
        setPointsAccueilData(data.response.content);
      }, 3000);

      setTotalPointsAcceuil(count);
    }
  };

  const handleDeleteLpa = (id: string) => {
    const executeDeletion = () => {
      deletePoint({
        id: id,
        siren: formDataOC.locSiren,
        currentPage: currentPage,
        pageSize: 3,
        filters: filters,
      });
    };
    // FIXME: quick fix, à modifier
    setTotalPointsAcceuil(totalPointsAcceuil - 1);
    localStorage.setItem('totalElementForOC', String(totalPointsAcceuil - 1));

    setActionAndOpenModal(
      executeDeletion,
      "Vous êtes sur le point de supprimer un point d'accueil "
    );
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = event.target.value;
    setSelectedRegion(newRegion);
    dispatch(fetchDepartementData(siren, newRegion));
    setFilters((prev) => ({
      ...prev,
      region: newRegion,
    }));
    dispatch(
      fetchPaginatedLPAInfo(
        currentPage,
        POINTS_ACCUEIL_PER_PAGE,
        siren,
        filters
      )
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {error && <ErrorMessage message={COMMON.errorMessage} />}
      {loadingOC ? (
        <div className="text-center mt-4 mb-4">
          <AutorenewIcon
            className="animate-spin"
            fontSize="inherit"
            style={{ fontSize: '3rem' }}
          />
        </div>
      ) : (
        <>
          <div className="header w-full flex justify-between items-center pr-44 pl-4">
            <EtablissementTabHeader />

            <button className="fr-btn" onClick={scrollToForm}>
              {OC_MES_ETABLISSEMENTS.addPointAcceuil}
            </button>
          </div>
          <div className="px-16 w-full">
            <h3 className="text-xl font-semibold mb-2 ml-8">
              {OC_MES_ETABLISSEMENTS.siegeDeLaSociete}
            </h3>
            <SiegeForm />
            <div className=" bg-gray-900 flex-none order-2 self-stretch flex-grow-0"></div>
          </div>
          <div className="px-4 lg:px-16 w-full">
            <h3 className="text-xl font-semibold ml-2 lg:ml-8 mb-2">
              {/* TODO: uiliser un composant mutualisé pour gérer le singulier/pluriel*/}
              {totalPointsAcceuil} point(s) d'accueil enregistré(s)
            </h3>
            <div className="max-w-4xl mx-auto space-x-4 flex items-center justify-between">
              <div className="flex space-x-4">
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
                    {loadingLPA && <option disabled>Chargement...</option>}
                    <option value="">
                      {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.reinitFilter}
                    </option>
                    {!loadingLPA &&
                      lpaRegions.map((item) => (
                        <option key={item} value={item}>
                          {item}
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
                    onChange={handleFilterChange}
                  >
                    <option value="" disabled hidden>
                      {
                        OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL
                          .selectDepartement
                      }
                    </option>
                    {loadingLPA && <option disabled>Chargement...</option>}
                    <option value="">
                      {OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.reinitFilter}
                    </option>
                    {!loadingLPA &&
                      lpaDepartment.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <br />
            <div>
              {loadingLPA ? (
                <div className="text-center mt-4 mb-4">
                  <AutorenewIcon
                    className="animate-spin"
                    fontSize="inherit"
                    style={{ fontSize: '3rem' }}
                  />
                </div>
              ) : lpaData && lpaData.content.length > 0 ? (
                <>
                  {lpaData.content.map((lpaInfo, index) => (
                    <LPAForm
                      key={lpaInfo.id}
                      index={index}
                      initialData={lpaInfo}
                      onSubmit={handleSubmitLPA}
                      onDelete={handleDeleteLpa}
                      isEditing={true}
                      currentPage={currentPage}
                      pageSize={POINTS_ACCUEIL_PER_PAGE}
                    />
                  ))}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center">
                  Aucun résultat à votre recherche.
                </div>
              )}
            </div>
          </div>
          <div className="px-16 w-full" ref={formRef}>
            <h3 className="text-xl font-semibold ml-8 mb-2">
              Ajouter un nouveau point d'accueil
            </h3>
            <div>
              <LPAForm
                onSubmit={(formData) => handleSubmitLPA(formData, false)}
                pageSize={POINTS_ACCUEIL_PER_PAGE}
                currentPage={currentPage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
