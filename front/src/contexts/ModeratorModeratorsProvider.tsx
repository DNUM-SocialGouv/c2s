import { useEffect, useState } from 'react';
import { Moderator } from '../domain/ModeratorModerators.ts';
import { axiosInstance } from '../RequestInterceptor.tsx';
import { ModeratorModeratorsContext } from '../contexts/ModeratorModeratorsContext.tsx';

export const ModeratorModeratorsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [users, setUsers] = useState<Moderator[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );
  const endpoint = '/moderateur/moderateurs';

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get<Moderator[]>(endpoint, {
        withCredentials: true,
      });
      setUsers(data ?? []);
      setTotalUsers(data?.length ?? 0);
    } catch (error) {
      console.error('une erreur est survenue:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  return (
    <ModeratorModeratorsContext.Provider
      value={{
        users,
        totalUsers,
        refetchUsers: fetchUsers,
        notificationMessage,
        showNotification,
      }}
    >
      {children}
    </ModeratorModeratorsContext.Provider>
  );
};
