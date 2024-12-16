import { useEffect, useState } from 'react';
import { Button } from '../../common/button/Button.tsx';
import { Alert } from '../../common/alert/Alert.tsx';
import { DialogV2 } from '../../common/modal/DialogV2.tsx';
import { Avatar } from '../../common/svg/Avatar.tsx';
import { Moderator } from '../../../domain/ModeratorModerators.ts';
import { useModeratorModeratorsContext } from '../../../hooks/useModeratorModeratorsContext.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { COMMON, MODERATOR_MODERATORS } from '../../../wording.ts';

interface ModeratorsUserProps {
  user: Moderator;
}

export const ModeratorsUser = ({ user }: ModeratorsUserProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { refetchUsers, showNotification } = useModeratorModeratorsContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      closeModal();
      setError(null);
    };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteMember = async (email: string) => {
    setError(null);
    const endpoint = `/moderateur/moderateurs?email=${encodeURIComponent(email)}`;
    try {
      await axiosInstance.delete(endpoint, {
        withCredentials: true,
      });
      closeModal();
      await refetchUsers();
      showNotification(
        `L'utilisateur ${user.prenom} ${user.nom} a bien été supprimé`
      );
    } catch (error: unknown) {
      setError("Une erreur est survenue, l'utilisateur n'a pas été supprimé");
      closeModal();
    }
  };

  return (
    <div className="fr-container--fluid border-[1px] border-[#e5e5e5]">
      <header className="header p-6 lg:px-10 flex flex-col md:flex-row justify-start items-start md:items-center">
        <div className="md:mr-6">
          <Avatar />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col lg:max-w-[80%]">
            <h3 className="text-[24px] mb-0 mt-4">
              {user.prenom} {user.nom}
            </h3>
            <div className="flex gap-x-6 flex-col lg:flex-row">
              {user.email && (
                <div className="flex mt-3 md:mt-2">
                  <span
                    className="fr-icon-mail-fill pr-3"
                    aria-hidden="true"
                  ></span>
                  <p className="mb-0">{user.email}</p>
                </div>
              )}
              {user.telephone && (
                <div className="flex mt-3 md:mt-2">
                  <span
                    className="fr-icon-phone-fill pr-3"
                    aria-hidden="true"
                  ></span>
                  <p className="mb-0">{user.telephone}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-center gap-y-4 mt-4 lg:mt-0">
            <Button
              className="flex-1 fr-btn--full-width fr-btn--transform-none fr-btn--error"
              icon="fr-icon-delete-line"
              onClick={() => {
                setIsModalOpen(true);
                setError(null);
              }}
            />
          </div>
        </div>
      </header>
      <DialogV2
        titre={COMMON.confirmAction}
        description={MODERATOR_MODERATORS.deleteWarning}
        isOpen={isModalOpen}
        onClickCancel={() => {
          closeModal();
        }}
        onClickConfirm={() => {
          deleteMember(user.email);
        }}
      />
      {error && (
        <Alert label={error} type="error" onClose={() => setError(null)} />
      )}
    </div>
  );
};
