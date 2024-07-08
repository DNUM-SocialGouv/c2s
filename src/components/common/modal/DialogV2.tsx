import React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { COMMON } from '@/wording';
interface ModalProps {
  titre?: string;
  description: string;
  isOpen: boolean;
  size?: 'md' | 'lg';
  onClickCancel?: () => void;
  onClickConfirm?: () => void;
  onClickClose?: () => void;
  children?: React.ReactNode;
  arrowIcon?: boolean;
}

export const DialogV2: React.FC<ModalProps> = ({
  titre,
  description,
  isOpen,
  size = 'md',
  onClickCancel,
  onClickConfirm,
  onClickClose,
  arrowIcon = true,
  children,
}) => {
  const style =
    size === 'lg'
      ? {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          outline: 'none',
        }
      : {
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
                  onClick={onClickClose || onClickCancel}
                >
                  {COMMON.close}
                </button>
              </div>
              <div className="fr-modal__content">
                {titre && (
                  <h1 id="fr-modal-2-title" className="fr-modal__title">
                    {arrowIcon ? (
                      <span className="fr-icon-arrow-right-line fr-icon--lg"></span>
                    ) : (
                      ''
                    )}
                    {titre}
                  </h1>
                )}
                <p>{description}</p>
                <div>{children}</div>
              </div>
              <div className="fr-modal__footer">
                <div className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                  {onClickConfirm && (
                    <button
                      type="button"
                      className="fr-btn fr-btn--icon-left"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickConfirm();
                      }}
                    >
                      {COMMON.confirm}
                    </button>
                  )}

                  {onClickCancel && (
                    <button
                      className="fr-btn fr-btn--icon-left fr-btn--secondary"
                      onClick={onClickCancel}
                    >
                      {COMMON.cancel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
