import { TabHeader } from '../common/tabHeader/tabHeader';
import { Avatar } from '@/components/common/svg/Avatar';
import { Filters } from './filters/Filters';
import { Users } from './users/Users';
import { Loader } from '@/components/common/loader/Loader';
import { MODERATOR_USERS } from '@/wording';
import { UserProvider } from '@/contexts/UserContext';
import { useKeycloak } from '@react-keycloak/web';
import { axiosInstance } from '@/RequestInterceptor';
import { useEffect, useState } from 'react';

const apiEndpoint = '/moderateur/membres/home';

interface UserApiResponse {
  membreCount: number;
}

export const ModeratorUsers = () => {
  return (
    <UserProvider>
      <ModeratorUsersContent />
    </UserProvider>
  );
};

const ModeratorUsersContent = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [usersCount, setUsersCount] = useState<number>(0);

  const { keycloak } = useKeycloak();

  useEffect(() => {
    const sendMyToken = (token: string) => {
      let result: boolean | null;

      fetch('/api/public/login', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        credentials: 'include',
        body: token,
      })
        .then(() => {
          result = true;
          setIsLogged(true);
        })
        .catch(() => {
          result = false;
        })
        .finally(() => {
          return result;
        });
      return '';
    };
    sendMyToken(keycloak.token!);
  }, [keycloak.token]);

  useEffect(() => {
    if (keycloak.authenticated) {
      setIsLogged(true);
    }
  }, [keycloak.authenticated]);

  useEffect(() => {
    axiosInstance
      .get<UserApiResponse | null>(apiEndpoint, { withCredentials: true })
      .then((response) => {
        setUsersCount(response?.data?.membreCount || 0);
      });
  }, [isLogged]);

  return (
    <div className="fr-container--fluid">
      {isLogged && (
        <>
          <TabHeader
            icon={<Avatar />}
            pageTitle={MODERATOR_USERS.pageTitle}
            pageDetail={MODERATOR_USERS.pageDetail(usersCount)}
          />
          <Filters />
          <Users />
        </>
      )}
      {!isLogged && <Loader />}
    </div>
  );
};
