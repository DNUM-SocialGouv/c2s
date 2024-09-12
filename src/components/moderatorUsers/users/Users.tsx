import { useCallback, useEffect, useRef, useState } from 'react';
import { UserBlock } from '../userBlock/UserBlock';
import { Pagination } from '@/components/common/pagination/Pagination';
import { SectionTitle } from '@/components/common/sectionTitle/SectionTitle';
import { axiosInstance } from '@/RequestInterceptor';
import { UserApiResponse } from '@/domain/ModerateurUsers';
import { useUserContext } from '@/contexts/UserContext';
import { MODERATOR_USERS } from '@/wording';
import { OrganisationType } from '@/domain/Commons';
import { UserStatus } from '@/domain/ModerateurUsers';

//Todo: extract membersQuery function
interface QueryFilters {
  statut?: string;
  groupe?: OrganisationType;
  size?: number;
  page?: number;
  search?: string;
}

const USERS_PER_PAGE = 5;

const usersQuery = (filters: QueryFilters): string => {
  const queryParameters = [];

  if (filters.statut !== undefined) {
    queryParameters.push(`statut=${filters.statut}`);
  }

  if (filters.groupe !== undefined && filters.groupe !== '') {
    queryParameters.push(`groupe=${filters.groupe}`);
  }

  if (filters.page !== undefined) {
    queryParameters.push(`page=${filters.page}`);
  }

  if (filters.size !== undefined) {
    queryParameters.push(`size=${filters.size}`);
  }

  if (filters.search !== undefined && filters.search !== '') {
    queryParameters.push(`search=${filters.search}`);
  }

  return queryParameters.length ? `?${queryParameters.join('&')}` : '';
};

const formatEndpoint = (filters: QueryFilters) =>
  `/moderateur/membres${usersQuery(filters)}`;

export const Users = () => {
  //Todo: refactor > setusers en state (utilisé que dans ce composant) ?
  const { users, setUsers, statut, organisationType, searchTerm } =
    useUserContext();
  const [dataUpdated, setDataUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const listRef = useRef<HTMLUListElement>(null);

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
  const statutToString = statut;

  let subtitle;

  switch (statutToString) {
    case UserStatus.ToModerate:
      subtitle = MODERATOR_USERS.usersToModerate;
      break;
    case UserStatus.Validated:
      subtitle = MODERATOR_USERS.activeUsers;
      break;
    case UserStatus.Refused:
      subtitle = MODERATOR_USERS.refusedUsers;
      break;
    case UserStatus.Unsubscribed:
      subtitle = MODERATOR_USERS.inactiveUsers;
      break;
    default:
      subtitle = '';
  }

  const handleDataUpdate = useCallback(() => {
    setDataUpdated((prev: boolean) => !prev);
  }, []);

  const filters: QueryFilters = {
    statut: statut,
    groupe: organisationType,
    size: USERS_PER_PAGE,
    page: currentPage - 1,
    search: searchTerm,
  };

  const apiEndpoint = formatEndpoint(filters);

  useEffect(() => {
    if (listRef.current) {
      listRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [currentPage]);

  useEffect(() => {
    //reset la recherche quand on change de filtre
    setCurrentPage(1);
  }, [statut, organisationType, searchTerm]);

  useEffect(() => {
    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    axiosInstance
      .get<UserApiResponse>(apiEndpoint, {
        withCredentials: true,
        signal: newAbortController.signal,
      })
      .then((response) => {
        setUsers(response.data.list);
        setTotalUsers(response.data.count);
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
  }, [dataUpdated, statut, organisationType, searchTerm, currentPage]);

  return (
    <div className="fr-container--fluid" data-testid="users">
      <SectionTitle title={`${totalUsers} ${subtitle}`} />
      <ul
        ref={listRef}
        className="list-none flex flex-wrap flex-col gap-y-6 ps-0 pe-0"
      >
        {totalUsers > 0 &&
          users.map((user) => (
            <li key={user.email}>
              <UserBlock
                user={user}
                onDataUpdate={handleDataUpdate}
                singleAction={statut !== UserStatus.ToModerate.toString()}
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
};
