import { Alert } from '../../common/alert/Alert.tsx';
import { Button } from '../../common/button/Button.tsx';
import { LoginContext } from '../../../contexts/LoginContext.tsx';
import { ModeratorThematiqueFromAPI } from '../../../domain/ModeratorRessources.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { COMMON, MODERATOR_RESOURCES_ADD_FILE_FORM } from '../../../wording.ts';
import { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';

interface AddRessourceFormProps {
  onClickCancel: () => void;
}

export const AddRessourceForm: React.FC<AddRessourceFormProps> = ({
  onClickCancel,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [thematiqueId, setThematiqueId] = useState<number | null>(null);
  const [themathiquesPubliees, setThemathiquesPubliees] = useState<
    ModeratorThematiqueFromAPI[]
  >([]);

  const { setIsLogged } = useContext(LoginContext);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '') {
      setThematiqueId(Number(e.target.value));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);

      axiosInstance
        .post<ModeratorThematiqueFromAPI[]>(
          `/moderateur/fichiers?ressourceThematiqueId=${thematiqueId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        )
        .then(() => {
          setIsLogged(false);
        })
        .catch((error: AxiosError) => {
          console.error(error);
          setErrorText(
            "Erreur lors de l'ajout du fichier. Le type de fichier n'est pas autorisé."
          );
          setError(true);
        })
        .finally(() => {
          setTimeout(() => {
            setIsLogged(true);
          }, 2000);
        });
    } else {
      setError(true);
      setErrorText(MODERATOR_RESOURCES_ADD_FILE_FORM.fileIsRequired);
    }

    if (thematiqueId === null) {
      setError(true);
      if (errorText === '') {
        setErrorText(MODERATOR_RESOURCES_ADD_FILE_FORM.requiredThematique);
      } else {
        setErrorText(
          errorText + '\n' + MODERATOR_RESOURCES_ADD_FILE_FORM.requiredFile
        );
      }
    }
  };

  const fetchThematiques = async () => {
    axiosInstance
      .get<ModeratorThematiqueFromAPI[]>('/moderateur/thematiques', {
        withCredentials: true,
      })
      .then((response) => {
        setThemathiquesPubliees(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
        setError(true);
        setErrorText('Erreur lors de la récupération des thématiques');
      });
  };

  useEffect(() => {
    fetchThematiques();
  }, []);

  return (
    <>
      <div className="form__container">
        <div>
          <h4 className="form__title--style">
            {MODERATOR_RESOURCES_ADD_FILE_FORM.addRessource}
          </h4>
        </div>
      </div>
      <div className="fr-select-group" style={{ width: '30%' }}>
        <label className="fr-label" htmlFor="select">
          {MODERATOR_RESOURCES_ADD_FILE_FORM.thematique}
        </label>
        <select
          className="fr-select"
          id="select"
          name="select"
          onChange={handleStatusChange}
        >
          <option value={MODERATOR_RESOURCES_ADD_FILE_FORM.selectOption}>
            {MODERATOR_RESOURCES_ADD_FILE_FORM.selectOption}
          </option>
          {themathiquesPubliees.map((thematique, index: number) => (
            <option key={index} value={thematique.id}>
              {thematique.titre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="fr-upload-group mb-4">
          <label className="fr-label" htmlFor="file-upload">
            {MODERATOR_RESOURCES_ADD_FILE_FORM.addFile}
            <span className="fr-hint-text">
              {MODERATOR_RESOURCES_ADD_FILE_FORM.acceptedFiles}
            </span>
          </label>
          <input
            className="fr-upload"
            type="file"
            id="file-upload"
            name="file-upload"
            onChange={handleFileChange}
          />
        </div>
        <hr />
        {error && (
          <div className="pb-2">
            <Alert
              label="Une erreur est survenue."
              type="error"
              description={errorText}
              onClose={() => setError(false)}
            />
          </div>
        )}
        <div className="flex mt-4" style={{ justifyContent: 'flex-end' }}>
          <div className="mr-8">
            <Button
              variant="secondary"
              onClick={onClickCancel}
              label={COMMON.cancel}
            />
          </div>
          <div>
            <Button
              variant="primary"
              onClick={handleUpload}
              label={COMMON.confirm}
            />
          </div>
        </div>
      </div>
    </>
  );
};
