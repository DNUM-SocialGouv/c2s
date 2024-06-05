import React, { createContext, useContext, useState, ReactNode } from 'react';

import { User } from '@/domain/ModerateurUsers';

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const value = {
    users,
    setUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
