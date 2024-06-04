import { TabHeader } from '../common/tabHeader/tabHeader';

import { Avatar } from '@/components/common/svg/Avatar';
// import { Filters } from './filters/Filters';
import { Users } from './users/Users';
import { MODERATOR_USERS } from '@/wording';
import { UserProvider, useUserContext } from './context/UserContext';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';

export const ModeratorUsers = () => {
  return (
    <UserProvider>
      <ModeratorUsersContent />
    </UserProvider>
  );
};
const ModeratorUsersContent = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { numberOfUsers } = useUserContext();

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

  return (
    <div className="fr-container--fluid">
      {isLogged && (
        <>
          <TabHeader
            icon={<Avatar />}
            pageTitle={MODERATOR_USERS.pageTitle}
            pageDetail={MODERATOR_USERS.pageDetail(numberOfUsers)}
          />
          <Users />
        </>
      )}
    </div>
  );
};
