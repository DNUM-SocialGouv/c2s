import React, { useContext, useEffect, useState } from 'react';
import { DownloadLink } from '../dowloadLink/DowloadLink';
import { PartenaireRessourcesContext } from '@/contexts/PartenaireRessourceContext';
import { PartenaireMappedThematique } from '@/domain/RessourceFile';
import { Separator } from '../svg/Seperator';
import { Alert } from '../alert/Alert';
import './PartenaireRessourcesFiles.css';

export const PartenaireRessourcesFiles: React.FC = () => {
  const { mappedRessources } = useContext(PartenaireRessourcesContext);
  const [ressources, setRessources] = useState<PartenaireMappedThematique[]>(
    []
  );

  useEffect(() => {
    if (mappedRessources) {
      setRessources(mappedRessources.thematiques);
    }
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
              <ul className="link__list-display">
                {thematique.associatedFiles.map((file) => (
                  <li key={file.id} className="link__list ">
                    <DownloadLink
                      fileName={file.nom}
                      fileType={file.extension.toLocaleUpperCase()}
                      fileUrl={`/api/partenaire/ressources/fichiers/${file.id}`}
                      fileWeight={(file.taille / 10000).toFixed(2).toString()}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator />
        </div>
      ))}
    </>
  );
};
