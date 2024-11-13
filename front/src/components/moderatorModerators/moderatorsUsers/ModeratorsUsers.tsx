import { useContext } from 'react';
import { ModeratorsUser } from '../moderatorsUser/ModeratorUser';
import { Alert } from '../../common/alert/Alert.tsx';
import { ModeratorModeratorsContext } from '../../../contexts/ModeratorModeratorsContext.tsx';

export const ModeratorsUsers = () => {
  const { users, notificationMessage } = useContext(ModeratorModeratorsContext);

  return (
    <>
      {notificationMessage && (
        <Alert type="success" description={notificationMessage} />
      )}
      <ul className="list-none flex flex-wrap flex-col gap-y-6 ps-0 pe-0">
        {users.map((user) => (
          <li key={user.id}>
            <ModeratorsUser user={user} />
          </li>
        ))}
      </ul>
    </>
  );
};
