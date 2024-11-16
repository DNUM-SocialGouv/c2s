import { useState, useEffect, useRef, useContext } from 'react';
import Pagination from './pagination/Pagination.tsx';
import { LPAForm } from './formulairePointAccueil/LPAForm.tsx';
import { SiegeForm } from './formulaireSiege/SiegeForm.tsx';
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
import { AxiosError } from 'axios';
import { PointAcceuilInfo } from '@/domain/OcEtablissements.ts';
import {
  POINTS_ACCUEIL_PER_PAGE,
  POINT_ACCUEIL_DEFAULT_VALUES,
} from './contants.ts';

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
  } = useContext(OcEtablissementsContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [siren, setSiren] = useState('');
  const [error, setError] = useState(false);
  const [totalPointsAcceuil, setTotalPointsAcceuil] = useState<number>(
    count || 0
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
      )
        .then((data) => {
          setCount(data.response.totalElements);
          setPointsAccueilData(data.response.content);
          setTotalPointsAcceuil(Number(count));
          setTotalPage(data.response.totalPages);
        })
        .catch((error) => {
          console.error(error as AxiosError);
          setError(true);
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

  const handleDeleteLpa = async (id: string) => {
    const executeDeletion = () => {
      setTotalPointsAcceuil(totalPointsAcceuil - 1);
      deletePoint({
        id: id,
        siren: siren,
        currentPage: currentPage,
        pageSize: 3,
        filters: {
          size: 3,
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

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {error && <ErrorMessage message={COMMON.errorMessage} />}
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
          <div className="max-w-4xl mx-auto space-x-4 flex items-center justify-between mb-8">
            {/* Filtres */}

            {/* Filtres */}
          </div>

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
              data={POINT_ACCUEIL_DEFAULT_VALUES}
            />
          </div>
        </div>
      </>
    </div>
  );
};
