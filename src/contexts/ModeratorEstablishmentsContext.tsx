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
  activeOC: number;
  setActiveOC: React.Dispatch<React.SetStateAction<number>>;
  pointsAccueilCount: number;
  setPointsAccueilCount: React.Dispatch<React.SetStateAction<number>>;
}

const ModeratorEstablishmentsContext = createContext<
  ModeratorEstablishmentContextType | undefined
>(undefined);

export const ModeratorEstablishmentsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [establishements, setEstablishements] = useState<Establishment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [establishmentType, setEstablishmentType] = useState<EstablishmentType>(
    'ORGANISME_COMPLEMENTAIRE'
  );
  const [region, setRegion] = useState<string>('');
  const [departement, setDepartement] = useState<string>('');
  const [activeOC, setActiveOC] = useState<number>(0);
  const [pointsAccueilCount, setPointsAccueilCount] = useState<number>(0);

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
    activeOC,
    setActiveOC,
    pointsAccueilCount,
    setPointsAccueilCount,
  };

  return (
    <ModeratorEstablishmentsContext.Provider value={value}>
      {children}
    </ModeratorEstablishmentsContext.Provider>
  );
};
// FIXME: il y a warning ici : Fast refresh only works when a file only exports components.
//Use a new file to share constants or functions between components
// Il faut l'exporter comme custum hook
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
