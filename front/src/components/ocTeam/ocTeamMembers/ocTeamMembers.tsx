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
      <ul className='list-none flex flex-wrap flex-col gap-y-6 ps-0 pe-0'>
        {members.map((member) => (
          // On donne une clé unique à chaque membre et chaque rendu pour empecher React d'afficher une valeur en cache et donc de toujours afficher les données venant du serveur après notament une suppression pour le transfert de contact
          <li key={member.id + Math.random().toString()}>
            <OcTeamMember member={member} />
          </li>
        ))}
      </ul>
    </>
  );
};
