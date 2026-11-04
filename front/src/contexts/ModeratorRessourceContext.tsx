import { ModeratorRessourcesFromAPI, ModeratorThematiqueFromAPI } from '../domain/ModeratorRessources.ts';
import React, { createContext, useState, ReactNode } from 'react';

interface ModeratorRessourcesContext {
  thematiques: ModeratorThematiqueFromAPI[];
  setThematiques: React.Dispatch<
    React.SetStateAction<ModeratorThematiqueFromAPI[]>
  >;
  ressources: ModeratorRessourcesFromAPI[];
  setRessources: React.Dispatch<React.SetStateAction<ModeratorRessourcesFromAPI[]>>;
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
    ressources: [],
    setRessources: () => undefined
  });

export const ModeratorRessourcesProvider = (props: { children: ReactNode }) => {
  const [thematiques, setThematiques] =
    useState<ModeratorThematiqueFromAPI[]>(initialValue);
  const [ ressources, setRessources ] = useState<ModeratorRessourcesFromAPI[]>([]);

  return (
    <ModeratorRessourcesContext.Provider
      value={{
        thematiques: thematiques,
        setThematiques: setThematiques,
        ressources,
        setRessources
      }}
    >
      {props.children}
    </ModeratorRessourcesContext.Provider>
  );
};
