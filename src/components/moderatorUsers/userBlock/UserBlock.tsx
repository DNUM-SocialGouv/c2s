import { useId, useState } from 'react';
import { Avatar } from '@/components/common/svg/Avatar';
import { Button } from '@/components/common/button/Button';
import { Accordion } from '@/components/common/accordion/Accordion';
import { UserInformations } from '@/components/moderatorUsers/userInformations/UserInformations';
import { DialogV2 } from '@/components/common/modal/DialogV2';
import { User, StatusUpdateResponse } from '@/domain/ModerateurUsers';
import { MODERATOR_USERS } from '@/wording';
import { UserStatus } from '@/domain/ModerateurUsers';
import { axiosInstance } from '@/RequestInterceptor';
import { AxiosResponse } from 'axios';
import './UserBlock.css';

const confirmAction = MODERATOR_USERS.confirmAction;
const validateModalText = MODERATOR_USERS.validateConfirm;
const refusalModalText = MODERATOR_USERS.refusalConfirm;

interface UserBlockProps {
  user: User;
  onDataUpdate: () => void;
}

const endpoint = '/moderateur/membres/statut';

export const UserBlock = ({ user, onDataUpdate }: UserBlockProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] =
    useState<boolean>(false);
  const [actionType, setActionType] = useState<'validate' | 'refusal' | null>(
    null
  );

  const handleValidation = async () => {
    if (!user.email) {
      console.log("l'utilisateur n'a pas d'email associé");
      setActionType(null);
      setIsModalOpen(false);
      return;
    }

    const payload = {
      email: user.email,
      statutId: UserStatus.Validated,
    };

    axiosInstance
      .post(endpoint, payload, { withCredentials: true })
      .then((response: AxiosResponse<StatusUpdateResponse>) => {
        if (response.data) {
          setIsModalOpen(false);
          setIsFeedbackModalOpen(true);
          return;
        }

        console.log("erreur, la requête n'a pas fonctionne");
        setIsModalOpen(false);
        onDataUpdate();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleRefusal = () => {
    if (!user.email) {
      console.log("l'utilisateur n'a pas d'email associé");
      setActionType(null);
      setIsModalOpen(false);
      return;
    }

    const payload = {
      email: user.email,
      statutId: UserStatus.Refused,
    };

    axiosInstance
      .post(endpoint, payload, { withCredentials: true })
      .then((response: AxiosResponse<StatusUpdateResponse>) => {
        if (response.data) {
          setIsModalOpen(false);
          setIsFeedbackModalOpen(true);
          return;
        }

        console.log("error, la requête n'a pas fonctionne");
        setIsModalOpen(false);
        onDataUpdate();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div className="fr-container--fluid user-block">
      <header className="header p-6 lg:px-10 flex flex-col md:flex-row justify-start items-start md:items-center p-4">
        <div className="md:mr-6">
          <Avatar />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col">
            <h3 className="user-block__title mb-0 mt-4">
              {user.prenom} {user.nom}
            </h3>
            <p className="txt-chapo mb-0 mt-2">
              <span className="font-bold">{user.fonction}</span> chez{' '}
              <span className="font-bold">{user.societe}</span> (
              {user.typeOrganisation})
            </p>
            <div className="flex gap-x-6 flex-col lg:flex-row">
              <div className="flex mt-3 md:mt-2">
                <span
                  className="fr-icon-mail-fill pr-3"
                  aria-hidden="true"
                ></span>
                <p className="mb-0">{user.email}</p>
              </div>
              {user.telephone && (
                <div className="flex mt-3 md:mt-2">
                  <span
                    className="fr-icon-phone-fill pr-3"
                    aria-hidden="true"
                  ></span>
                  <p>{user.telephone}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Button
              className="flex-1 w-full"
              label={MODERATOR_USERS.btnValidate}
              icon="success-line"
              aria-label="Validate form"
              onClick={() => {
                setActionType('validate');
                setIsModalOpen(true);
              }}
            />
            <Button
              className="flex-1 w-full"
              label={MODERATOR_USERS.btnRefusal}
              variant="secondary"
              icon="close-circle-line"
              onClick={() => {
                setActionType('refusal');
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>
      </header>
      <Accordion title={MODERATOR_USERS.accordionTitle}>
        <UserInformations id={useId()} user={user} />
      </Accordion>
      <DialogV2
        titre={confirmAction}
        description={
          actionType === 'validate' ? validateModalText : refusalModalText
        }
        isOpen={isModalOpen}
        onClickCancel={() => {
          setIsModalOpen(false);
          setActionType(null);
        }}
        onClickConfirm={() => {
          actionType === 'validate' ? handleValidation() : handleRefusal();
        }}
      />
      <DialogV2
        description={
          actionType === 'validate'
            ? MODERATOR_USERS.confirmationMailSent
            : MODERATOR_USERS.refusalConfirmation
        }
        isOpen={isFeedbackModalOpen}
        onClickClose={() => {
          setIsFeedbackModalOpen(false);
          onDataUpdate();
          setActionType(null);
        }}
      />
    </div>
  );
};
