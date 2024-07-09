import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { MODERATOR_ESTABLISHMENTS } from '@/wording';
import { Button } from '@/components/common/button/Button';
import { Checkbox } from '@/components/common/checkbox/Checkbox';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RadioGroupWithYup } from '@/components/common/radioGroup/RadioGroupWithYup';

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

const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

const schema = yup.object().shape({
  establishmentType: yup
    .string()
    .oneOf(
      ['Siège', 'Point d’accueil'],
      'Veuillez sélectionner un Type d’établissement'
    ),
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

export const AddEstablishmentForm = () => {
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

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    console.log('data form', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="establishment-form">
        <p>{MODERATOR_ESTABLISHMENTS.establishmentType}</p>
        <RadioGroupWithYup
          classes="w-full"
          name="establishmentType"
          options={[
            {
              value: '??',
              label: 'Siège',
            },
            { value: '???', label: "Point d'accueil" },
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
            </div>

            <div className="mt-6">
              <FormInputWithYup
                classes="w-full"
                label="Siren *"
                hint="9 chiffres"
                name="siren"
              />
            </div>
            <div className="mt-6">
              <FormInputWithYup
                classes="w-full"
                label="E-mail de l'organisation *"
                name="emailEntreprise"
              />
            </div>
            <div className="mt-6">
              <FormInputWithYup
                classes="w-full"
                label="Site Web"
                name="siteWeb"
              />
            </div>
            <div className="mt-6">
              <FormInputWithYup
                classes="w-full"
                label="E-mail du contact"
                hint="Ce contact sera invité à s'inscrire à l'espace connecté rattraché à cet établissement"
                name="emailContact"
              />
            </div>
          </div>

          <div className="col w-full">
            <FormInputWithYup
              classes="w-full"
              label="Adresse *"
              name="adresse"
            />
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
            <FormInputWithYup
              classes="w-full"
              label="Téléphone de l'organisation *"
              name="telephone"
            />
            <div className="mt-8">
              <Checkbox
                label="Inclure le siège comme un point d'accueil"
                name="pointAccueil"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-x-12 mt-12">
          <Button
            type="submit"
            label="Enregistrer"
            variant="secondary"
          ></Button>
          <Button label="Supprimer" variant="error"></Button>
        </div>
      </form>
    </FormProvider>
  );
};
