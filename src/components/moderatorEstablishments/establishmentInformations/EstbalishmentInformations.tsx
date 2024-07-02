import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { Establishment } from '@/domain/ModeratorEstablishments';
import { Button } from '@/components/common/button/Button';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RadioGroupWithYup } from '@/components/common/radioGroup/RadioGroupWithYup';

interface EstablishmentInformationsProps {
  establishment: Establishment;
}

interface FormData {
  nom?: string;
  adresse?: string;
  locSiren?: string;
  organisationType?: string;
  email?: string;
  telephone?: string;
  siteWeb?: string;
}

const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

const schema = yup.object().shape({
  nom: yup
    .string()
    .max(100, "Le nom de l'etablissement ne peut pas dépasser 100 caractères"),
  adresse: yup
    .string()
    .max(150, "L'adresse ne peut pas dépasser 150 caractères"),
  locSiren: yup
    .string()
    .length(9, 'Le numéro SIREN doit contenir 9 caractères'),
  organisationType: yup
    .string()
    .oneOf(
      ['ORGANISME_COMPLEMENTAIRE', 'ORGANISME_GENERAL'],
      "Veuillez sélectionner un type d'organisation"
    ),
  email: yup
    .string()
    .email('Veuillez entrer un email valide')
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  telephone: yup
    .string()
    .matches(
      frenchPhoneRegExp,
      '*Le numéro de téléphone doit être un numéro Français'
    ),
  siteWeb: yup.string().max(100, 'Le lien ne peut pas dépasser 100 caractères'),
});

export const EstablishmentInformations = ({
  establishment,
}: EstablishmentInformationsProps) => {
  const defaultValues: FormData = {
    nom: establishment.nom || '',
    adresse: establishment.adresse || '',
    locSiren: establishment.locSiren || '',
    organisationType:
      establishment.organisationType || 'ORGANISME_COMPLEMENTAIRE',
    email: establishment.email || '',
    telephone: establishment.telephone || '',
    siteWeb: establishment.siteWeb || '',
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-x-16 mt-8 lg:mt-2">
          <FormInputWithYup classes="w-full" label="Nom" name="nom" />
          <FormInputWithYup classes="w-full" label="Adresse" name="adresse" />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-x-16 mt-8 lg:mt-2">
          <FormInputWithYup classes="w-full" label="Siren" name="locSiren" />
          <RadioGroupWithYup
            classes="w-full"
            name="organisationType"
            options={[
              {
                value: 'ORGANISME_COMPLEMENTAIRE',
                label: 'Organisme complémentaire',
              },
              { value: 'CAISSE', label: "Caisse d'assurance maladie" },
            ]}
          />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-x-16 mt-8 lg:mt-2">
          <FormInputWithYup classes="w-full" label="Email" name="email" />
          <FormInputWithYup
            classes="w-full"
            label="Téléphone"
            name="telephone"
          />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-x-16 mt-8 lg:mt-2">
          <FormInputWithYup classes="w-full" label="Site Web" name="siteWeb" />
          <div className="w-full"></div>
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
