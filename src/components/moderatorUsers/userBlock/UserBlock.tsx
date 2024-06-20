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
const confirmUserValidation = MODERATOR_USERS.confirmUserValidation;
const confirmUserRefusal = MODERATOR_USERS.confirmUserRefusal;
const confirmUserUnsubscribe = MODERATOR_USERS.confirmUserUnsubscribe;

interface UserBlockProps {
  user: User;
  onDataUpdate: () => void;
  singleAction?: boolean;
}

const endpoint = '/moderateur/membres/statut';

const isAbortError = (error: unknown): error is DOMException => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as DOMException).name === 'AbortError'
  );
};

export const UserBlock = ({
  user,
  onDataUpdate,
  singleAction = false,
}: UserBlockProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] =
    useState<boolean>(false);
  const [actionType, setActionType] = useState<
    'validate' | 'refusal' | 'unsubscribe' | null
  >(null);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const getModalText = (
    actionType: 'validate' | 'refusal' | 'unsubscribe' | null
  ) => {
    switch (actionType) {
      case 'validate':
        return confirmUserValidation;
      case 'refusal':
        return confirmUserRefusal;
      case 'unsubscribe':
        return confirmUserUnsubscribe;
      default:
        return '';
    }
  };

  const handleAction = async (
    actionType: 'validate' | 'refusal' | 'unsubscribe'
  ) => {
    if (!user.email) {
      console.error("l'utilisateur n'a pas d'email associé");
      setActionType(null);
      setIsModalOpen(false);
      return;
    }

    const statusMap = {
      validate: UserStatus.Validated,
      refusal: UserStatus.Refused,
      unsubscribe: UserStatus.Unsubscribed,
    };

    const payload = {
      email: user.email,
      statut: statusMap[actionType],
    };

    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      const response: AxiosResponse<StatusUpdateResponse> =
        await axiosInstance.post(endpoint, payload, {
          withCredentials: true,
          signal: newAbortController.signal,
        });

      if (response.data) {
        setIsModalOpen(false);
        setIsFeedbackModalOpen(true);
        return;
      }

      console.log("erreur, la requête n'a pas fonctionné");
      setIsModalOpen(false);
      onDataUpdate();
    } catch (error) {
      if (isAbortError(error)) {
        console.log('Request was aborted');
      } else {
        console.log('error', error);
      }
    }
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
          <div className="flex flex-col items-start lg:items-center gap-y-4 mt-4 lg:mt-0">
            {singleAction && (
              <Button
                className="flex-1 fr-btn--full-width fr-btn--transform-none fr-btn--error"
                icon="fr-icon-delete-line"
                onClick={() => {
                  setActionType('unsubscribe');
                  setIsModalOpen(true);
                }}
              />
            )}
            {!singleAction && (
              <>
                <Button
                  className="flex-1 fr-btn--full-width fr-btn--transform-none"
                  label={MODERATOR_USERS.btnValidate}
                  icon="success-line"
                  aria-label="Validate form"
                  onClick={() => {
                    setActionType('validate');
                    setIsModalOpen(true);
                  }}
                />
                <Button
                  className="flex-1 w-full fr-btn--transform-none"
                  label={MODERATOR_USERS.btnRefusal}
                  variant="secondary"
                  icon="close-circle-line"
                  onClick={() => {
                    setActionType('refusal');
                    setIsModalOpen(true);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </header>
      <Accordion title={MODERATOR_USERS.accordionTitle}>
        <UserInformations id={useId()} user={user} />
      </Accordion>
      <DialogV2
        titre={confirmAction}
        description={getModalText(actionType)}
        isOpen={isModalOpen}
        onClickCancel={() => {
          setIsModalOpen(false);
          setActionType(null);
        }}
        onClickConfirm={() => {
          if (actionType) {
            handleAction(actionType);
          }
        }}
      />
      <DialogV2
        description={
          actionType === 'validate'
            ? MODERATOR_USERS.confirmationMailSent
            : actionType === 'refusal'
              ? MODERATOR_USERS.refusalConfirmation
              : MODERATOR_USERS.unsubscribeConfirmation
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
