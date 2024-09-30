import { useEffect, useState } from 'react';
import { Member } from '@/domain/OcTeam';
import { useOcTeam } from '@/hooks/useOcTeam';
import { Avatar } from '@/components/common/svg/Avatar';
import { Button } from '@/components/common/button/Button';
import { Alert } from '@/components/common/alert/Alert';
import { DialogV2 } from '@/components/common/modal/DialogV2';
import { OcTeamMemberTypes } from '../ocTeamMemberTypes/OcTeamMemberTypes';
import { axiosInstance } from '@/RequestInterceptor';
import { COMMON, OC_TEAM } from '@/wording';
interface OcTeamMemberProps {
  member: Member;
}

export const OcTeamMember = ({ member }: OcTeamMemberProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { refetchMembers, showNotification } = useOcTeam();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setIsModalOpen(false);
      setError(null);
    };
  }, []);

  const deleteMember = async (email: string) => {
    setError(null);
    const endpoint = `/oc/equipes?email=${encodeURIComponent(email)}`;
    try {
      await axiosInstance.delete(endpoint, {
        withCredentials: true,
      });
      setIsModalOpen(false);
      await refetchMembers();
      showNotification(
        `Le membre ${member.prenom} ${member.nom} a bien été supprimé`
      );
    } catch (error) {
      console.error('Error deleting member:', error);
      setError("Une erreur est survenue, l'utilisateur n'a pas été supprimé");
    }
  };

  return (
    <div className="fr-container--fluid border-[1px] border-[#e5e5e5]">
      <header className="header p-6 lg:px-10 flex flex-col md:flex-row justify-start items-start md:items-center p-4">
        <div className="md:mr-6">
          <Avatar />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col lg:max-w-[80%]">
            <h3 className="text-[24px] mb-0 mt-4">
              {member.prenom} {member.nom}
            </h3>
            {member.fonction && member.societe && (
              <p className="txt-chapo mb-0 mt-2">
                <span className="font-bold">{member.fonction}</span> chez{' '}
                <span className="font-bold">{member.societe}</span>
              </p>
            )}
            <div className="flex gap-x-6 flex-col lg:flex-row">
              <div className="flex mt-3 md:mt-2">
                <span
                  className="fr-icon-mail-fill pr-3"
                  aria-hidden="true"
                ></span>
                {member.email && <p className="mb-0">{member.email}</p>}
              </div>
              {member.telephone && (
                <div className="flex mt-3 md:mt-2">
                  <span
                    className="fr-icon-phone-fill pr-3"
                    aria-hidden="true"
                  ></span>
                  <p>{member.telephone}</p>
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
      <OcTeamMemberTypes
        memberTypes={member.types || []}
        memberEmail={member.email}
      />
      <DialogV2
        titre={COMMON.confirmAction}
        description={OC_TEAM.deleteWarning}
        isOpen={isModalOpen && !error}
        onClickCancel={() => {
          setIsModalOpen(false);
        }}
        onClickConfirm={() => {
          deleteMember(member.email);
        }}
      />
      {error && <Alert label={error} type="error" />}
    </div>
  );
};
