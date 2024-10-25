import React, { useState } from 'react';
import { Ressources } from '../svg/Ressources';
import { Alert } from '../alert/Alert';
import { PARTENAIRES_RESSOURCES } from '@/wording';

export const PartenairesRessourcesHeader: React.FC = () => {
  const [error] = useState<string>('');

  return (
    <>
      <header className="header flex flex-col md:flex-row justify-start items-start md:items-center">
        <div className="md:mr-6">
          <Ressources />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col">
            <h2 className="mb-0 mt-4 ressources__header--font-size">
              {PARTENAIRES_RESSOURCES.title}
            </h2>
          </div>
        </div>
      </header>
      {error !== '' && (
        <Alert
          label="Erreur"
          description="Une erreur est survenue lors de la récupération des ressources publiées."
          type="error"
        />
      )}
    </>
  );
};
