import { useEffect, useState } from 'react';
import { TabHeader } from '../common/tabHeader/tabHeader';
import { ModeratorHistoryTable } from './moderatorHistoryTable/ModeratorHistoryTable';
import { useKeycloak } from '@react-keycloak/web';
import { HistorySvg } from '@/assets/HistorySvg';
import { MODERATOR_HISTORY } from '@/wording';
import { Separator } from '../common/svg/Seperator';

export const ModeratorHistory = () => {
  return <ModeratorHistoryContent />;
};

const ModeratorHistoryContent = () => {
  const [isLogged, setIsLogged] = useState(false);
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

  return (
    <div className="fr-container--fluid">
      {isLogged && (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <TabHeader
              icon={<HistorySvg />}
              pageTitle={MODERATOR_HISTORY.pageTitle}
              pageDetail={MODERATOR_HISTORY.pageDetail}
            />
          </div>
          <Separator />
          <ModeratorHistoryTable />
        </>
      )}
    </div>
  );
};
