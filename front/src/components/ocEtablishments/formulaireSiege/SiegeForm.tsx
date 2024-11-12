/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import FormInput from '../../common/input/FormInput.tsx';
import { FormDataOC } from '../Contants.ts';
import AlertValidMessage from '../../common/alertValidMessage/AlertValidMessage.tsx';
import { COMMON, OC_MES_ETABLISSEMENTS } from '../../../wording.ts';
import { InformationMessage } from '../../common/informationMessage/InformationMessage.tsx';
import { Loader } from '@/components/common/loader/Loader.tsx';
import { ErrorMessage } from '@/components/common/error/Error.tsx';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/RequestInterceptor.tsx';
import { isEmailValid, isPhoneValid } from '@/utils/LPAForm.helper.ts';
import { OcEtablissementsContext } from '@/contexts/OcEtablissementsContext.tsx';

export const SiegeForm: React.FC = () => {
  const {setSiegeData} = useContext(OcEtablissementsContext);

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [ocSiegeForm, setOcSiegeForm] = useState<FormDataOC>({
    locSiren: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    groupe: '',
    siteWeb: '',
    ocAddedtoLPA: false,
    dateMaj: '',
    totalPAitems: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [siteWebError, setSiteWebError] = useState<string>('');
  const [importantFieldsError, setImportantFieldsError] = useState<string>('');
  const [siren, setSiren] = useState('');

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

  const handleInputChangeOC = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setOcSiegeForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'email') {
      if (!isEmailValid(value)) {
        setEmailError('Veuillez entrer une adresse e-mail valide.');
      } else {
        setEmailError('');
      }
    }

    if (name === 'telephone') {
      if (!isPhoneValid(value)) {
        setPhoneError('Veuillez entrer un numéro de téléphone valide.');
      } else {
        setPhoneError('');
      }
    }

    if (name === 'siteWeb') {
      if (value === '') {
        setSiteWebError('Champ obligatoire');
      } else {
        setSiteWebError('');
      }
    }

    if (value === '') {
      setImportantFieldsError('Champs importants');
    } else {
      setImportantFieldsError('');
    }
  };

  const handleSubmitOC = () => {
    if (emailError === '' && phoneError === '' && siteWebError === '') {
      console.info('submitting form');
      console.info(siren);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/oc?email=${email}`);
        const siegeInformations = response.data;
        setOcSiegeForm(siegeInformations);
        setSiegeData(siegeInformations);
        setSiren(siegeInformations.locSiren);
        setLoading(false);
      } catch (error) {
        setError(error as AxiosError);
        setLoading(false);
      }
    };

    const email = localStorage.getItem('email');
    if (email) {
      fetchData();
    }
  }, [setSiegeData]);

  return (
    <>
      {error && <ErrorMessage message={COMMON.errorMessage} />}
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmitWithNotification}
          className="max-w-4xl mx-auto p-5 border border-gray-200"
          data-testid="siege-form"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              {/* nom de l'organisme */}
              <FormInput
                label={
                  OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.denominationSociete
                }
                name="nom"
                value={ocSiegeForm.nom ?? ''}
                onChange={handleInputChangeOC}
                isDisabled={true}
              />

              {/* Code postal */}
              <FormInput
                label="Code postal"
                name="codePostal"
                value={ocSiegeForm.codePostal ?? ''}
                onChange={() => {}}
                isDisabled={true}
              />

              {/* Siren */}
              <FormInput
                label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.siren}
                name="locSiren"
                value={ocSiegeForm.locSiren ?? ''}
                onChange={handleInputChangeOC}
                isDisabled={true}
              />

              {/* Email */}
              <FormInput
                label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.email}
                name="email"
                value={ocSiegeForm.email ?? ''}
                onChange={handleInputChangeOC}
                isError={emailError !== ''}
                errorMessage={emailError}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              {/* Adresse 1 */}
              <FormInput
                label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.adresse}
                name="adresse"
                value={ocSiegeForm.adresse ?? ''}
                onChange={handleInputChangeOC}
                isDisabled={true}
              />

              {/* Ville */}
              <FormInput
                label="Ville"
                name="codePostal"
                value={ocSiegeForm.ville ?? ''}
                onChange={() => {}}
                isDisabled={true}
              />

              {/* Telephone */}
              <FormInput
                label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.telephone}
                name="telephone"
                value={ocSiegeForm.telephone ?? ''}
                onChange={handleInputChangeOC}
                isError={phoneError !== ''}
                errorMessage={phoneError}
              />

              {/* Site web */}
              <FormInput
                label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.siteWeb}
                name="siteWeb"
                value={ocSiegeForm.siteWeb ?? ''}
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
                      checked={ocSiegeForm.ocAddedtoLPA}
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
          <div className="information-message-display my-8">
            <InformationMessage
              message={
                OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.informationMessage
              }
            />
          </div>
          <div className="flex justify-end">
            <button
              className="fr-btn fr-btn--secondary"
              type="button"
              disabled={
                emailError !== '' ||
                phoneError !== '' ||
                siteWebError !== '' ||
                importantFieldsError !== ''
              }
            >
              {COMMON.save}
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
      )}
    </>
  );
};
