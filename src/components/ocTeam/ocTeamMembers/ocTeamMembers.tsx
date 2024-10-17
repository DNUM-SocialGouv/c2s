import { useOcTeam } from '@/hooks/useOcTeam';
import { OcTeamMember } from '../ocTeamMember/ocTeamMember';
import { Alert } from '@/components/common/alert/Alert';

export const OcTeamMembers = () => {
  const { members, notificationMessage } = useOcTeam();

  return (
    <ul className='class="list-none flex flex-wrap flex-col gap-y-6 ps-0 pe-0'>
      {notificationMessage && (
        <Alert type="success" description={notificationMessage} />
      )}
      {members.map((member) => (
        <OcTeamMember key={member.id} member={member} />
      ))}
    </ul>
  );
};
