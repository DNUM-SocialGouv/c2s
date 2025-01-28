import { useState, useEffect } from 'react';
import { FormInputWithYup } from '../../common/input/FormInputWithYup.tsx';
import { Establishment } from '../../../domain/ModeratorEstablishments.ts';
import { Button } from '../../common/button/Button.tsx';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { AxiosError } from 'axios';
import {
  AddEstablishmentErrorResponse,
  AddEstablishmentErrorResponseData,
} from '../../../domain/ModeratorEstablishments.ts';
import { displayErrorInEstablishmentForm } from '../DisplayErrorInEstablishmentForm/displayErrorInEstablishmentForm.tsx';
import { schema } from './EstbalishmentInformationsValidationSchema.ts';
import { ReadOnlyInput } from '../../common/input/ReadOnlyInput.tsx';
import { handleInputChange } from '../../../utils/ModeratorEstablishments.helper.tsx';
import { useModeratorEstablishmentsContext } from '../../../contexts/ModeratorEstablishmentsContext.tsx';

interface EstablishmentInformationsProps {
  onEstablishmentUpdated: () => void;
  onEstablishmentDeleted: () => void;
  onFormReset: () => void;
  establishment: Establishment;
}

interface FormData {
  societe?: string;
  ville?: string;
  codePostal?: string;
  adresse?: string;
  siren?: string;
  emailEntreprise?: string | null;
  siteWeb?: string;
  telephone?: string | null;
}

const endpoint = '/moderateur/entreprises/update';

const isAbortError = (error: unknown): error is DOMException => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as DOMException).name === 'AbortError'
  );
};

export const EstablishmentInformations = ({
  onEstablishmentUpdated,
  onFormReset,
  establishment,
}: EstablishmentInformationsProps) => {
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [errors, setErrors] = useState<AddEstablishmentErrorResponseData>({});
  const [establishmentName, setEstablishmentName] = useState<string>(
    establishment.nom || ''
  );
  const [establishmentSiren, setEstablishmentSiren] = useState<string>(establishment.locSiren || '');

  const { openModal } = useModeratorEstablishmentsContext();

  const defaultValues: FormData = {
    societe: establishment.nom || '',
    adresse: establishment.adresse || '',
    ville: establishment.ville || '',
    codePostal: establishment.codePostal || '',
    siren: establishment.locSiren || '',
    emailEntreprise: establishment.email || '',
    telephone: establishment.telephone || '',
    siteWeb: establishment.siteWeb || '',
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    if (establishment.nom) {
      setEstablishmentName(establishment.nom);
    }
    if (establishment.locSiren) {
      setEstablishmentSiren(establishment.locSiren);
    }
  }, [establishment.nom, establishment.locSiren]);

  const onSubmit = async (data: FormData) => {
    onFormReset();

    const payload = {
      societe: data.societe,
      ville: data.ville,
      codePostal: data.codePostal,
      adresse: data.adresse,
      siren: data.siren,
      emailEntreprise: data.emailEntreprise,
      siteWeb: data.siteWeb,
      telephone: data.telephone,
      pointAccueil: false,
      groupe: 'ORGANISME_COMPLEMENTAIRE',
    };

    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      const response = await axiosInstance.put(endpoint, payload, {
        withCredentials: true,
        signal: newAbortController.signal,
      });

      setErrors({});
      setEstablishmentName(response.data.nom);
      setEstablishmentSiren(response.data.locSiren);
      onEstablishmentUpdated();
    } catch (error) {
      onFormReset();
      // console.error('Error:', error);
      const axiosError = error as AxiosError<AddEstablishmentErrorResponse>;

      if (isAbortError(error)) {
        console.log('Request was aborted');
      }

      if (axiosError.response) {
        const { status, data } = axiosError.response;

        if (status === 400) {
          setErrors(data as unknown as AddEstablishmentErrorResponseData);
        }
      } else {
        console.log('Unknown error', error);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="establishment-form">
        <div className="w-full flex flex-col md:flex-row gap-x-12">
          <div className="flex flex-col w-full md:w-6/12">
            <div className="form-group mb-3">
              {/* Read-only input for the societe field */}
              <ReadOnlyInput
                label="Nom de l'organisme"
                id="nom-organisme-information-form"
                name="societe-information-form"
                value={establishmentName} // Use the state value to update dynamically
              />
              {displayErrorInEstablishmentForm(['societe'], errors)}
            </div>
            <ReadOnlyInput
              label="Siren"
              name="siren"
              id="siren-organisme-information-form"
              value={establishmentSiren}
            />
            {displayErrorInEstablishmentForm(
              ['siren', 'entreprise', 'insee'],
              errors
            )}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Email de l'organisme"
              name="emailEntreprise"
            />
            <FormInputWithYup
              classes="w-full mb-3"
              label="Site Web"
              name="siteWeb"
              onKeyPress={() => handleInputChange(['siteWeb'], setErrors)}
            />
            {displayErrorInEstablishmentForm(['siteWeb'], errors)}
          </div>
          <div className="flex flex-col w-full md:w-6/12">
            <FormInputWithYup
              classes="w-full mb-3"
              label="Adresse du siège"
              name="adresse"
              onKeyPress={() => handleInputChange(['adresse'], setErrors)}
            />
            {displayErrorInEstablishmentForm(['adresse'], errors)}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Code postal"
              name="codePostal"
              onKeyPress={() => handleInputChange(['codePostal'], setErrors)}
            />
            {displayErrorInEstablishmentForm(['codePostal'], errors)}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Ville"
              name="ville"
              onKeyPress={() => handleInputChange(['ville'], setErrors)}
            />
            {displayErrorInEstablishmentForm(['ville'], errors)}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Téléphone de l'organisme"
              name="telephone"
            />
          </div>
        </div>

        <div className="flex justify-center gap-x-12 mt-6">
          <Button type="submit" label="Enregistrer" variant="secondary" />
          <Button
            label="Supprimer"
            variant="error"
            type="button"
            onClick={() => openModal(establishment.locSiren)}
          />
        </div>
      </form>
    </FormProvider>
  );
};
