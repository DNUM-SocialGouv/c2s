import React from 'react';
import { Ressources } from '../svg/Ressources';
import { PARTENAIRES_RESSOURCES } from '@/wording';
import { PartenaireFiltres } from '../patenairesFiltre/partenaireFiltres';

export const PartenairesRessourcesHeader: React.FC = () => {
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
            <p className="txt-chapo mb-0">{PARTENAIRES_RESSOURCES.chapo}</p>
          </div>
        </div>
      </header>
      <PartenaireFiltres />
    </>
  );
};
