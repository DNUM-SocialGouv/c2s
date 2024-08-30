import { useState } from 'react';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { Establishment } from '@/domain/ModeratorEstablishments';
import { Button } from '@/components/common/button/Button';
import { Checkbox } from '@/components/common/checkbox/Checkbox';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { RadioGroupWithYup } from '@/components/common/radioGroup/RadioGroupWithYup';
import { axiosInstance } from '@/RequestInterceptor';
import { AxiosError } from 'axios';
import {
  AddEstablishmentErrorResponse,
  AddEstablishmentErrorResponseData,
} from '@/domain/ModeratorEstablishments';
import { displayErrorInEstablishmentForm } from '@/components/moderatorEstablishments/DisplayErrorInEstablishmentForm/displayErrorInEstablishmentForm';
import { schema } from './EstbalishmentInformationsValidationSchema';

interface EstablishmentInformationsProps {
  onEstablishmentUpdated: () => void;
  onEstablishmentDeleted: () => void;
  onFormReset: () => void;
  establishment: Establishment;
}

interface FormData {
  societe: string;
  ville: string;
  codePostal: string;
  adresse: string;
  siren: string;
  emailEntreprise: string;
  siteWeb?: string;
  telephone?: string;
  pointAccueil?: boolean;
  // groupe: string;
}

const endpoint = '/moderateur/etablissements/update';
const deleteEndpoint = (siren: string) =>
  `/moderateur/etablissements/delete/${siren}`;

const isAbortError = (error: unknown): error is DOMException => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as DOMException).name === 'AbortError'
  );
};

// const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

export const EstablishmentInformations = ({
  onEstablishmentUpdated,
  onEstablishmentDeleted,
  onFormReset,
  establishment,
}: EstablishmentInformationsProps) => {
  const defaultValues: FormData = {
    societe: establishment.nom || '',
    adresse: establishment.adresse || '',
    ville: establishment.ville || '',
    codePostal: establishment.codePostal || '',
    siren: establishment.locSiren || '',
    // groupe: establishment.groupe || 'ORGANISME_COMPLEMENTAIRE',
    emailEntreprise: establishment.email || '',
    telephone: establishment.telephone || '',
    siteWeb: establishment.siteWeb || '',
    pointAccueil: establishment.ocAddedtoLPA || false,
  };

  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [errors, setErrors] = useState<AddEstablishmentErrorResponseData>({});

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

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
      pointAccueil: data.pointAccueil,
      // groupe: data.groupe,
      groupe: 'ORGANISME_COMPLEMENTAIRE',
    };

    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      await axiosInstance.put(endpoint, payload, {
        withCredentials: true,
        signal: newAbortController.signal,
      });

      onEstablishmentUpdated();

      // onDataUpdate();
    } catch (error) {
      onFormReset();
      console.error('Error:', error);
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

  const handleDeleteClick = async (siren: string) => {
    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      const response = await axiosInstance.delete(deleteEndpoint(siren));
      console.log('response', response);
      if (response.data === true && response.status === 200) {
        onEstablishmentDeleted();
        return;
      }

      console.log('erreur lors de la suppression');

      // onDataUpdate();
    } catch (error) {
      onFormReset();
      console.error('Error:', error);

      if (isAbortError(error)) {
        console.log('Request was aborted');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="establishment-form">
        <div className="w-full flex flex-col md:flex-row gap-x-12">
          <div className="flex flex-col w-full md:w-6/12">
            <FormInputWithYup
              classes="w-full mb-3"
              label="Société"
              name="societe"
            />
            {displayErrorInEstablishmentForm('societe', errors)}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Siren"
              name="siren"
            />
            {displayErrorInEstablishmentForm('siren', errors)}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Email de l'organisation"
              name="emailEntreprise"
            />
            {displayErrorInEstablishmentForm('emailEntreprise', errors)}
            {displayErrorInEstablishmentForm('entreprise', errors)}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Site Web"
              name="siteWeb"
            />
            {displayErrorInEstablishmentForm('siteWeb', errors)}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Téléphone de l'organisation"
              name="telephone"
            />
          </div>
          <div className="flex flex-col w-full md:w-6/12">
            <FormInputWithYup
              classes="w-full mb-3"
              label="Adresse"
              name="adresse"
            />
            {displayErrorInEstablishmentForm('siteWeb', errors)}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Ville"
              name="ville"
            />
            {displayErrorInEstablishmentForm('ville', errors)}
            <FormInputWithYup
              classes="w-full mb-3"
              label="Code postal"
              name="codePostal"
            />
            {displayErrorInEstablishmentForm('codePostal', errors)}
            {/* <div className="my-4">
              <RadioGroupWithYup
                classes="w-full"
                name="c"
                options={[
                  {
                    value: 'ORGANISME_COMPLEMENTAIRE',
                    label: 'Organisme complémentaire',
                  },
                  { value: 'CAISSE', label: "Caisse d'assurance maladie" },
                ]}
              />
              {displayErrorInEstablishmentForm('groupe', errors)}
            </div> */}

            <div className="w-full mt-4 mb-3">
              <Checkbox
                label="Inclure le siège comme un point d'accueil"
                name="pointAccueil"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-x-12 mt-6">
          <Button
            type="submit"
            label="Enregistrer"
            variant="secondary"
          ></Button>
          <Button
            label="Supprimer"
            variant="error"
            type="button"
            onClick={() => handleDeleteClick(establishment.locSiren)}
          ></Button>
        </div>
      </form>
    </FormProvider>
  );
};
