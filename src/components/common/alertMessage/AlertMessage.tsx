//TODO: pourrait être plus générique (un seul composant pour gérer tous les types de messages valide, information...)
import React from 'react';

interface AlertComponentProps {
  successMessage?: string;
  type?: 'error' | 'success' | 'info' | 'warning';
  isVisible: boolean; // Ajout d'une prop pour contrôler la visibilité
  onClose: () => void; // Prop pour gérer la fermeture
}

const AlertMessage: React.FC<AlertComponentProps> = ({
  successMessage = '',
  type = 'success',
  isVisible,
  onClose,
}) => {
  const className = `mt-4 fr-alert fr-alert--${type}`;

  return (
    <>
      {isVisible && (
        <div className={className}>
          <p>{successMessage}</p>
          <button
            onClick={onClose}
            className="fr-link--close fr-link"
            aria-label="Fermer"
          >
            Fermer
          </button>
        </div>
      )}
    </>
  );
};

export default AlertMessage;
