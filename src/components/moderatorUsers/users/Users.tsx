import { useCallback, useEffect, useState } from 'react';
import { UserBlock } from '../userBlock/UserBlock';
import { Pagination } from '@/components/common/pagination/Pagination';
import { axiosInstance } from '@/RequestInterceptor';
import { UserApiResponse } from '@/domain/ModerateurUsers';
import { useUserContext } from '@/contexts/UserContext';
import { MODERATOR_USERS } from '@/wording';
import { OrganisationType } from '@/domain/ModerateurUsers';
import './Users.css';

//todo: extract membersQuery function
interface QueryFilters {
  statutId?: number;
  cible?: OrganisationType;
  size?: number;
  page?: number;
  search?: string;
}

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

  const handleDataUpdate = useCallback(() => {
    setDataUpdated((prev: boolean) => !prev);
  }, []);

  const filters: QueryFilters = {
    statutId: parseInt(statut),
    cible: organisationType,
    size: 10,
    page: currentPage - 1,
    search: searchTerm,
  };

  const apiEndpoint = formatEndpoint(filters);

  useEffect(() => {
    axiosInstance
      .get<UserApiResponse>(apiEndpoint, { withCredentials: true })
      .then((response) => {
        setUsers(response.data.list);
      });
  }, [dataUpdated, statut, organisationType, searchTerm, currentPage]);

  return (
    <div className="fr-container--fluid users">
      <h3 className="users__title mb-5 mt-3">
        {users.length} {MODERATOR_USERS.usersToModerate}
      </h3>
      <ul className="users__list flex flex-wrap flex-col gap-y-6">
        {users.length > 0 &&
          users.map((user) => (
            <li key={user.email}>
              <UserBlock user={user} onDataUpdate={handleDataUpdate} />
            </li>
          ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={(page) => setCurrentPage(page)}
        onClickPrev={() => setCurrentPage(currentPage - 1)}
        onClickNext={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};
