import { useCallback, useEffect, useState } from 'react';
import { UserBlock } from '../userBlock/UserBlock';
import { Pagination } from '@/components/common/pagination/Pagination';
import { axiosInstance } from '@/RequestInterceptor';
import { UserApiResponse } from '@/domain/ModerateurUsers';
import { useUserContext } from '@/contexts/UserContext';
import { MODERATOR_USERS } from '@/wording';
import { OrganisationType } from '@/domain/ModerateurUsers';
import { UserStatus } from '@/domain/ModerateurUsers';
import './Users.css';

//todo: extract membersQuery function
interface QueryFilters {
  statutId?: number;
  cible?: OrganisationType;
  size?: number;
  page?: number;
  search?: string;
}

const USERS_PER_PAGE = 5;

const usersQuery = (filters: QueryFilters): string => {
  const queryParameters = [];

  if (filters.statutId !== undefined && filters.statutId !== 0) {
    queryParameters.push(`statutId=${filters.statutId}`);
  }

  if (filters.cible !== undefined && filters.cible !== '') {
    queryParameters.push(`cible=${filters.cible}`);
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
  const { users, setUsers, statut, organisationType, searchTerm } =
    useUserContext();
  const [dataUpdated, setDataUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
  const statutToNumber = Number(statut);

  let subtitle;

  switch (statutToNumber) {
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
    statutId: parseInt(statut),
    cible: organisationType,
    size: USERS_PER_PAGE,
    page: currentPage - 1,
    search: searchTerm,
  };

  const apiEndpoint = formatEndpoint(filters);

  useEffect(() => {
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
    <div className="fr-container--fluid users" data-testid="users">
      <h3 className="users__title mb-5 mt-3">
        {totalUsers} {subtitle}
      </h3>
      <ul className="users__list flex flex-wrap flex-col gap-y-6">
        {totalUsers > 0 &&
          users.map((user) => (
            <li key={user.email}>
              <UserBlock
                user={user}
                onDataUpdate={handleDataUpdate}
                singleAction={
                  statut === UserStatus.ToModerate.toString() ? false : true
                }
              />
            </li>
          ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          onClickPrev={() => setCurrentPage(currentPage - 1)}
          onClickNext={() => setCurrentPage(currentPage + 1)}
        />
      )}
    </div>
  );
};
