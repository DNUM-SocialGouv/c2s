import { createContext } from 'react';
import { Moderator } from '../domain/ModeratorModerators.ts';

interface ModeratorModeratorsContextProps {
  users: Moderator[];
  totalUsers: number;
  refetchUsers: () => Promise<void>;
  notificationMessage: string | null;
  showNotification: (message: string) => void;
}

export const ModeratorModeratorsContext = createContext<
  ModeratorModeratorsContextProps | undefined
>(undefined);
