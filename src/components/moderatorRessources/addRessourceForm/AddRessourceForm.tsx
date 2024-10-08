import { Button } from '@/components/common/button/Button';
import { axiosInstance } from '@/RequestInterceptor';
import React, { useState } from 'react';

export const AddRessourceForm = () => {
  const [file, setFile] = useState<File | null>(null);

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
        const { data: result } = await axiosInstance.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        // FIXME:
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="form__container">
        <div>
          <h4 className="form__title--style">Ajouter une nouvelle ressource</h4>
        </div>
      </div>
      <div className="fr-select-group">
        <label className="fr-label" htmlFor="select">
          Thématique de la ressource
        </label>
        <select className="fr-select" id="select" name="select">
          <option value="" selected disabled hidden>
            Sélectionner une option
          </option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </select>
      </div>
      <div>
        <div className="fr-upload-group">
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
        <div>
          <Button variant="primary" onClick={handleUpload} />
        </div>
      </div>
    </>
  );
};
