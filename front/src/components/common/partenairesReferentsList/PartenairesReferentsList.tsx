import React from 'react';
import { PARTENAIRES_RESSOURCES } from '../../../wording';

interface PartenairesReferentsListProps {
  profile: 'partenaire' | 'moderateur';
}

export const PartenairesReferentsList: React.FC<
  PartenairesReferentsListProps
> = ({ profile }) => {
  const endpoint =
    profile === 'partenaire'
      ? '/api/partenaire/ressources/referents'
      : '/api/moderateur/referents';
  return (
    <div>
      <h3>{PARTENAIRES_RESSOURCES.ListeDesReferentsTitre}</h3>
      <p className="txt-chapo mb-0">
        {PARTENAIRES_RESSOURCES.listeDesReferentsChapo}
      </p>
      <div className="pt-16 pb-16 pl-4">
        <a
          className="fr-btn fr-btn--lg fr-icon-download-line fr-btn--icon-left fr-btn--secondary"
          href={endpoint}
        >
          Télécharger la liste des référents
        </a>
      </div>
    </div>
  );
};
