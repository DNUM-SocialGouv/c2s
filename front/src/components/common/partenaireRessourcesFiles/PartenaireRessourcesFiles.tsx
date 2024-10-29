import React, { useContext, useEffect, useState } from 'react';
import { DownloadLink } from '../dowloadLink/DowloadLink';
import { PartenaireRessourcesContext } from '@/contexts/PartenaireRessourceContext';
import { PartenaireMappedThematique } from '@/domain/RessourceFile';
import { Separator } from '../svg/Seperator';
import { Alert } from '../alert/Alert';

export const PartenaireRessourcesFiles: React.FC = () => {
  const { mappedRessources } = useContext(PartenaireRessourcesContext);
  const [ressources, setRessources] = useState<PartenaireMappedThematique[]>([]);

  useEffect(() => {
    if (mappedRessources) {
      setRessources(mappedRessources.thematiques);
    }
    console.log(mappedRessources);
  }, [mappedRessources]);

  return (
    <>
      {ressources.map((thematique) => (
        <div key={thematique.id}>
          <h3 className="mb-0">{thematique.titre}</h3>
          <p className="txt-chapo mb-0">{thematique.description}</p>
          <div className="pt-8 pb-8">
            {thematique.associatedFiles.length === 0 && (
              <Alert
                type="info"
                label="Aucun fichier disponible"
                description="Aucun fichier n'est disponible pour cette thématique."
              />
            )}
            <div className="flex justify-between">
            {thematique.associatedFiles.map((file) => (
              <div key={file.id}>
                <DownloadLink fileName={file.nom} fileType={(file.extension).toLocaleUpperCase()} fileUrl={'/'} fileWeight={(file.taille / 10000).toFixed(2).toString()}                 
                />
              </div>
            ))}
            </div>
           
          </div>
          <Separator />
        </div>
      ))}
    </>
  );
};
