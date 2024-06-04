import React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
interface ModalProps {
  titre: string;
  description: string;
  isOpen: boolean;
  onClickCancel: () => void;
  onClickConfirm: () => void;
}

export const DialogForInformationTab: React.FC<ModalProps> = ({
  titre,
  description,
  isOpen,
  onClickCancel,
  onClickConfirm,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    outline: 'none',
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClickCancel}
      aria-labelledby={titre}
      aria-describedby={description}
    >
      <Box sx={style}>
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  title="Fermer la fenêtre modale"
                  aria-controls="fr-modal-1"
                  onClick={onClickCancel}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-icon-arrow-right-line fr-icon--lg"></span>
                  Confirmez cette action
                </h1>
                <p>
                  Vous êtes sur le point de supprimer votre compte de l'espace
                  Partenaire.
                </p>
              </div>
              <div className="fr-modal__footer">
                <div className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                  <button
                    type="button"
                    className="fr-btn fr-btn--icon-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickConfirm();
                    }}
                  >
                    Confirmer
                  </button>
                  <button
                    className="fr-btn fr-btn--icon-left fr-btn--secondary"
                    onClick={onClickCancel}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
