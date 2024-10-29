import { Button } from '../../common/button/Button.tsx';
import { Ressources } from '../../common/svg/Ressources.tsx';
import './RessourcesHeader.css';
import { MODERATOR_RESOURCES_HEADER } from '../../../wording.ts';
import { DialogV2 } from '../../common/modal/DialogV2.tsx';
import { useEffect, useState } from 'react';
import { AddThematiqueForm } from '../addThematiqueForm/AddThematiqueForm.tsx';
import { ModeratorThematiqueFromAPI } from '../../../domain/ModeratorRessources.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { Alert } from '../../common/alert/Alert.tsx';
import { AddRessourceForm } from '../addRessourceForm/AddRessourceForm.tsx';

export const RessourcesHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRessourcesModalOpen, setIsRessourcesModalOpen] =
    useState<boolean>(false);
  const [ressourcesPubliees, setRessourcesPubliees] = useState<
    ModeratorThematiqueFromAPI[]
  >([]);
  const [error, setError] = useState<boolean>(false);

  const fetchFiles = async () => {
    try {
      const response = await axiosInstance.get<ModeratorThematiqueFromAPI[]>(
        '/moderateur/fichiers/',
        {
          withCredentials: true,
        }
      );
      const thematiquesFromAPI = response.data;
      setRessourcesPubliees(thematiquesFromAPI);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const onClickCancel = () => {
    setIsRessourcesModalOpen(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <header className="header flex flex-col md:flex-row justify-start items-start md:items-center">
        <div className="md:mr-6">
          <Ressources />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col">
            <h2 className="mb-0 mt-4 ressources__header--font-size">
              {MODERATOR_RESOURCES_HEADER.title}
            </h2>
            <p className="txt-chapo mb-0">
              {ressourcesPubliees.length} {MODERATOR_RESOURCES_HEADER.count}
            </p>
          </div>
          <div className="flex">
            <Button
              label={MODERATOR_RESOURCES_HEADER.newThematic}
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
            />
            <div className="header_btn--margin">
              <Button
                label={MODERATOR_RESOURCES_HEADER.newResource}
                onClick={() => setIsRessourcesModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>
      {error && (
        <Alert
          label="Erreur"
          description="Une erreur est survenue lors de la récupération des ressources publiées."
          type="error"
        />
      )}
      <DialogV2
        isOpen={isModalOpen}
        onClickClose={() => setIsModalOpen(false)}
        size="lg"
        children={<AddThematiqueForm onClickCancel={onClickCancel} />}
      />
      <DialogV2
        isOpen={isRessourcesModalOpen}
        onClickClose={() => setIsRessourcesModalOpen(false)}
        size="lg"
        children={<AddRessourceForm onClickCancel={onClickCancel} />}
      />
    </>
  );
};
