import { useCallback, useEffect, useState } from 'react';
import { UserBlock } from '../userBlock/UserBlock';
import { axiosInstance } from '@/RequestInterceptor';
import { UserApiResponse } from '@/domain/ModerateurUsers';
import { useUserContext } from '../context/UserContext';
import { MODERATOR_USERS } from '@/wording';
import './Users.css';

//todo: extract membersQuery function
interface QueryFilters {
  statutId?: number;
  cible?: 'OC' | 'CAISSE';
  size?: number;
}

const membersQuery = (filters: QueryFilters): string => {
  const queryParameters = [];

  if (filters.statutId !== undefined) {
    queryParameters.push(`statutId=${filters.statutId}`);
  }
  if (filters.cible) {
    queryParameters.push(`cible=${filters.cible}`);
  }
  if (filters.size !== undefined) {
    queryParameters.push(`size=${filters.size}`);
  }

  return queryParameters.length ? `?${queryParameters.join('&')}` : '';
};

const ENDPOINT = (filters: QueryFilters) =>
  `/moderateur/membres${membersQuery(filters)}`;

const filters: QueryFilters = { statutId: 2, size: 20 };
const apiEndpoint = ENDPOINT(filters);

export const Users = () => {
  const { users, setUsers } = useUserContext();
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleDataUpdate = useCallback(() => {
    setDataUpdated((prev: boolean) => !prev);
  }, []);

  useEffect(() => {
    axiosInstance
      .get<UserApiResponse>(apiEndpoint, { withCredentials: true })
      .then((response) => {
        setUsers(response.data.list);
      });
  }, [dataUpdated]);

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
    </div>
  );
};
