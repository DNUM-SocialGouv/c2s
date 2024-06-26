import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, OrganisationType, UserStatus } from '@/domain/ModerateurUsers';

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  statut: string;
  setStatut: React.Dispatch<React.SetStateAction<string>>;
  organisationType: OrganisationType;
  setOrganisationType: React.Dispatch<React.SetStateAction<OrganisationType>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [statut, setStatut] = useState<string>(UserStatus.ToModerate);
  const [organisationType, setOrganisationType] =
    useState<OrganisationType>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const value = {
    users,
    setUsers,
    statut,
    setStatut,
    organisationType,
    setOrganisationType,
    searchTerm,
    setSearchTerm,
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
