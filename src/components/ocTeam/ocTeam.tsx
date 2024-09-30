import { useRef } from 'react';
import { useOcTeam } from '@/hooks/useOcTeam';
import { TabHeader } from '../common/tabHeader/tabHeader';
import { Button } from '@/components/common/button/Button';
import { OC_TEAM } from '@/wording';
import { SystemSvg } from '@/assets/SystemSvg';
import { Separator } from '../common/svg/Seperator';
import { InformationMessage } from '@/components/common/informationMessage/InformationMessage';
import { SectionTitle } from '../common/sectionTitle/SectionTitle';
import { OcTeamMembers } from './ocTeamMembers/ocTeamMembers';
import { OcTeamMailForm } from './ocTeamMailForm/OcTeamMailForm';

export const OcTeam = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const { totalMembers } = useOcTeam();

  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fr-container--fluid">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <TabHeader
          icon={<SystemSvg />}
          pageTitle={OC_TEAM.pageTitle}
          pageDetail={OC_TEAM.pageDetail(totalMembers)}
        />
        <Button
          className="fr-btn--transform-none"
          variant="primary"
          label={OC_TEAM.addMember}
          onClick={() => handleScrollToForm()}
        />
      </div>
      <div className="mt-12">
        <InformationMessage message={OC_TEAM.information} />
      </div>
      <Separator className="my-2 lg:my-4" />
      <OcTeamMembers />
      <Separator className="my-2 lg:my-4" />
      <SectionTitle className="mb-6 lg:mb-10" title={OC_TEAM.addNewMember} />
      <OcTeamMailForm targetRef={formRef} />
    </div>
  );
};
