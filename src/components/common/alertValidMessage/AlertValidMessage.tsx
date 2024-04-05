import React from 'react';

interface AlertComponentProps {
  successMessage?: string;
  isVisible: boolean; // Ajout d'une prop pour contrôler la visibilité
  onClose: () => void; // Prop pour gérer la fermeture
}

const AlertValidMessage: React.FC<AlertComponentProps> = ({ successMessage = "", isVisible, onClose }) => {
  return (
    <>
      {isVisible && (
        <div className="mt-4 fr-alert fr-alert--success">
          <p>{successMessage}</p>
          <button onClick={onClose} className="fr-link--close fr-link" aria-label="Fermer">
            Fermer
          </button>
        </div>
      )}
    </>
  );
}

export default AlertValidMessage;