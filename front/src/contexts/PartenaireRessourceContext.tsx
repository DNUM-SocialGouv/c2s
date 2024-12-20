import {
  PartenaireRessourcesFromAPI,
  PartenairesMappedRessources,
} from '../domain/RessourceFile.ts';
import React, { createContext, useState, ReactNode } from 'react';

interface PartenaireRessourcesContext {
  ressourcesFromAPI: PartenaireRessourcesFromAPI;
  setRessourcesFromAPI: React.Dispatch<
    React.SetStateAction<PartenaireRessourcesFromAPI>
  >;
  mappedRessources: PartenairesMappedRessources;
  setMappedRessources: React.Dispatch<
    React.SetStateAction<PartenairesMappedRessources>
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
  dateMiseAJour: '31 septembre 2024',
};

const mappedInitialValue: PartenairesMappedRessources = {
  thematiques: [
    {
      id: 0,
      titre: 'sting',
      description: '',
      groupes: ['CAISSE'],
      ordre: 0,
      associatedFiles: [
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
  dateMiseAJour: '31 septembre 2024',
};

export const PartenaireRessourcesContext =
  createContext<PartenaireRessourcesContext>({
    ressourcesFromAPI: initialValue,
    setRessourcesFromAPI: () => undefined,
    mappedRessources: mappedInitialValue,
    setMappedRessources: () => undefined,
  });

export const PartenaireRessourcesProvider = (props: {
  children: ReactNode;
}) => {
  const [thematiques, setThematiques] =
    useState<PartenaireRessourcesFromAPI>(initialValue);

  const [mappedRessources, setMappedRessources] =
    useState<PartenairesMappedRessources>(mappedInitialValue);

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
