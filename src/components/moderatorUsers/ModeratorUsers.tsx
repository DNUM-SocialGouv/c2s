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
import { useAuthToken } from '@/hooks/useAuthToken';

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
  const [usersCount, setUsersCount] = useState<number>(0);

  const { keycloak } = useKeycloak();
  const { isLogged, tokenIsSent } = useAuthToken(keycloak.token);

  useEffect(() => {
    axiosInstance
      .get<UserApiResponse | null>(apiEndpoint, { withCredentials: true })
      .then((response) => {
        setUsersCount(response?.data?.membreCount || 0);
      });
  }, [isLogged]);

  return (
    <div className="fr-container--fluid">
      {isLogged && tokenIsSent && (
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
