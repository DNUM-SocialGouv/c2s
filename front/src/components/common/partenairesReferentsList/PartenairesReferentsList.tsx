import React from 'react';
import { PARTENAIRES_RESSOURCES } from '../../../wording';

export const PartenairesReferentsList: React.FC = () => {
  return (
    <div>
      <h3>{PARTENAIRES_RESSOURCES.ListeDesReferentsTitre}</h3>
      <p className="txt-chapo mb-0">
        {PARTENAIRES_RESSOURCES.listeDesReferentsChapo}
      </p>
      <div className="pt-16 pb-16 pl-4">
        <a
          className="fr-btn fr-btn--lg fr-icon-download-line fr-btn--icon-left fr-btn--secondary"
          href="/api/partenaire/ressources/referents"
        >
          Télécharger la liste des référents
        </a>
      </div>
    </div>
  );
};
