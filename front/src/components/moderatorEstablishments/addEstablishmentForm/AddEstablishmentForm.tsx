import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormInputWithYup } from '../../common/input/FormInputWithYup.tsx';
// import { ToggleEstablishmentType } from '@/components/moderatorEstablishments/toggleEstablishmentType/ToggleEstablishmentType';
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
import { Alert } from '@/components/common/alert/Alert.tsx';
interface AddEstablishmentFormProps {
  onFormSubmit: () => void;
  // establishmentType: string;
  // updateEstablishmentType: (newOption: string) => void;
}

interface FormData {
  nom: string;
  ville: string;
  codePostal: string;
  adresse: string;
  adresse2?: string;
  adresse3?: string;
  cedex?: string | null;
  siren: string;
  email: string;
  telephone?: string | null;
}

const endpoint = '/moderateur/etablissements/create';

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
  nom: yup
    .string()
    .required("*Le nom de l'établissement est requis")
    .max(100, "Le nom de l'établissement ne peut pas dépasser 100 caractères"),
  adresse: yup
    .string()
    .required("*L'adresse est requise")
    .max(150, "L'adresse ne peut pas dépasser 150 caractères"),
  adresse2: yup
    .string()
    .max(
      150,
      'Le lieu-dit ou boîte postale ne peut pas dépasser 150 caractères'
    ),
  adresse3: yup
    .string()
    .max(
      150,
      "L'information complémentaire ne peut pas dépasser 150 caractères"
    ),
  ville: yup
    .string()
    .required('*La ville est requise')
    .max(100, 'La ville ne peut pas dépasser 100 caractères'),
  codePostal: yup
    .string()
    .required('*Le code postal est requis')
    .max(5, 'Le code postal ne peut pas dépasser 5 caractères'),
  cedex: yup.string().nullable().notRequired(),
  siren: yup
    .string()
    .required('*Le numéro SIREN est requis')
    .length(9, 'Le numéro SIREN doit contenir 9 caractères'),
  // groupe: yup
  //   .string()
  //   .oneOf(
  //     ['ORGANISME_COMPLEMENTAIRE', 'CAISSE'],
  //     "Veuillez sélectionner un type d'organisation"
  //   ),
  email: yup
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
});

const defaultValues: FormData = {
  nom: '',
  adresse: '',
  adresse2: '',
  adresse3: '',
  ville: '',
  codePostal: '',
  cedex: '',
  siren: '',
  // groupe: 'ORGANISME_COMPLEMENTAIRE',
  email: '',
  telephone: '',
  // emailContact: '',
};

export const AddEstablishmentForm = forwardRef(
  (
    {
      onFormSubmit,
      // establishmentType,
      // updateEstablishmentType,
    }: AddEstablishmentFormProps,
    ref
  ) => {
    const [errors, setErrors] = useState<AddEstablishmentErrorResponseData>({});
    const [abortController, setAbortController] =
      useState<AbortController | null>(null);

    const [submitError, setSubmitError] = useState<boolean>(false);

    const methods = useForm({
      resolver: yupResolver(schema),
      defaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: FormData) => {
      setErrors({});

      const payload = {
        nom: data.nom,
        ville: data.ville,
        codePostal: data.codePostal,
        adresse: data.adresse,
        adresse2: data.adresse2,
        adresse3: data.adresse3,
        cedex: data.cedex,
        locSiren: data.siren,
        email: data.email,
        telephone: data.telephone,
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

        onFormSubmit();

        // onDataUpdate();
      } catch (error) {
        // FIXME: test fails because of the axiosInstance.post
        setSubmitError(true);

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
        {/* <ToggleEstablishmentType
          establishmentType={establishmentType}
          updateEstablishmentType={updateEstablishmentType}
        /> */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-4"
            data-testid="establishment-form"
          >
            <div className="w-full flex flex-col lg:flex-row  gap-x-12">
              <div className="col w-full">
                <div>
                  <FormInputWithYup
                    classes="w-full"
                    label="Nom de l'établissement *"
                    name="nom"
                    onKeyPress={() => handleInputChange(['nom'], setErrors)}
                  />
                  {displayErrorInEstablishmentForm(['nom'], errors)}
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
                    label="E-mail de l'organisation *"
                    name="email"
                  />
                  {displayErrorInEstablishmentForm(['email'], errors)}
                </div>
                <div className="mt-6">
                  <FormInputWithYup
                    classes="w-full"
                    label="Téléphone de l'organisation"
                    name="telephone"
                    onKeyPress={() =>
                      handleInputChange(['telephone'], setErrors)
                    }
                  />
                  {displayErrorInEstablishmentForm(['telephone'], errors)}
                </div>
              </div>
              <div className="col w-full">
                <FormInputWithYup
                  classes="w-full"
                  label="Adresse *"
                  name="adresse"
                  onKeyPress={() => handleInputChange(['adresse'], setErrors)}
                />
                {displayErrorInEstablishmentForm(['adresse'], errors)}
                <div className="mt-11">
                  <FormInputWithYup
                    classes="w-full"
                    label="Lieu-dit ou boîte postale"
                    name="adresse2"
                    onKeyPress={() =>
                      handleInputChange(['adresse2'], setErrors)
                    }
                  />
                  {displayErrorInEstablishmentForm(['adresse2'], errors)}
                </div>
                <div className="mt-6">
                  <FormInputWithYup
                    classes="w-full"
                    label="Information complémentaire"
                    name="adresse3"
                    onKeyPress={() =>
                      handleInputChange(['adresse3'], setErrors)
                    }
                  />
                  {displayErrorInEstablishmentForm(['adresse3'], errors)}
                </div>
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
                    label="Cedex"
                    name="cedex"
                    onKeyPress={() => handleInputChange(['cedex'], setErrors)}
                  />
                </div>
                {displayErrorInEstablishmentForm(['cedex'], errors)}
              </div>
              {submitError && (
                <Alert
                  label="Erreur"
                  description="Une erreur est survenue lors de la soumission du formulaire."
                  type="error"
                />
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    );
  }
);
