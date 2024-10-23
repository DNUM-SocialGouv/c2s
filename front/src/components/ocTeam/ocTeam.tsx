import { useRef } from 'react';
import { useOcTeam } from '../../hooks/useOcTeam.tsx';
import { TabHeader } from '../common/tabHeader/tabHeader.tsx';
import { Button } from '../common/button/Button.tsx';
import { OC_TEAM } from '../../wording.ts';
import { SystemSvg } from '../../assets/SystemSvg.tsx';
import { Separator } from '../common/svg/Seperator.tsx';
import { InformationMessage } from '../common/informationMessage/InformationMessage.tsx';
import { SectionTitle } from '../common/sectionTitle/SectionTitle.tsx';
import { OcTeamMembers } from './ocTeamMembers/ocTeamMembers.tsx';
import { OcTeamMailForm } from './ocTeamMailForm/OcTeamMailForm.tsx';

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
