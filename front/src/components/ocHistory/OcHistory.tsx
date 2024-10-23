import { TabHeader } from '../common/tabHeader/tabHeader.tsx';
import { OcHistoryTable } from './ocHistoryTable/OcHistoryTable.tsx';
import { OC_HISTORY } from '../../wording.ts';
import { HistorySvg } from '../../assets/HistorySvg.tsx';
import { Separator } from '../common/svg/Seperator.tsx';

export const OcHistory = () => {
  return (
    <div className="fr-container--fluid">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <TabHeader
          icon={<HistorySvg />}
          pageTitle={OC_HISTORY.pageTitle}
          pageDetail={OC_HISTORY.pageDetail}
        />
      </div>
      <Separator />
      <OcHistoryTable />
    </div>
  );
};
