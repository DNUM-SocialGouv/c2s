import { TabHeader } from '../common/tabHeader/tabHeader';
import { Avatar } from '@/components/common/svg/Avatar';
import { Filters } from './filters/Filters';
import { Users } from './users/Users';
import { Loader } from '@/components/common/loader/Loader';
import { MODERATOR_USERS } from '@/wording';
import { axiosInstance } from '@/RequestInterceptor';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '@/contexts/LoginContext';

const apiEndpoint = '/moderateur/membres/home';

interface UserApiResponse {
  membreCount: number;
}

export const ModeratorUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersCount, setUsersCount] = useState<number>(0);

  const { isLogged } = useContext(LoginContext);

  useEffect(() => {
    if (isLogged) {
      axiosInstance
        .get<UserApiResponse | null>(apiEndpoint, { withCredentials: true })
        .then((response) => {
          setUsersCount(response?.data?.membreCount || 0);
          setIsLoading(true);
        });
    }
  }, [isLoading, isLogged]);

  return (
    <>
      {!isLogged && isLoading ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid">
          <>
            <TabHeader
              icon={<Avatar />}
              pageTitle={MODERATOR_USERS.pageTitle}
              pageDetail={MODERATOR_USERS.pageDetail(usersCount)}
            />
            <Filters />
            <Users />
          </>
        </div>
      )}
    </>
  );
};
