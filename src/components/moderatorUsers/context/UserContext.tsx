import React, { createContext, useContext, useState, ReactNode } from 'react';

import { User } from '@/domain/ModerateurUsers';

interface UserContextType {
  users: User[];
  numberOfUsers: number;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setNumberOfUsers: React.Dispatch<React.SetStateAction<number>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

  const value = {
    users,
    numberOfUsers,
    setUsers,
    setNumberOfUsers,
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
