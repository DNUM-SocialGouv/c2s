import { useContext } from 'react';
import { TabHeader } from '../common/tabHeader/tabHeader';
import { ModeratorHistoryTable } from './moderatorHistoryTable/ModeratorHistoryTable';
import { HistorySvg } from '@/assets/HistorySvg';
import { MODERATOR_HISTORY } from '@/wording';
import { Separator } from '../common/svg/Seperator';
import { LoginContext } from '@/contexts/LoginContext';
import { Loader } from '../common/loader/Loader';

export const ModeratorHistory = () => {
  const { isLogged } = useContext(LoginContext);

  return (
    <div className="fr-container--fluid">
      <>
        {!isLogged ? (
          <Loader />
        ) : (
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
      </>
    </div>
  );
};
