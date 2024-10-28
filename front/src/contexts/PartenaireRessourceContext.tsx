import { PartenaireRessourcesFromAPI } from '@/domain/RessourceFile.ts';
import React, { createContext, useState, ReactNode } from 'react';

interface PartenaireRessourcesContext {
  ressources: PartenaireRessourcesFromAPI;
  setRessources: React.Dispatch<
    React.SetStateAction<PartenaireRessourcesFromAPI>
  >;
}

const initialValue: PartenaireRessourcesFromAPI = {
  thematiques: [
    {
      id: 0,
      titre: 'sting',
      description: '',
      groupes: ['CAISSE'],
      ordre: 0,
    },
  ],
  fichiers: [
    {
      id: 0,
      thematique: {
        id: 0,
        titre: '',
        description: '',
        groupes: ['CAISSE'],
        ordre: 0,
      },
      nom: '',
      taille: 0,
      extension: '',
      dateCrea: '',
      dateMaj: '',
    },
  ],
};

export const PartenaireRessourcesContext =
  createContext<PartenaireRessourcesContext>({
    ressources: initialValue,
    setRessources: () => undefined,
  });

export const PartenaireRessourcesProvider = (props: {
  children: ReactNode;
}) => {
  const [thematiques, setThematiques] =
    useState<PartenaireRessourcesFromAPI>(initialValue);

  return (
    <PartenaireRessourcesContext.Provider
      value={{
        ressources: thematiques,
        setRessources: setThematiques,
      }}
    >
      {props.children}
    </PartenaireRessourcesContext.Provider>
  );
};
