import { useRef } from 'react';
import { useModeratorModeratorsContext } from '../../hooks/useModeratorModeratorsContext.tsx';
import { TabHeader } from '../common/tabHeader/tabHeader.tsx';
import { Button } from '../common/button/Button.tsx';
import { MODERATOR_MODERATORS } from '../../wording.ts';
import { SystemSvg } from '../../assets/SystemSvg.tsx';
import { Separator } from '../common/svg/Seperator.tsx';
import { SectionTitle } from '../common/sectionTitle/SectionTitle.tsx';
import { scrollToRef } from '../../utils/scrollToRef.ts';
import { ModeratorsUsers } from './moderatorsUsers/ModeratorsUsers.tsx';

export const ModeratorModerators = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const { totalUsers } = useModeratorModeratorsContext();

  return (
    <div className="fr-container--fluid">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <TabHeader
          icon={<SystemSvg />}
          pageTitle={MODERATOR_MODERATORS.pageTitle}
          pageDetail={MODERATOR_MODERATORS.pageDetail(totalUsers)}
        />
        <Button
          className="fr-btn--transform-none"
          variant="primary"
          label={MODERATOR_MODERATORS.addModerator}
          onClick={() => scrollToRef(formRef)}
        />
      </div>
      <Separator className="my-2 lg:my-4" />
      <SectionTitle
        className="mb-6 lg:mb-10"
        level={3}
        title={MODERATOR_MODERATORS.validatedUsersNumber(totalUsers)}
      />
      <ModeratorsUsers />
      <Separator className="my-2 lg:my-4" />
      <SectionTitle
        className="mb-6 lg:mb-10"
        title={MODERATOR_MODERATORS.addNewModerator}
      />
      {/* <OcTeamMailForm targetRef={formRef} /> */}
    </div>
  );
};
