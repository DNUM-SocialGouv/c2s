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
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  departement: string;
  setDepartement: React.Dispatch<React.SetStateAction<string>>;
}

const mockEstablishments: Establishment[] = [
  {
    nom: 'test 1',
    organisationType: 'ORGANISME_COMPLEMENTAIRE',
    locSiren: '123456789',
    adresse: 'rue de la paix',
    email: 'test@test',
    telephone: '0123456789',
    siteWeb: 'https://www.test.com',
  },
  {
    nom: 'test 2',
    organisationType: 'ORGANISME_COMPLEMENTAIRE',
    locSiren: '123456789',
    adresse: 'rue de la guerre',
    email: 'oli@test',
    telephone: '0123456789',
    siteWeb: 'https://www.oli.com',
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
  const [region, setRegion] = useState<string>('');
  const [departement, setDepartement] = useState<string>('');

  const value = {
    establishements,
    setEstablishements,
    searchTerm,
    setSearchTerm,
    establishmentType,
    setEstablishmentType,
    region,
    setRegion,
    departement,
    setDepartement,
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
