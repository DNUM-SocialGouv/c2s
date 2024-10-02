import { Alert } from '@/components/common/alert/Alert';
import { DownloadLink } from '@/components/common/dowloadLink/DowloadLink';
import { ModeratorRessourcesFromAPI } from '@/domain/ModeratorRessources';
import { axiosInstance } from '@/RequestInterceptor';
import { useEffect, useState } from 'react';

export const LinkListForm = ({ thematiqueId }: { thematiqueId: number }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/moderateur/fichiers/search?thematiqueId=${thematiqueId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setFiles(response.data);
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
                <DownloadLink
                  fileName={file.nom}
                  fileType={file.extension}
                  fileUrl={file.repertoire}
                  fileWeight={file.taille}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
