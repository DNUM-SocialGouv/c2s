import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormInputWithYup } from '../../common/input/FormInputWithYup.tsx';
import { Alert } from '../../../components/common/alert/Alert.tsx';
import { CheckboxWithYup } from '../../common/checkboxWithYup/CheckboxWithYup.tsx';
import { Button } from '../../common/button/Button.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormDataOC } from '../../../domain/OcEstablishments.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { COMMON, OC_MES_ETABLISSEMENTS } from '../../../wording.ts';

interface SiegeFormProps {
  ocInfos: FormDataOC;
}

export interface FormDataOCPayload {
  id: number | null;
  locSiren: string;
  dateCrea: string | null;
  dateMaj: string;
  nom: string;
  email: string;
  telephone: string | null;
  adresse: string;
  codePostal: string;
  ville: string;
  siteWeb: string | null;
  groupe: 'CAISSE' | 'ORGANISME_COMPLEMENTAIRE';
  ocAddedtoLPA: boolean;
}

export interface FormDataOCValues {
  locSiren: string;
  nom: string;
  email?: string | null;
  telephone?: string | null;
  adresse: string;
  codePostal: string;
  ville: string;
  siteWeb?: string | null;
  ocAddedtoLPA: boolean;
}

const getDefaultFormDataOC = (ocInfos: FormDataOC): FormDataOCValues => {
  return {
    locSiren: ocInfos?.locSiren || '',
    nom: ocInfos?.nom || '',
    adresse: ocInfos?.adresse || '',
    codePostal: ocInfos?.codePostal || '',
    ville: ocInfos?.ville || '',
    telephone: ocInfos?.telephone || null,
    email: ocInfos?.email || '',
    siteWeb: ocInfos?.siteWeb || null,
    ocAddedtoLPA: ocInfos?.ocAddedtoLPA ? true : false,
  };
};

const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

const schema = yup.object().shape({
  nom: yup
    .string()
    .required('*Le nom est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  adresse: yup
    .string()
    .required("*L'adresse est requise")
    .max(150, "L'adresse ne peut pas dépasser 150 caractères"),
  codePostal: yup
    .string()
    .required('*Le code postal est requis')
    .max(5, 'Le code postal ne peut pas dépasser 5 caractères'),
  ville: yup
    .string()
    .required('*La ville est requise')
    .max(100, 'La ville ne peut pas dépasser 100 caractères'),
  telephone: yup
    .string()
    .nullable()
    .matches(frenchPhoneRegExp, 'Veuillez entrer un numéro de téléphone valide')
    .max(20, 'Le numéro de téléphone ne peut pas dépasser 20 caractères'),
  email: yup
    .string()
    .nullable()
    .email('Veuillez entrer un email valide')
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  siteWeb: yup
    .string()
    .nullable()
    .max(100, 'Le lien ne peut pas dépasser 100 caractères'),
  ocAddedtoLPA: yup.boolean().required('*Veuillez choisir une option'),
  locSiren: yup.string().required('*Le SIREN est requis'),
});

export const SiegeForm = ({ ocInfos }: SiegeFormProps) => {
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultFormDataOC(ocInfos),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormDataOCValues) => {
    setError('');
    setSuccessMessage('');

    const payload: FormDataOCPayload = {
      id: ocInfos?.id ? Number(ocInfos.id) : null,
      locSiren: data.locSiren || '',
      dateCrea: ocInfos?.dateCrea || '',
      dateMaj: ocInfos?.dateMaj || '',
      nom: data?.nom || '',
      email: data?.email || '',
      telephone: data?.telephone || null,
      adresse: data?.adresse || '',
      codePostal: data?.codePostal || '',
      ville: data?.ville || '',
      siteWeb: data?.siteWeb || null,
      groupe: 'ORGANISME_COMPLEMENTAIRE',
      ocAddedtoLPA: data.ocAddedtoLPA !== undefined ? data.ocAddedtoLPA : false,
    };

    try {
      await axiosInstance.put('/oc/update', payload);
      setSuccessMessage('Informations modifiées avec succès');
    } catch (error) {
      setError('Une erreur est survenue, la modification a échoué');
      return;
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="entreprise-form"
        className="w-full mt-4"
      >
        <div className="w-full flex flex-col lg:flex-row  gap-x-12">
          <div className="w-full">
            <FormInputWithYup
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.denominationSociete}
              name="nom"
              isDisabled
            />
          </div>
          <div className="w-full">
            <FormInputWithYup
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.adresse}
              name="adresse"
              isDisabled
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row  gap-x-12">
          <div className="w-full">
            <FormInputWithYup
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.codePostal}
              name="codePostal"
              isDisabled
            />
          </div>

          <div className="w-full">
            <FormInputWithYup
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.ville}
              name="ville"
              isDisabled
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row  gap-x-12">
          <div className="w-full">
            <FormInputWithYup
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.siren}
              name="locSiren"
              isDisabled
            />
          </div>

          <div className="w-full">
            <FormInputWithYup
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.telephone}
              name="telephone"
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row  gap-x-12">
          <div className="w-full">
            <FormInputWithYup
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.email}
              name="email"
            />
          </div>

          <div className="w-full">
            <FormInputWithYup
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.siteWeb}
              name="siteWeb"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-x-12 lg:flex-row mt-4">
          <div className="w-full"></div>
          <div className="w-full">
            <CheckboxWithYup
              name="ocAddedtoLPA"
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.definirCommeSiege}
              classes="w-full flex items-start lg:items-center justify-between"
            />
          </div>
        </div>
        <div className="mt-2">
          <Alert
            type="info"
            label={COMMON.information}
            description={
              OC_MES_ETABLISSEMENTS.FORMULAIRE_SIEGE.informationMessage
            }
          />
        </div>
        {successMessage && (
          <div className="mt-2">
            <Alert
              type="success"
              description={successMessage}
              onClose={() => setSuccessMessage('')}
            />
          </div>
        )}
        {error && (
          <div className="mt-2">
            <Alert type="error" description={error} />
          </div>
        )}
        <div className="flex justify-end gap-x-12 mt-6">
          <Button type="submit" label="Enregistrer" variant="secondary" />
        </div>
      </form>
    </FormProvider>
  );
};
