import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { EstablishmentBlock } from '@/components/moderatorEstablishments/establishmentBlock/EstablishmentBlock';
import { Pagination } from '@/components/common/pagination/Pagination';
import { useModeratorEstablishmentsContext } from '@/contexts/ModeratorEstablishmentsContext';
import { SectionTitle } from '@/components/common/sectionTitle/SectionTitle';
import { EstablishmentType } from '@/domain/ModeratorEstablishments';
import { axiosInstance } from '@/RequestInterceptor';
import { EstablishmentsApiResponse } from '@/domain/ModeratorEstablishments';
import { MODERATOR_ESTABLISHMENTS } from '@/wording';

interface QueryFilters {
  search?: string;
  groupe?: EstablishmentType;
  region?: string;
  departement?: string;
  size?: number;
  page?: number;
}

const ESTABLISHMENTS_PER_PAGE = 5;

const establishmentsSearchQuery = (filters: QueryFilters): string => {
  const queryParameters = [];

  if (filters.search !== undefined && filters.search !== '') {
    queryParameters.push(`search=${filters.search}`);
  }

  if (filters.groupe !== undefined && filters.groupe !== '') {
    queryParameters.push(`groupe=${filters.groupe}`);
  }

  if (filters.region !== undefined && filters.region !== '') {
    queryParameters.push(`region=${filters.region}`);
  }

  if (filters.departement !== undefined && filters.departement !== '') {
    queryParameters.push(`departement=${filters.departement}`);
  }

  if (filters.page !== undefined) {
    queryParameters.push(`page=${filters.page}`);
  }

  if (filters.size !== undefined) {
    queryParameters.push(`size=${filters.size}`);
  }

  return queryParameters.length ? `?${queryParameters.join('&')}` : '';
};

const formatEndpoint = (filters: QueryFilters) =>
  `/moderateur/etablissements/search${establishmentsSearchQuery(filters)}`;

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
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

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

  const apiEndpoint = formatEndpoint(filters);

  const fetchEstablishments = (reset: boolean = false) => {
    if (abortController) {
      abortController.abort();
    }

    if (reset) {
      setCurrentPage(1);
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    axiosInstance
      .get<EstablishmentsApiResponse>(apiEndpoint, {
        withCredentials: true,
        signal: newAbortController.signal,
      })
      .then((response) => {
        setEstablishements(response.data.list);
        setTotalEstablishments(response.data.count);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request was aborted');
        } else {
          console.error('Error fetching data:', error);
        }
      });

    return () => {
      newAbortController.abort();
    };
  };

  useEffect(() => {
    fetchEstablishments();
  }, [searchTerm, establishmentType, region, departement, currentPage]);

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
        title={MODERATOR_ESTABLISHMENTS.registeredPasNumberTitle(
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
              <EstablishmentBlock establishment={establishement} />
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
