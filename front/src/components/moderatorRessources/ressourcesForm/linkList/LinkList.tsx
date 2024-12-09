import { Alert } from '../../../common/alert/Alert.tsx';
import { Button } from '../../../common/button/Button.tsx';
import { DownloadLink } from '../../../common/dowloadLink/DowloadLink.tsx';
import { LoginContext } from '../../../../contexts/LoginContext.tsx';
import { ModeratorRessourcesFromAPI } from '../../../../domain/ModeratorRessources.ts';
import { axiosInstance } from '../../../../RequestInterceptor.tsx';
import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { convertOctetsToKo } from '@/utils/convertOctetsToKo.ts';

export const LinkListForm = ({ thematiqueId }: { thematiqueId: number }) => {
  const [files, setFiles] = useState<ModeratorRessourcesFromAPI[]>([]);
  const [error, setError] = useState<string>('');

  const { setIsLogged } = useContext(LoginContext);

  const deleteFile = async (fileId: number) => {
    axiosInstance
      .delete(`/moderateur/fichiers/${fileId}`, {
        withCredentials: true,
      })
      .then(() => {
        setIsLogged(false);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLogged(true);
        }, 1000);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/moderateur/fichiers/search?thematiqueId=${thematiqueId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
        setError(error.message);
      });
  }, [thematiqueId]);

  return (
    <>
      {files.length === 0 ? (
        <Alert
          type="info"
          label="Aucun fichier disponible"
          description="Aucun fichier n'est disponible pour cette thématique."
        />
      ) : (
        <div className="form__container">
          <ul className="link__list-display">
            {files.length > 0 &&
              files.map((file: ModeratorRessourcesFromAPI, index: number) => (
                <li
                  key={index}
                  className="link__list-item flex flex-col items-start"
                >
                  <DownloadLink
                    fileName={file.nom}
                    fileType={file.extension.toUpperCase()}
                    fileUrl={`/api/moderateur/fichiers/${file.id}`}
                    fileWeight={convertOctetsToKo(file.taille)}
                  />
                  <Button
                    icon="fr-icon-delete-line"
                    variant="secondary"
                    className="fr-btn--error form_delete__btn fr-btn--sm ml-4 mt-2"
                    type="button"
                    onClick={() => deleteFile(file.id)}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
      {error !== '' && (
        <Alert
          label="Erreur"
          description="Une erreur est survenue lors de la récupération des données."
          type="error"
        />
      )}
    </>
  );
};
