import { Button } from '@/components/common/button/Button';
import React from 'react';

export const PartenairesReferentsList: React.FC = () => {
  return (
    <div>
      <h3>Référents Gestion C2S</h3>
      <p className="txt-chapo mb-0">
        Téléchargez la liste complète des référents Gestion C2S de chaque
        organisme complémentaire
      </p>
      <div className="pt-16 pb-16 pl-4">
        <Button
          label="Télécharger la liste des référents"
          variant="secondary"
        />
      </div>
    </div>
  );
};
