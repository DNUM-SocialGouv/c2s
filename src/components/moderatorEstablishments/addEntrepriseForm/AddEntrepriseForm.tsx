import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosInstance } from '@/RequestInterceptor';
import {
  AddEstablishmentErrorResponse,
  AddEstablishmentErrorResponseData,
} from '@/domain/ModeratorEstablishments';
import { displayErrorInEstablishmentForm } from '@/components/moderatorEstablishments/DisplayErrorInEstablishmentForm/displayErrorInEstablishmentForm';
import { AxiosError } from 'axios';
import { handleInputChange } from '@/components/moderatorEstablishments/HandleInputChange/handleInputChange';

interface AddEntrepriseFormProps {
  onFormSubmit: () => void;
}

interface FormData {
  societe: string;
  ville: string;
  codePostal: string;
  adresse: string;
  siren: string;
  groupe?: string;
  emailEntreprise: string;
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
  societe: yup
    .string()
    .required("*Le nom de l'organisme est requis")
    .max(100, 'Le nom de la societe ne peut pas dépasser 100 caractères'),
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
    .required("*L'email est requis")
    .email('Veuillez entrer un email valide')
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
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
  societe: '',
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
  ({ onFormSubmit }: AddEntrepriseFormProps, ref) => {
    const [errors, setErrors] = useState<AddEstablishmentErrorResponseData>({});
    const [abortController, setAbortController] =
      useState<AbortController | null>(null);

    const methods = useForm({
      resolver: yupResolver(schema),
      defaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: FormData) => {
      setErrors({});

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
        await axiosInstance.post(endpoint, payload, {
          withCredentials: true,
          signal: newAbortController.signal,
        });

        setErrors({});
        onFormSubmit();
      } catch (error) {
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
                <div>
                  <FormInputWithYup
                    classes="w-full"
                    label="Nom de l'organisme *"
                    name="societe"
                    onKeyPress={() => handleInputChange(['societe'], setErrors)}
                  />
                  {displayErrorInEstablishmentForm(['societe'], errors)}
                </div>
                <div className="mt-6">
                  <FormInputWithYup
                    classes="w-full"
                    label="Siren *"
                    hint="9 chiffres"
                    name="siren"
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
                <div className="mt-6">
                  <FormInputWithYup
                    classes="w-full"
                    label="E-mail de l'organisme *"
                    name="emailEntreprise"
                    onKeyPress={() =>
                      handleInputChange(['emailEntreprise'], setErrors)
                    }
                  />
                  {displayErrorInEstablishmentForm(['emailEntreprise'], errors)}
                </div>
                <div className="mt-6">
                  <FormInputWithYup
                    classes="w-full"
                    label="Site Web"
                    name="siteWeb"
                    onKeyPress={() => handleInputChange(['siteWeb'], setErrors)}
                  />
                  {displayErrorInEstablishmentForm(['siteWeb'], errors)}
                </div>
              </div>
              <div className="col w-full">
                <FormInputWithYup
                  classes="w-full"
                  label="Adresse du siège *"
                  name="adresse"
                  onKeyPress={() => handleInputChange(['adresse'], setErrors)}
                />
                {displayErrorInEstablishmentForm(['adresse'], errors)}
                <div className="mt-11">
                  <FormInputWithYup
                    classes="w-full"
                    label="Code postal *"
                    name="codePostal"
                    onKeyPress={() =>
                      handleInputChange(['codePostal'], setErrors)
                    }
                  />
                </div>
                {displayErrorInEstablishmentForm(['codePostal'], errors)}
                <div className="mt-6">
                  <FormInputWithYup
                    classes="w-full"
                    label="Ville *"
                    name="ville"
                    onKeyPress={() => handleInputChange(['ville'], setErrors)}
                  />
                  {displayErrorInEstablishmentForm(['ville'], errors)}
                </div>
                <div className="mt-6">
                  <FormInputWithYup
                    classes="w-full"
                    label="Téléphone de l'organisme"
                    name="telephone"
                    onKeyPress={() =>
                      handleInputChange(['telephone'], setErrors)
                    }
                  />
                  {displayErrorInEstablishmentForm(['telephone'], errors)}
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    );
  }
);
