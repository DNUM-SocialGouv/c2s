import React, { useState } from 'react';
import FormInput from '@/components/common/input/FormInput';
import { FormDataOC } from '@/page/etablishmentTab/Contants.ts';
import AlertValidMessage from '@/components/common/alertValidMessage/AlertValidMessage.tsx';
import { OC_MES_ETABLISSEMENTS } from '@/wording';

interface SiegeFormProps {
  formDataOC: FormDataOC;
  emailError: string;
  phoneError: string;
  siteWebError: string;
  importantFieldsError: string;
  handleInputChangeOC: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitOC: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const SiegeForm: React.FC<SiegeFormProps> = ({
  formDataOC,
  emailError,
  phoneError,
  siteWebError,
  importantFieldsError,
  handleInputChangeOC,
  handleSubmitOC,
}) => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSubmitWithNotification = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    handleSubmitOC(e);
    setSuccessMessage('Le siège est mis à jour.');
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <form
      onSubmit={handleSubmitWithNotification}
      className="max-w-4xl mx-auto p-5 border border-gray-200"
      data-testid="siege-form"
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormInput
            label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.denominationSociete}
            name="nom"
            value={formDataOC.nom ?? ''}
            onChange={handleInputChangeOC}
            isDisabled={true}
          />
          <FormInput
            label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.siren}
            name="locSiren"
            value={formDataOC.locSiren ?? ''}
            onChange={handleInputChangeOC}
            isDisabled={true}
          />
          <FormInput
            label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.email}
            name="email"
            value={formDataOC.email ?? ''}
            onChange={handleInputChangeOC}
            isError={emailError !== ''}
            errorMessage={emailError}
          />
        </div>

        <div className="w-full md:w-1/2 px-3">
          <FormInput
            label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.adresse}
            name="adresse"
            value={formDataOC.adresse ?? ''}
            onChange={handleInputChangeOC}
            isDisabled={true}
          />
          <FormInput
            label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.telephone}
            name="telephone"
            value={formDataOC.telephone ?? ''}
            onChange={handleInputChangeOC}
            isError={phoneError !== ''}
            errorMessage={phoneError}
          />
          <FormInput
            label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.siteWeb}
            name="siteWeb"
            value={formDataOC.siteWeb ?? ''}
            onChange={handleInputChangeOC}
            isError={siteWebError !== ''}
            errorMessage={siteWebError}
          />
          <div className="form-group form-check">
            <div className="fr-fieldset__element fr-fieldset__element--inline">
              <div className="fr-checkbox-group">
                <input
                  name="ocAddedtoLPA"
                  id="checkboxes-inline-1"
                  type="checkbox"
                  aria-describedby="checkboxes-inline-1-messages"
                  checked={formDataOC.ocAddedtoLPA}
                  onChange={handleInputChangeOC}
                />
                <label className="fr-label" htmlFor="checkboxes-inline-1">
                  {OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.definirCommeSiege}
                </label>
                <div
                  className="fr-messages-group"
                  id="checkboxes-inline-1-messages"
                  aria-live="assertive"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="fr-btn fr-btn--secondary"
          type="submit"
          disabled={
            emailError !== '' ||
            phoneError !== '' ||
            siteWebError !== '' ||
            importantFieldsError !== ''
          }
        >
          Enregistrer
        </button>
      </div>
      {successMessage && (
        <AlertValidMessage
          successMessage={successMessage}
          isVisible={showAlert}
          onClose={handleClose}
        />
      )}
    </form>
  );
};
