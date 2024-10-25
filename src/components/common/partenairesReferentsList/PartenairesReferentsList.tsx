import { Button } from '@/components/common/button/Button';
import { axiosInstance } from '@/RequestInterceptor';
import React, { useState } from 'react';
import { Alert } from '../alert/Alert';
import { PARTENAIRES_RESSOURCES } from '@/wording';

export const PartenairesReferentsList: React.FC = () => {
  const [error, setError] = useState<boolean>(false);

  const downloadReferentsList = () => {
    axiosInstance
      .get('/partenaire/ressources/referents', {
        withCredentials: true,
        headers: {
          'Content-Type': 'text/csv',
        },
      })
      .then((response) => {
        console.info(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  };

  return (
    <div>
      <h3>{PARTENAIRES_RESSOURCES.ListeDesReferentsTitre}</h3>
      <p className="txt-chapo mb-0">
        {PARTENAIRES_RESSOURCES.listeDesReferentsChapo}
      </p>
      <div className="pt-16 pb-16 pl-4">
        <Button
          label="Télécharger la liste des référents"
          variant="secondary"
          onClick={downloadReferentsList}
        />
      </div>
      {error && (
        <Alert
          label="Erreur"
          description="Une erreur est survenue lors de la génération du fichier."
          type="error"
        />
      )}
    </div>
  );
};
