import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import Pagination from './pagination/Pagination.tsx';
import { LPAForm } from './formulairePointAccueil/LPAForm.tsx';
import { SiegeForm } from './formulaireSiege/SiegeForm.tsx';
import { useDeletePA } from '../../hooks/useDeletePA.tsx';
import { COMMON, OC_MES_ETABLISSEMENTS } from '../../wording.ts';
import { EtablissementTabHeader } from './etablissementTabHeader/EtablissementTabHeader.tsx';
import {
  createPointAccueilInfo,
  fetchPaginatedPointAccueilList,
  updatePointAccueilInfo,
} from '@/utils/OcEtablissements.query.tsx';
import { OcEtablissementsContext } from '@/contexts/ocEtablissementsTab/OcEtablissementsContext.tsx';
import { AxiosError } from 'axios';
import { PointAcceuilInfo } from '@/domain/OcEtablissements.ts';
import {
  POINTS_ACCUEIL_PER_PAGE,
  POINT_ACCUEIL_DEFAULT_VALUES,
  filtersDefaultValues,
} from './Contants.ts';
import { FiltresOcEtablissment } from './filtres/FiltresOcEtablissment.tsx';
import { Alert } from '../common/alert/Alert.tsx';
import { Loader } from '../common/loader/Loader.tsx';

interface EtablishmentTab {
  setActionAndOpenModal: (action: () => void, message: string) => void;
}

export const EtablishmentTab = ({ setActionAndOpenModal }: EtablishmentTab) => {
  const {
    count,
    setCount,
    siegeData,
    pointsAccueilData,
    setPointsAccueilData,
    filters,
    setFilters,
  } = useContext(OcEtablissementsContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [siren, setSiren] = useState('');
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>(
    'Une erreur est survenue. Veuillez réessayer ultérieurement'
  );
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const { deletePoint } = useDeletePA();

  useEffect(() => {
    if (siegeData && siegeData.locSiren) {
      setSiren(siegeData.locSiren);
    }
  }, [count, siegeData, siegeData.locSiren]);

  useMemo(() => {
    if (siren) {
      fetchPaginatedPointAccueilList(
        currentPage,
        POINTS_ACCUEIL_PER_PAGE,
        siren,
        filters
      )
        .then((data) => {
          setCount(data.totalElements);
          setPointsAccueilData(data.content);
          setTotalPages(data.totalPages);
        })
        .catch((error) => {
          console.error(error as AxiosError);
          setError(true);
          setErrorMessage(OC_MES_ETABLISSEMENTS.errorDescription);
        });
    }
  }, [currentPage, filters, setCount, setPointsAccueilData, siren]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handleSubmitLPA = async (
    formData: PointAcceuilInfo,
    isEditing: boolean
  ) => {
    setIsLoading(true);
    if (isEditing) {
      await updatePointAccueilInfo(formData);

      setTimeout(async () => {
        const data = await fetchPaginatedPointAccueilList(
          currentPage,
          POINTS_ACCUEIL_PER_PAGE,
          siren,
          filters
        );
        setCount(data.totalElements);
        setPointsAccueilData(data.content);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(true);
      await createPointAccueilInfo(formData);
      setTimeout(async () => {
        const data = await fetchPaginatedPointAccueilList(
          currentPage,
          POINTS_ACCUEIL_PER_PAGE,
          siren,
          filters
        );
        setCount(data.totalElements);
        setPointsAccueilData(data.content);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleDeleteLpa = async (id: string) => {
    const executeDeletion = () => {
      deletePoint({
        id: id,
        siren: siren,
        currentPage: currentPage,
        pageSize: POINTS_ACCUEIL_PER_PAGE,
        filters: {
          size: POINTS_ACCUEIL_PER_PAGE,
          ...filters,
        },
      });
    };

    setActionAndOpenModal(
      executeDeletion,
      "Vous êtes sur le point de supprimer un point d'accueil "
    );
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onCloseError = () => {
    setError(false);
    setErrorMessage('');
  };

  const onResetFilters = () => {
    setFilters(filtersDefaultValues);
    setIsLoading(true);
    setCurrentPage(0);
    setTimeout(async () => {
      const data = await fetchPaginatedPointAccueilList(
        0,
        POINTS_ACCUEIL_PER_PAGE,
        siren,
        filtersDefaultValues
      );
      setCount(data.totalElements);
      setPointsAccueilData(data.content);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <>
        <div className="header w-full flex justify-between items-center pr-44 pl-4">
          {/* Tab header*/}
          <EtablissementTabHeader />
          {/* Tab header*/}
          <button className="fr-btn" onClick={scrollToForm}>
            {OC_MES_ETABLISSEMENTS.addPointAcceuil}
          </button>
        </div>
        {error && (
          <div className="container">
            <Alert
              type="error"
              label={OC_MES_ETABLISSEMENTS.errorLabel}
              description={errorMessage}
              onClose={() => onCloseError()}
              additionalClassName="w-full"
            />
          </div>
        )}
        <div className="px-16 w-full">
          <h3 className="text-xl font-semibold mb-2 ml-8">
            {OC_MES_ETABLISSEMENTS.siegeDeLaSociete}
          </h3>
          {/* Formulaire de siège */}
          <SiegeForm />
          {/* Formulaire de siège */}
          <div className=" bg-gray-900 flex-none order-2 self-stretch flex-grow-0"></div>
        </div>
        {/* Points d'accueil */}
        {isLoading ? (
          <div className="px-4 lg:px-16 flex w-full">
            <Loader additionalClassName="h-80" />
          </div>
        ) : (
          <div className="px-4 lg:px-16 w-full">
            <h3 className="text-xl font-semibold ml-2 lg:ml-8 mb-2">
              {/* TODO: uiliser un composant mutualisé pour gérer le singulier/pluriel*/}
              {count} point(s) d'accueil enregistré(s)
            </h3>
            <div className="max-w-4xl mx-auto space-x-4 flex items-center justify-between mb-8">
              {/* Filtres */}
              <FiltresOcEtablissment currentPage={currentPage} />
              {/* Filtres */}
            </div>
            {/* Liste des points d'accueil */}
            <div>
              {pointsAccueilData && pointsAccueilData.length > 0 ? (
                <>
                  {pointsAccueilData.map((paInfo, index) => (
                    <LPAForm
                      key={paInfo.id}
                      index={index}
                      data={paInfo}
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
                <div className="fr-alert fr-alert--warning h-auto">
                  <h3 className="fr-alert__title">
                    Attention : {COMMON.noResult}
                  </h3>
                  <p>
                    Nous vous invitons à vérifier vos filtres :
                    <ul>
                      {filters.searchQuery && (
                        <li>
                          Vérifiez que le nom{' '}
                          <strong>{filters.searchQuery}</strong> correspond à un
                          point d'accueil
                        </li>
                      )}
                      {filters.department && filters.region && (
                        <li>
                          Vérifiez que le département{' '}
                          <strong>{filters.department}</strong> fait partie de
                          la région <strong>{filters.region}</strong>
                        </li>
                      )}
                      {filters.searchQuery &&
                        filters.department &&
                        filters.region && (
                          <li>
                            Vérifiez que l'établissement{' '}
                            <strong>{filters.searchQuery}</strong> existe bien
                            dans le département{' '}
                            <strong>{filters.department}</strong> de la région{' '}
                            <strong>{filters.region}</strong>
                          </li>
                        )}
                      {filters.searchQuery && filters.region && (
                        <li>
                          Vérifiez que l'établissement{' '}
                          <strong>{filters.searchQuery}</strong> existe bien
                          dans la région <strong>{filters.region}</strong>
                        </li>
                      )}
                      {filters.searchQuery &&
                        filters.department &&
                        !filters.region && (
                          <li>
                            Vérifiez que l'établissement{' '}
                            <strong>{filters.searchQuery}</strong> existe bien
                            dans le département{' '}
                            <strong>{filters.department}</strong>
                          </li>
                        )}
                      <li className="pt-4">
                        <button
                          className="fr-btn fr-btn--sm fr-fi-checkbox-circle-line fr-btn--icon-left fr-btn--primary"
                          onClick={onResetFilters}
                        >
                          {COMMON.resetFilters}
                        </button>
                      </li>
                    </ul>
                  </p>
                </div>
              )}
            </div>
            {/* Liste des points d'accueil */}
          </div>
        )}

        {/* Points d'accueil */}
        <div className="px-16 w-full" ref={formRef}>
          <h3 className="text-xl font-semibold ml-8 mb-2">
            Ajouter un nouveau point d'accueil
          </h3>
          {/* Formulaire d'ajout de point d'accueil */}
          <div>
            <LPAForm
              onSubmit={(formData) => handleSubmitLPA(formData, false)}
              pageSize={POINTS_ACCUEIL_PER_PAGE}
              currentPage={currentPage}
              data={POINT_ACCUEIL_DEFAULT_VALUES}
            />
          </div>
        </div>
      </>
    </div>
  );
};
