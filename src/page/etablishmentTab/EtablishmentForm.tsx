import React, { useState } from 'react';
import FormInput from '@/components/common/input/FormInput';

import RadioGroup from '@/components/common/radioGroup/RadioGroup';
import { FormDataOC } from '@/page/etablishmentTab/Contants.ts';
import AlertValidMessage from '@/components/common/alertValidMessage/AlertValidMessage.tsx';
interface EtablishmentFormProps {
  formDataOC: FormDataOC;
  emailError: string;
  phoneError: string;
  siteWebError: string;
  importantFieldsError: string;
  handleInputChangeOC: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitOC: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EtablishmentForm: React.FC<EtablishmentFormProps> = ({
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
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormInput
            label="Dénomination de la société"
            name="nom"
            value={formDataOC.nom}
            onChange={handleInputChangeOC}
            isDisabled={true}
          />
          <FormInput
            label="Siren"
            name="locSiren"
            value={formDataOC.locSiren}
            onChange={handleInputChangeOC}
            isDisabled={true}
          />
          <FormInput
            label="E-mail"
            name="email"
            value={formDataOC.email}
            onChange={handleInputChangeOC}
            isError={emailError !== ''}
            errorMessage={emailError}
          />
          <FormInput
            label="Site web"
            name="siteWeb"
            value={formDataOC.siteWeb}
            onChange={handleInputChangeOC}
            isError={siteWebError !== ''}
            errorMessage={siteWebError}
          />
        </div>

        <div className="w-full md:w-1/2 px-3">
          <FormInput
            label="Adresse"
            name="adresse"
            value={formDataOC.adresse}
            onChange={handleInputChangeOC}
            isDisabled={true}
          />
          <RadioGroup
            selectedValue={formDataOC.groupe}
            onChange={handleInputChangeOC}
            isDisabled={true}
            options={[
              {
                value: 'ORGANISME_COMPLEMENTAIRE',
                label: 'Organisme complémentaire',
              },
              {
                value: 'CAISSE',
                label: "Caisse d'assurance maladie",
              },
            ]}
          />
          <FormInput
            label="Téléphone"
            name="telephone"
            value={formDataOC.telephone}
            onChange={handleInputChangeOC}
            isError={phoneError !== ''}
            errorMessage={phoneError}
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
                  Inclure le siège comme un point d'accueil
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

export default EtablishmentForm;
