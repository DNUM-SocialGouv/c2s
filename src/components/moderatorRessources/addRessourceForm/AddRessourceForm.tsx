import { Alert } from '@/components/common/alert/Alert';
import { Button } from '@/components/common/button/Button';
import { ModeratorThematiqueFromAPI } from '@/domain/ModeratorRessources';
import { axiosInstance } from '@/RequestInterceptor';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

export const AddRessourceForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [thematiqueId, setThematiqueId] = useState<number | null>(null);
  const [themathiquesPubliees, setThemathiquesPubliees] = useState<ModeratorThematiqueFromAPI[]>([])

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   if(e.target.value !== '') {
    setThematiqueId(Number(e.target.value));
   }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.info('Uploading file...');

      const formData = new FormData();
      formData.append('file', file);

      try {
        await axiosInstance.post(
          `/api/moderateur/fichiers?ressourceThematiqueId=${thematiqueId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        setError(true);
        console.error(error);
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
      });
  };

  useEffect(() => {
    fetchThematiques();
  }, []);

  return (
    <>
      <div className="form__container">
        <div>
          <h4 className="form__title--style">Ajouter une nouvelle ressource</h4>
        </div>
      </div>
      <div className="fr-select-group" style={{ width: '50%' }}>
        <label className="fr-label" htmlFor="select">
          Thématique de la ressource
        </label>
        <select className="fr-select" id="select" name="select" onChange={handleStatusChange}>
          <option value="" selected disabled hidden>
            Sélectionner une option
          </option>
          {themathiquesPubliees.map((thematique, index: number) => (
                <option key={index} value={thematique.description}>
                  {thematique.titre}
                </option>
              ))}
        </select>
      </div>
      <div className="">
        <div className="fr-upload-group mb-4">
          <label className="fr-label" htmlFor="file-upload">
            Ajouter des fichiers
            <span className="fr-hint-text">
              Taille maximale : 20 Mo. Formats supportés : jpg, png, pdf, csv,
              xls.
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
          <>
            <Alert
              label="Une erreur est survenue."
              type="error"
              description={`Une erreur est survenue lors de l'enregistrement de la ressource.`}
              onClose={() => setError(false)}
            />
            <br />
          </>
        )}
        <div className="flex mt-4" style={{ justifyContent: 'flex-end' }}>
          <Button
            variant="primary"
            onClick={handleUpload}
            label="Enregistrer"
          />
        </div>
      </div>
    </>
  );
};
