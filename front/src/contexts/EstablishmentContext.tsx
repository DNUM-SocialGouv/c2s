import React, { createContext, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLpa } from '../page/etablishmentTab/action.ts';

interface FilterParams {
  searchQuery: string;
  region: string;
  department: string;
}

// Define the structure for the parameters to pass to deletePoint
interface DeletePointParams {
  id: string;
  siren: string;
  currentPage: number;
  pageSize: number;
  filters: FilterParams;
}

// Define the context type
interface EstablishmentContextType {
  deletePoint: (params: DeletePointParams) => void;
}

// Create the context
export const EstablishmentContext =
  createContext<EstablishmentContextType | null>(null);

// Provider props type
interface EstablishmentProviderProps {
  children: ReactNode;
}

interface FilterParams {
  size: number;
  searchQuery: string;
  region: string;
  department: string;
}

interface DeletePointParams {
  id: string;
  siren: string;
  currentPage: number;
  pageSize: number;
  filters: FilterParams;
}

interface EstablishmentContextType {
  deletePoint: (params: DeletePointParams) => void;
}

interface EstablishmentProviderProps {
  children: ReactNode;
}

export const EstablishmentProvider: React.FC<EstablishmentProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();

  const deletePoint = (params: DeletePointParams) => {
    const { id, siren, currentPage, pageSize, filters } = params;
    dispatch(deleteLpa(id, siren, currentPage, pageSize, filters));
    console.log('Deleting point of care with ID:', id);
  };

  return (
    <EstablishmentContext.Provider value={{ deletePoint }}>
      {children}
    </EstablishmentContext.Provider>
  );
};
