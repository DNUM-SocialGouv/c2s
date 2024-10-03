import { Alert } from '@/components/common/alert/Alert';
import { Button } from '@/components/common/button/Button';
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
                        disabled
                        onClick={() => console.log('file.nom')}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
