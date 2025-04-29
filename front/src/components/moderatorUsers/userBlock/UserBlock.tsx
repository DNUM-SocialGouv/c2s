import { useId, useState } from 'react';
import { Avatar } from '../../common/svg/Avatar.tsx';
import { Button } from '../../common/button/Button.tsx';
import { Accordion } from '../../common/accordion/Accordion.tsx';
import { UserInformations } from '../userInformations/UserInformations.tsx';
import { DialogV2 } from '../../common/modal/DialogV2.tsx';
import { User, StatusUpdateResponse } from '../../../domain/ModerateurUsers.ts';
import { MODERATOR_USERS, COMMON } from '../../../wording.ts';
import { UserStatus } from '../../../domain/ModerateurUsers.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { AxiosResponse } from 'axios';

const confirmAction = COMMON.confirmAction;
const confirmUserValidation = MODERATOR_USERS.confirmUserValidation;
const confirmUserRefusal = MODERATOR_USERS.confirmUserRefusal;
const confirmUserDelete = MODERATOR_USERS.confirmUserDelete;

interface UserBlockProps {
  user: User;
  onDataUpdate: () => void;
  singleAction?: boolean;
  onUserClick: (user: User) => void;
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
  onUserClick,
}: UserBlockProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] =
    useState<boolean>(false);
  const [actionType, setActionType] = useState<
    'validate' | 'refusal' | 'delete' | null
  >(null);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [isApiErrorModalOpen, setIsApiErrorModalOpen] =
    useState<boolean>(false);

  const getModalText = (
    actionType: 'validate' | 'refusal' | 'delete' | null
  ) => {
    switch (actionType) {
      case 'validate':
        return confirmUserValidation;
      case 'refusal':
        return confirmUserRefusal;
      case 'delete':
        return confirmUserDelete;
      default:
        return '';
    }
  };

  const getOrganisationType = (user: User): string | null => {
    if (user.typeOrganisation === 'ORGANISME_COMPLEMENTAIRE') {
      return 'Organisme complémentaire';
    } else if (user.typeOrganisation === 'CAISSE') {
      return 'Caisse';
    }
    return null;
  };

  const handleAction = async (
    actionType: 'validate' | 'refusal' | 'delete'
  ) => {
    if (!user.email) {
      console.error("l'utilisateur n'a pas d'email associé");
      setActionType(null);
      setIsModalOpen(false);
      return;
    }

    setIsApiErrorModalOpen(false);

    const statusMap = {
      validate: UserStatus.Valide,
      refusal: UserStatus.Refuse,
      delete: UserStatus.Supprime,
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
      setIsFeedbackModalOpen(false);
      setIsModalOpen(false);
      setIsApiErrorModalOpen(true);
    }
  };
  const handleUserClick = (user: User) => {
    onUserClick(user);
    console.log(`User clicked: ${user.prenom} ${user.nom}`);
  };
  return (
    <div
      className="fr-container--fluid border-[1px] border-[#e5e5e5]"
      onClick={() => handleUserClick(user)}
    >
      <header className="header p-6 lg:px-10 flex flex-col md:flex-row justify-start items-start md:items-center p-4">
        <div className="md:mr-6">
          <Avatar />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col lg:max-w-[80%]">
            <h3 className="text-[24px] mb-0 mt-4">
              {user.prenom} {user.nom}
            </h3>
            <p className="txt-chapo mb-0 mt-2">
              <span className="font-bold">{user.fonction}</span> chez{' '}
              <span className="font-bold">{user.societe}</span> (
              {getOrganisationType(user)})
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
                  setActionType('delete');
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
              : MODERATOR_USERS.deleteConfirmation
        }
        isOpen={isFeedbackModalOpen}
        onClickClose={() => {
          setIsFeedbackModalOpen(false);
          onDataUpdate();
          setActionType(null);
        }}
      />
      <DialogV2
        description="une erreur s'est produite, veuillez reessayer ultérieurement"
        isOpen={isApiErrorModalOpen}
        onClickClose={() => {
          setIsApiErrorModalOpen(false);
        }}
      />
    </div>
  );
};
