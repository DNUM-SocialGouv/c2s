import { useContext } from 'react';
import { TabHeader } from '../common/tabHeader/tabHeader.tsx';
import { ModeratorHistoryTable } from './moderatorHistoryTable/ModeratorHistoryTable.tsx';
import { HistorySvg } from '../../assets/HistorySvg.tsx';
import { MODERATOR_HISTORY } from '../../wording.ts';
import { Separator } from '../common/svg/Seperator.tsx';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { Loader } from '../common/loader/Loader.tsx';

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
