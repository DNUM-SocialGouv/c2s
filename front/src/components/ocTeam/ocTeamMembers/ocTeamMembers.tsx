import { useOcTeam } from '../../../hooks/useOcTeam.tsx';
import { OcTeamMember } from '../ocTeamMember/ocTeamMember.tsx';
import { Alert } from '../../common/alert/Alert.tsx';

export const OcTeamMembers = () => {
  const { members, notificationMessage } = useOcTeam();

  return (
    <>
      {notificationMessage && (
        <Alert type="success" description={notificationMessage} />
      )}
      <ul className='class="list-none flex flex-wrap flex-col gap-y-6 ps-0 pe-0'>
        {members.map((member) => (
          <li key={member.id}>
            <OcTeamMember member={member} />
          </li>
        ))}
      </ul>
    </>
  );
};
