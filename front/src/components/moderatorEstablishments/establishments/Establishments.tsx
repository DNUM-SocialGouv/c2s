import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { EstablishmentBlock } from '../establishmentBlock/EstablishmentBlock.tsx';
import { Pagination } from '../../common/pagination/Pagination.tsx';
import { useModeratorEstablishmentsContext } from '../../../contexts/ModeratorEstablishmentsContext.tsx';
import { SectionTitle } from '../../common/sectionTitle/SectionTitle.tsx';
import { EstablishmentType } from '../../../domain/ModeratorEstablishments.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { EstablishmentsApiResponse } from '../../../domain/ModeratorEstablishments.ts';
import { MODERATOR_ESTABLISHMENTS } from '../../../wording.ts';
import {
  establishmentsSearchQuery,
  formatEndpoint,
} from '../../../utils/ModeratorEstablishments.helper.tsx';
import { AxiosError } from 'axios';

export interface QueryFilters {
  search?: string;
  groupe?: EstablishmentType;
  region?: string;
  departement?: string;
  size?: number;
  page?: number;
}

const ESTABLISHMENTS_PER_PAGE = 5;

export const Establishments = forwardRef((_, ref) => {
  const {
    searchTerm,
    establishements,
    setEstablishements,
    establishmentType,
    region,
    departement,
  } = useModeratorEstablishmentsContext();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalEstablishments, setTotalEstablishments] = useState<number>(0);

  const listRef = useRef<HTMLUListElement>(null);

  const totalPages = Math.ceil(totalEstablishments / ESTABLISHMENTS_PER_PAGE);

  const filters: QueryFilters = {
    search: searchTerm,
    groupe: establishmentType,
    size: ESTABLISHMENTS_PER_PAGE,
    region,
    departement,
    page: currentPage - 1,
  };

  const filterParams = establishmentsSearchQuery(filters);

  const apiEndpoint = formatEndpoint(filterParams);

  const fetchEstablishments = useCallback(
    (reset: boolean = false) => {
      if (reset) {
        setCurrentPage(1);
      }

      axiosInstance
        .get<EstablishmentsApiResponse>(apiEndpoint, {
          withCredentials: true,
        })
        .then((response) => {
          setEstablishements(response.data.list);
          setTotalEstablishments(response.data.count);
        })
        .catch((error: AxiosError) => {
          console.error(
            `Erreur lors de l'execution de la requete: ${error.code}`
          );
        });
    },
    [setCurrentPage, apiEndpoint, setEstablishements, setTotalEstablishments]
  );

  useEffect(() => {
    fetchEstablishments();
  }, [
    searchTerm,
    establishmentType,
    region,
    departement,
    currentPage,
    fetchEstablishments,
  ]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [currentPage]);

  useImperativeHandle(ref, () => ({
    fetchEstablishments: () => {
      fetchEstablishments(true);
    },
  }));

  return (
    <div className="fr-container--fluid">
      <SectionTitle
        title={MODERATOR_ESTABLISHMENTS.registeredEstablishmentsNumberTitle(
          totalEstablishments
        )}
      />
      <ul
        ref={listRef}
        className="list-none flex flex-wrap flex-col gap-y-6 ps-0 pe-0"
      >
        {establishements.length > 0 &&
          establishements.map((establishement) => (
            <li key={establishement.id}>
              <EstablishmentBlock
                establishment={establishement}
                fetchEstablishments={fetchEstablishments}
              />
            </li>
          ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          onClickPrev={() => setCurrentPage((prevState) => prevState - 1)}
          onClickNext={() => setCurrentPage((prevState) => prevState + 1)}
        />
      )}
    </div>
  );
});
