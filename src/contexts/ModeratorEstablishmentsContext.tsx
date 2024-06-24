import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Establishment,
  EstablishmentType,
} from '@/domain/ModeratorEstablishments';

interface ModeratorEstablishmentContextType {
  establishements: Establishment[];
  setEstablishements: React.Dispatch<React.SetStateAction<Establishment[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  establishmentType: EstablishmentType;
  setEstablishmentType: React.Dispatch<React.SetStateAction<EstablishmentType>>;
}

const mockEstablishments: Establishment[] = [
  {
    name: 'test 1',
  },
  {
    name: 'test 2',
  },
];

const ModeratorEstablishmentsContext = createContext<
  ModeratorEstablishmentContextType | undefined
>(undefined);

export const ModeratorEstablishmentsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [establishements, setEstablishements] =
    useState<Establishment[]>(mockEstablishments);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [establishmentType, setEstablishmentType] =
    useState<EstablishmentType>('');

  const value = {
    establishements,
    setEstablishements,
    searchTerm,
    setSearchTerm,
    establishmentType,
    setEstablishmentType,
  };

  return (
    <ModeratorEstablishmentsContext.Provider value={value}>
      {children}
    </ModeratorEstablishmentsContext.Provider>
  );
};

export const useModeratorEstablishmentsContext =
  (): ModeratorEstablishmentContextType => {
    const context = useContext(ModeratorEstablishmentsContext);
    if (!context) {
      throw new Error(
        'useModeratorEstablishmentsContext must be used within a ModeratorEstablishmentsProvider'
      );
    }
    return context;
  };
