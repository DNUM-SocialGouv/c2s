import { useContext } from 'react';
import { LPAForm } from '../LPAForm/LPAForm';
import { OcEstablishmentContext } from '../../../contexts/OcEstablishmentContext';
import { Pagination } from '../../common/pagination/Pagination';

export const OcList = () => {
  const context = useContext(OcEstablishmentContext);

  if (!context) {
    return null;
  }

  const {
    establishments,
    loading,
    totalEstablishments,
    totalPages,
    currentPage,
    setCurrentPage,
  } = context;

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold ml-2 lg:ml-8 mb-6">
        {totalEstablishments} point(s) d'accueil enregistré(s)
      </h3>
      <ul className="list-none gap-y-8 flex flex-col">
        {establishments.map((establishment, index) => (
          <li key={index}>
            <LPAForm
              index={
                currentPage === 1
                  ? index + 1
                  : (currentPage - 1) * 10 + index + 1
              }
              action="update"
              PADefaultValues={establishment}
            />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        onClickPrev={() => setCurrentPage(currentPage - 1)}
        onClickNext={() => setCurrentPage(currentPage + 1)}
        data-testid="pagination"
      />
    </div>
  );
};
