import { Alert } from '@/components/common/alert/Alert';
import { Button } from '@/components/common/button/Button';
import { DownloadLink } from '@/components/common/dowloadLink/DowloadLink';
import { LoginContext } from '@/contexts/LoginContext';
import { ModeratorRessourcesFromAPI } from '@/domain/ModeratorRessources';
import { axiosInstance } from '@/RequestInterceptor';
import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';

export const LinkListForm = ({ thematiqueId }: { thematiqueId: number }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState<string>('');

  const { setIsLogged } = useContext(LoginContext);

  const deleteFile = async (fileId: number) => {
    event?.preventDefault();
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
      .get(`/moderateur/fichiers/`, {
        withCredentials: true,
      })
      .then((response) => {
        const thematiqueList = [];
        response.data.map((file) => {
          if (file.thematique.id === thematiqueId) {
            thematiqueList.push(file);
          }
        });
        setFiles(thematiqueList);
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
            {files.map((file: ModeratorRessourcesFromAPI, index: number) => (
              <li key={index} className="link__list-item">
                <div className="flex">
                  <div>
                    <DownloadLink
                      fileName={file.nom}
                      fileType={file.extension}
                      fileUrl={file.repertoire}
                      fileWeight={file.taille}
                    />
                    <div
                      style={{
                        position: 'relative',
                        left: '250px',
                        top: '-40',
                        bottom: ' 25px',
                      }}
                    >
                      <Button
                        icon="fr-icon-delete-line"
                        variant="secondary"
                        className="fr-btn--error form_delete__btn fr-btn--sm"
                        type="submit"
                        onClick={() => deleteFile(file.id)}
                      />
                    </div>
                  </div>
                </div>
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
