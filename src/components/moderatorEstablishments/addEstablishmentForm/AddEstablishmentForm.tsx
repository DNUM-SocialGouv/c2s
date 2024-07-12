import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { MODERATOR_ESTABLISHMENTS } from '@/wording';
import { Checkbox } from '@/components/common/checkbox/Checkbox';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RadioGroupWithYup } from '@/components/common/radioGroup/RadioGroupWithYup';
import { axiosInstance } from '@/RequestInterceptor';
import {
  AddEstablishmentErrorResponse,
  AddEstablishmentErrorResponseData,
} from '@/domain/ModeratorEstablishments';
import { displayErrorInEstablishmentForm } from '@/components/moderatorEstablishments/utils/displayErrorInEstablishmentForm';
import { AxiosError } from 'axios';

interface AddEstablishmentFormProps {
  onFormSubmit: () => void;
}

interface FormData {
  establishmentType?: string;
  societe: string;
  adresse: string;
  siren: string;
  groupe?: string;
  emailEntreprise: string;
  telephone: string;
  siteWeb?: string;
  emailContact?: string;
  pointAccueil?: boolean;
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
  establishmentType: yup
    .string()
    .oneOf(['siege', 'pa'], 'Veuillez sélectionner un Type d’établissement'),
  societe: yup
    .string()
    .required('*Le nom de société est requis')
    .max(100, 'Le nom de la societe ne peut pas dépasser 100 caractères'),
  adresse: yup
    .string()
    .required("*L'adresse est requise")
    .max(150, "L'adresse ne peut pas dépasser 150 caractères"),
  siren: yup
    .string()
    .required('*Le numéro SIREN est requis')
    .length(9, 'Le numéro SIREN doit contenir 9 caractères'),
  groupe: yup
    .string()
    .oneOf(
      ['ORGANISME_COMPLEMENTAIRE', 'ORGANISME_GENERAL'],
      "Veuillez sélectionner un type d'organisation"
    ),
  emailEntreprise: yup
    .string()
    .required("*L'email est requis")
    .email('Veuillez entrer un email valide')
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  telephone: yup
    .string()
    .required('*Le numéro de téléphone est requis')
    .matches(
      frenchPhoneRegExp,
      '*Le numéro de téléphone doit être un numéro Français'
    ),
  siteWeb: yup.string().max(100, 'Le lien ne peut pas dépasser 100 caractères'),
  emailContact: yup
    .string()
    .email('Veuillez entrer un email valide')
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  pointAccueil: yup.boolean(),
});

const defaultValues: FormData = {
  establishmentType: '',
  societe: '',
  adresse: '',
  siren: '',
  groupe: 'ORGANISME_COMPLEMENTAIRE',
  emailEntreprise: '',
  telephone: '',
  siteWeb: '',
  emailContact: '',
  pointAccueil: false,
};

export const AddEstablishmentForm = forwardRef(
  ({ onFormSubmit }: AddEstablishmentFormProps, ref) => {
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
        ville: 'Paris',
        codePostal: '75010',
        adresse: data.societe,
        siren: data.siren,
        emailEntreprise: data.emailEntreprise,
        emailContact: data.emailContact,
        siteWeb: data.siteWeb,
        telephone: data.telephone,
        pointAccueil: data.pointAccueil,
        groupe: data.groupe,
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
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-testid="establishment-form"
          className="w-full"
        >
          <p>{MODERATOR_ESTABLISHMENTS.establishmentType}</p>
          <RadioGroupWithYup
            classes=""
            name="establishmentType"
            options={[
              {
                value: 'siege',
                label: 'Siège',
              },
              { value: 'pa', label: "Point d'accueil" },
            ]}
          />
          <div className="w-full flex flex-col lg:flex-row  gap-x-12">
            <div className="col w-full">
              <div>
                <FormInputWithYup
                  classes="w-full"
                  label="Société *"
                  name="societe"
                />
                {displayErrorInEstablishmentForm('societe', errors)}
              </div>
              <div className="mt-6">
                <FormInputWithYup
                  classes="w-full"
                  label="Siren *"
                  hint="9 chiffres"
                  name="siren"
                />
                {displayErrorInEstablishmentForm('siren', errors)}
              </div>
              <div className="mt-6">
                <FormInputWithYup
                  classes="w-full"
                  label="E-mail de l'organisation *"
                  name="emailEntreprise"
                />
                {displayErrorInEstablishmentForm('emailEntreprise', errors)}
              </div>
              <div className="mt-6">
                <FormInputWithYup
                  classes="w-full"
                  label="Site Web"
                  name="siteWeb"
                />
                {displayErrorInEstablishmentForm('siteWeb', errors)}
              </div>
              <div className="mt-6">
                <FormInputWithYup
                  classes="w-full"
                  label="E-mail du contact"
                  hint="Ce contact sera invité à s'inscrire à l'espace connecté rattraché à cet établissement"
                  name="emailContact"
                />
                {displayErrorInEstablishmentForm('emailContact', errors)}
              </div>
            </div>
            <div className="col w-full">
              <FormInputWithYup
                classes="w-full"
                label="Adresse *"
                name="adresse"
              />
              {displayErrorInEstablishmentForm('adresse', errors)}
              <p className="mt-[13px] mb-0">
                {MODERATOR_ESTABLISHMENTS.organisationType}
              </p>
              <RadioGroupWithYup
                classes="w-full"
                name="groupe"
                options={[
                  {
                    value: 'ORGANISME_COMPLEMENTAIRE',
                    label: 'Organisme complémentaire',
                  },
                  { value: 'CAISSE', label: "Caisse d'assurance maladie" },
                ]}
              />
              {displayErrorInEstablishmentForm('groupe', errors)}
              <FormInputWithYup
                classes="w-full"
                label="Téléphone de l'organisation *"
                name="telephone"
              />
              {displayErrorInEstablishmentForm('telephone', errors)}
              <div className="mt-8">
                <Checkbox
                  label="Inclure le siège comme un point d'accueil"
                  name="pointAccueil"
                />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    );
  }
);
