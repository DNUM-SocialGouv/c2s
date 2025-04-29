import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import { MODERATOR_USERS } from '../../wording.ts';
import { Loader } from '../common/loader/Loader.tsx';
import { Avatar } from '../common/svg/Avatar.tsx';
import { TabHeader } from '../common/tabHeader/tabHeader.tsx';
import { Filters } from './filters/Filters.tsx';
import { Users } from './users/Users.tsx';

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
        .get<UserApiResponse>(apiEndpoint, { withCredentials: true })
        .then((response) => {
          setUsersCount(response.data.membreCount);
          setIsLoading(false);
        });
    }
  }, [isLoading, isLogged]);

  return (
    <>
      {!isLogged && isLoading ? (
        <Loader />
      ) : (
        <div className="fr-container--fluid" data-testid="moderatorUsers">
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
