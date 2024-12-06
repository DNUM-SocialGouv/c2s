import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Establishment,
  EstablishmentType,
} from '../domain/ModeratorEstablishments.ts';

export interface ModeratorEstablishmentContextType {
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
  closeModal: () => void;
  openModal: (siren: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goToNextModalStep: () => void;
  currentEstablishmentSiren: string | null;
  setCurrentEstablishmentSiren: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  modalStep: 1 | 2;
}

export const ModeratorEstablishmentsContext = createContext<
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEstablishmentSiren, setCurrentEstablishmentSiren] = useState<
    string | null
  >(null);
  const [modalStep, setModalStep] = useState<1 | 2>(1);

  const openModal = (siren: string) => {
    setCurrentEstablishmentSiren(siren);
    setModalStep(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEstablishmentSiren(null);
    setModalStep(1);
  };

  const goToNextModalStep = () => {
    if (modalStep === 1) {
      setModalStep(2);
    }
  };

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
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal,
    goToNextModalStep,
    currentEstablishmentSiren,
    setCurrentEstablishmentSiren,
    modalStep,
  };

  return (
    <ModeratorEstablishmentsContext.Provider value={value}>
      {children}
    </ModeratorEstablishmentsContext.Provider>
  );
};
// FIXME: il y a warning ici : Fast refresh only works when a file only exports components.
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
