import { ModeratorThematiqueFromAPI } from '../domain/ModeratorRessources.ts';
import React, { createContext, useState, ReactNode } from 'react';

interface ModeratorRessourcesContext {
  thematiques: ModeratorThematiqueFromAPI[];
  setThematiques: React.Dispatch<
    React.SetStateAction<ModeratorThematiqueFromAPI[]>
  >;
}

const initialValue: ModeratorThematiqueFromAPI[] = [
  {
    id: 0,
    titre: '',
    description: '',
    groupes: ['CAISSE'],
    ordre: -1,
  },
];

export const ModeratorRessourcesContext =
  createContext<ModeratorRessourcesContext>({
    thematiques: initialValue,
    setThematiques: () => undefined,
  });

export const ModeratorRessourcesProvider = (props: { children: ReactNode }) => {
  const [thematiques, setThematiques] =
    useState<ModeratorThematiqueFromAPI[]>(initialValue);

  return (
    <ModeratorRessourcesContext.Provider
      value={{
        thematiques: thematiques,
        setThematiques: setThematiques,
      }}
    >
      {props.children}
    </ModeratorRessourcesContext.Provider>
  );
};
