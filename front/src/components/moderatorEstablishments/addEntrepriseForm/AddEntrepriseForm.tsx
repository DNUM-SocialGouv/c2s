import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormInputWithYup } from '../../common/input/FormInputWithYup.tsx';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import {
  AddEstablishmentErrorResponse,
  AddEstablishmentErrorResponseData,
} from '../../../domain/ModeratorEstablishments.ts';
import { displayErrorInEstablishmentForm } from '../DisplayErrorInEstablishmentForm/displayErrorInEstablishmentForm.tsx';
import { AxiosError } from 'axios';
import { handleInputChange } from '../../../utils/ModeratorEstablishments.helper.tsx';

interface AddEntrepriseFormProps {
  onUpdateCreatedEntrepriseName: (societe: string) => void;
  onFormSubmit: () => void;
}

interface FormData {
  societe?: string;
  ville: string;
  codePostal: string;
  adresse: string;
  siren: string;
  groupe?: string;
  emailEntreprise?: string | null;
  telephone?: string | null;
  siteWeb?: string;
}

const endpoint = '/moderateur/entreprises/create';

const isAbortError = (error: unknown): error is DOMException => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as DOMException).name === 'AbortError'
  );
};

const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

const schema = yup.object().shape({
  adresse: yup
    .string()
    .required("*L'adresse est requise")
    .max(150, "L'adresse ne peut pas dépasser 150 caractères"),
  ville: yup
    .string()
    .required('*La ville est requise')
    .max(100, 'La ville ne peut pas dépasser 100 caractères'),
  codePostal: yup
    .string()
    .required('*Le code postal est requis')
    .max(5, 'Le code postal ne peut pas dépasser 5 caractères'),
  siren: yup
    .string()
    .required('*Le numéro SIREN est requis')
    .length(9, 'Le numéro SIREN doit contenir 9 caractères'),
  emailEntreprise: yup
    .string()
    .nullable()
    .test(
      'is-valid-email',
      'Veuillez entrer un email valide',
      (value) => !value || yup.string().email().isValidSync(value)
    ),
  telephone: yup
    .string()
    .nullable()
    .test(
      'is-valid-phone',
      '*Le numéro de téléphone doit être un numéro Français',
      (value) => !value || frenchPhoneRegExp.test(value)
    ),
  siteWeb: yup.string().max(100, 'Le lien ne peut pas dépasser 100 caractères'),
});

const defaultValues: FormData = {
  adresse: '',
  ville: '',
  codePostal: '',
  siren: '',
  groupe: 'ORGANISME_COMPLEMENTAIRE',
  emailEntreprise: '',
  telephone: null,
  siteWeb: '',
};

export const AddEntrepriseForm = forwardRef(
  (
    { onFormSubmit, onUpdateCreatedEntrepriseName }: AddEntrepriseFormProps,
    ref
  ) => {
    const [errors, setErrors] = useState<AddEstablishmentErrorResponseData>({});
    const [abortController, setAbortController] =
      useState<AbortController | null>(null);

    const methods = useForm({
      resolver: yupResolver(schema),
      defaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: FormData) => {
      onUpdateCreatedEntrepriseName('');
      setErrors({});

      const payload = {
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
        const response = await axiosInstance.post(endpoint, payload, {
          withCredentials: true,
          signal: newAbortController.signal,
        });

        if (response && response.status === 200) {
          onUpdateCreatedEntrepriseName(response.data?.nom ?? '');
          setErrors({});
          onFormSubmit();
          return;
        }
      } catch (error) {
        const axiosError = error as AxiosError<AddEstablishmentErrorResponse>;

        if (isAbortError(error)) {
          console.error('Request was aborted');
        }

        if (axiosError.response) {
          const { status, data } = axiosError.response;

          if (status === 400) {
            setErrors(data as unknown as AddEstablishmentErrorResponseData);
          }
        } else {
          console.error('Unknown error', error);
        }
      }
    };

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        handleSubmit(onSubmit)();
      },
    }));

    return (
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            data-testid="entreprise-form"
            className="w-full mt-4"
          >
            <div className="w-full flex flex-col lg:flex-row gap-x-12">
              <div className="col w-full">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-x-12 mt-3">
                  <div className="w-full">
                    <FormInputWithYup
                      label="Siren *"
                      hint="9 chiffres"
                      name="siren"
                      testId="siren"
                      onKeyPress={() =>
                        handleInputChange(
                          ['siren', 'entreprise', 'insee'],
                          setErrors
                        )
                      }
                    />
                    {displayErrorInEstablishmentForm(
                      ['siren', 'entreprise', 'insee'],
                      errors
                    )}
                  </div>
                  <div className="w-full">
                    <FormInputWithYup
                      label="Adresse du siège *"
                      name="adresse"
                      onKeyPress={() =>
                        handleInputChange(['adresse'], setErrors)
                      }
                    />
                    {displayErrorInEstablishmentForm(['adresse'], errors)}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-end gap-x-12 mt-3">
                  <div className="w-full">
                    <FormInputWithYup
                      label="E-mail de l'organisme"
                      name="emailEntreprise"
                      onKeyPress={() =>
                        handleInputChange(['emailEntreprise'], setErrors)
                      }
                    />
                    {displayErrorInEstablishmentForm(
                      ['emailEntreprise'],
                      errors
                    )}
                  </div>
                  <div className="w-full">
                    <FormInputWithYup
                      label="Code postal *"
                      name="codePostal"
                      onKeyPress={() =>
                        handleInputChange(['codePostal'], setErrors)
                      }
                    />
                  </div>
                  {displayErrorInEstablishmentForm(['codePostal'], errors)}
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-end gap-x-12 mt-3">
                  <div className="w-full">
                    <FormInputWithYup
                      label="Site Web"
                      name="siteWeb"
                      onKeyPress={() =>
                        handleInputChange(['siteWeb'], setErrors)
                      }
                    />
                    {displayErrorInEstablishmentForm(['siteWeb'], errors)}
                  </div>
                  <div className="w-full">
                    <FormInputWithYup
                      label="Ville *"
                      name="ville"
                      onKeyPress={() => handleInputChange(['ville'], setErrors)}
                    />
                    {displayErrorInEstablishmentForm(['ville'], errors)}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-end gap-x-12 mt-3">
                  <div className="w-full">
                    <FormInputWithYup
                      label="Téléphone de l'organisme"
                      name="telephone"
                      onKeyPress={() =>
                        handleInputChange(['telephone'], setErrors)
                      }
                    />
                    {displayErrorInEstablishmentForm(['telephone'], errors)}
                  </div>
                  <div className="w-full"></div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    );
  }
);
