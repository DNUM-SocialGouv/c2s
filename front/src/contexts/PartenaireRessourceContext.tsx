import { PartenaireRessourcesFromAPI } from '@/domain/RessourceFile.ts';
import React, { createContext, useState, ReactNode } from 'react';

interface PartenaireRessourcesContext {
  ressourcesFromAPI: PartenaireRessourcesFromAPI;
  setRessourcesFromAPI: React.Dispatch<
    React.SetStateAction<PartenaireRessourcesFromAPI>
  >;
  mappedRessources: PartenaireRessourcesFromAPI;
  setMappedRessources: React.Dispatch<
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
    ressourcesFromAPI: initialValue,
    setRessourcesFromAPI: () => undefined,
    mappedRessources: initialValue,
    setMappedRessources: () => undefined,
  });

export const PartenaireRessourcesProvider = (props: {
  children: ReactNode;
}) => {
  const [thematiques, setThematiques] =
    useState<PartenaireRessourcesFromAPI>(initialValue);

  const [mappedRessources, setMappedRessources] =
    useState<PartenaireRessourcesFromAPI>(initialValue);

  return (
    <PartenaireRessourcesContext.Provider
      value={{
        ressourcesFromAPI: thematiques,
        setRessourcesFromAPI: setThematiques,
        mappedRessources: mappedRessources,
        setMappedRessources: setMappedRessources,
      }}
    >
      {props.children}
    </PartenaireRessourcesContext.Provider>
  );
};
