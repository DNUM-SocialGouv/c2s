import { createContext, useEffect, useState } from 'react';
import { Member } from '@/domain/OcTeam';
import { axiosInstance } from '@/RequestInterceptor';

interface OcTeamContextProps {
  members: Member[];
  totalMembers: number;
  refetchMembers: () => Promise<void>;
  notificationMessage: string | null;
  showNotification: (message: string) => void;
}

export const OcTeamContext = createContext<OcTeamContextProps | undefined>(
  undefined
);

export const OcTeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );
  const endpoint = '/oc/equipes';

  const fetchMembers = async () => {
    try {
      const response = await axiosInstance.get<Member[]>(endpoint, {
        withCredentials: true,
      });
      setMembers(response.data ?? []);
      setTotalMembers(response.data?.length ?? 0);
    } catch (error) {
      console.error('une erreur est survenue:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  return (
    <OcTeamContext.Provider
      value={{
        members,
        totalMembers,
        refetchMembers: fetchMembers,
        notificationMessage,
        showNotification,
      }}
    >
      {children}
    </OcTeamContext.Provider>
  );
};
