import { useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { FormInputWithYup } from '../../common/input/FormInputWithYup.tsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../common/button/Button.tsx';
import { Badge } from '../../common/badge/Badge.tsx';
import { Alert } from '../../../components/common/alert/Alert.tsx';
import { DialogV2 } from '../../common/modal/DialogV2.tsx';
import { AxiosError } from 'axios';
import { OC_MES_ETABLISSEMENTS, COMMON } from '../../../wording.ts';
import { displayErrorFromBackend } from '../../../utils/displayErrorFromBackend.tsx';
import { OcEstablishmentContext } from '../../../contexts/OcEstablishmentContext.tsx';
import { PointAcceuilInfo } from '../../../domain/OcEstablishments.ts';

interface LPAFormProps {
  index?: number;
  action: 'add' | 'update';
  PADefaultValues?: PointAcceuilInfo;
}

type FormData = {
  adresse2?: string;
  adresse3?: string;
  cedex?: string | null;
  nom: string;
  adresse: string;
  ville: string;
  codePostal: string;
  email: string;
  telephone: string;
};

interface AddPAErrorResponseData {
  [key: string]: string;
}

interface AddPAErrorResponse {
  response: {
    data: AddPAErrorResponseData;
    status: number;
  };
}

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
  email: yup
    .string()
    .required("*L'email est requis")
    .email('Veuillez entrer un email valide')
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  telephone: yup
    .string()
    .required('*Le numéro de téléphone est requis')
    .matches(
      frenchPhoneRegExp,
      '*Le numéro de téléphone doit être un numéro français'
    ),
});

const getDefaultValues = (PADefaultValues: PointAcceuilInfo): FormData => {
  return {
    nom: PADefaultValues?.nom || '',
    adresse: PADefaultValues?.adresse || '',
    adresse2: PADefaultValues?.adresse2 || '',
    adresse3: PADefaultValues?.adresse3 || '',
    ville: PADefaultValues?.ville || '',
    codePostal: PADefaultValues?.codePostal || '',
    cedex: PADefaultValues?.cedex || null,
    email: PADefaultValues?.email || '',
    telephone: PADefaultValues?.telephone || '',
  };
};

const formDefaultValues: PointAcceuilInfo = {
  id: '',
  nom: '',
  email: '',
  telephone: '',
  adresse: '',
  adresse2: '',
  adresse3: '',
  cedex: '',
  codePostal: '',
  adresseComplete: '',
  context: '',
  ville: '',
};

export const LPAForm = ({
  index,
  action,
  PADefaultValues = formDefaultValues,
}: LPAFormProps) => {
  const defaultValues = getDefaultValues(PADefaultValues);
  const endpoint =
    action === 'add'
      ? '/oc/points-accueil/create'
      : '/oc/points-accueil/update';
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorsFromBackend, setErrorsFromBackend] = useState<Record<
    string,
    string
  > | null>(null);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const context = useContext(OcEstablishmentContext);

  if (!context) {
    return null;
  }

  const {
    siren,
    region,
    departement,
    refetchEstablishments,
    resetEstablishments,
  } = context;

  const indexString = index ? `${index}` : '';

  const { handleSubmit } = methods;

  const openDeleteDialog = () => setIsDialogOpen(true);
  const closeDeleteDialog = () => setIsDialogOpen(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setErrorsFromBackend(null);
    setErrorMessage(null);
    setIsSubmitSuccess(false);

    const payload = {
      id: PADefaultValues?.id || null,
      nom: data.nom,
      ville: data.ville,
      codePostal: data.codePostal,
      adresse: data.adresse,
      adresse2: data.adresse2,
      adresse3: data.adresse3,
      cedex: data.cedex,
      email: data.email,
      telephone: data.telephone,
      adresseComplete:
        data.adresse +
        ', ' +
        data.adresse2 +
        ', ' +
        data.adresse3 +
        ', ' +
        data.codePostal +
        ', ' +
        data.ville,
      region: PADefaultValues?.region || '',
      departement: PADefaultValues?.departement || '',
      dateMaj: PADefaultValues?.dateMaj || '',
    };

    const method = action === 'add' ? 'post' : 'put';

    try {
      await axiosInstance[method](endpoint, payload, {
        withCredentials: true,
      });

      setIsSubmitSuccess(true);

      //   onFormSubmit();

      // onDataUpdate();
    } catch (error) {
      setIsSubmitSuccess(false);

      const axiosError = error as AxiosError<AddPAErrorResponse>;

      if (axiosError.response) {
        const { status, data } = axiosError.response;

        if (status === 400) {
          setErrorsFromBackend(data as unknown as AddPAErrorResponseData);
          return;
        }

        setErrorMessage('Une erreur est survenue');
        return;
      }
      setErrorMessage('Une erreur est survenue');
    } finally {
      if (action === 'add') {
        resetEstablishments();
        // refetchEstablishments({
        //   siren,
        //   region,
        //   departement,
        //   page: 0,
        // });
      }
      setIsLoading(false);
    }
  };

  const handleDeletePA = async (id: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/oc/points-accueil/${id}`, {
        withCredentials: true,
      });
      refetchEstablishments({
        siren,
        region,
        departement,
        page: 0,
      });
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la suppression');
    } finally {
      setIsLoading(false);
      closeDeleteDialog();
    }
  };

  return (
    <div className="p-8 border border-gray-200">
      <Badge
        variant={action === 'add' ? 'info' : 'new'}
        title={
          index
            ? OC_MES_ETABLISSEMENTS.PANumber(indexString)
            : OC_MES_ETABLISSEMENTS.newPA
        }
      />

      {errorMessage && (
        <Alert
          description={errorMessage}
          type="error"
          onClose={() => setErrorMessage(null)}
        />
      )}

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-4"
          data-testid="establishment-form"
        >
          <div className="w-full flex flex-col lg:flex-row  gap-x-12">
            <div className="w-full">
              <FormInputWithYup
                classes="w-full"
                label="Nom de l'établissement *"
                name="nom"
              />
              <div>{displayErrorFromBackend('nom', errorsFromBackend)} </div>
            </div>
            <div className="w-full"></div>
          </div>

          <div className="w-full flex flex-col lg:flex-row  gap-x-12">
            <div className="w-full">
              <FormInputWithYup
                classes="w-full"
                label="N° et libellé de la voie *"
                name="adresse"
              />
              <div>{displayErrorFromBackend('adresse', errorsFromBackend)}</div>
            </div>

            <div className="w-full">
              <FormInputWithYup label="Code postal *" name="codePostal" />
              <div>
                {displayErrorFromBackend('codePostal', errorsFromBackend)}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row  gap-x-12">
            <div className="w-full">
              <FormInputWithYup
                classes="w-full"
                label="Lieu-dit ou boîte postale"
                name="adresse2"
              />
              <div>
                {displayErrorFromBackend('adresse2', errorsFromBackend)}
              </div>
            </div>

            <div className="w-full">
              <FormInputWithYup label="Ville *" name="ville" />
              <div>{displayErrorFromBackend('ville', errorsFromBackend)} </div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row  gap-x-12">
            <div className="w-full">
              <FormInputWithYup
                classes="w-full"
                label="Information complémentaire"
                name="adresse3"
              />
              <div>
                {displayErrorFromBackend('adresse3', errorsFromBackend)}
              </div>
            </div>

            <div className="w-full">
              <FormInputWithYup label="Cedex" name="cedex" />
              <div>{displayErrorFromBackend('cedex', errorsFromBackend)} </div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row  gap-x-12">
            <div className="w-full">
              <FormInputWithYup
                classes="w-full"
                label="Téléphone *"
                name="telephone"
              />
              <div>
                {displayErrorFromBackend('telephone', errorsFromBackend)}
              </div>
            </div>

            <div className="w-full">
              <FormInputWithYup label="E-mail *" name="email" />
              <div>{displayErrorFromBackend('email', errorsFromBackend)} </div>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row  gap-x-12">
            <div className="w-full"></div>
            <div className="flex gap-x-6">
              <Button
                type="submit"
                // label={OC_MES_ETABLISSEMENTS.addPABtn}
                label={
                  action === 'add'
                    ? OC_MES_ETABLISSEMENTS.addPABtn
                    : OC_MES_ETABLISSEMENTS.savePA
                }
                // variant="primary"
                variant={action === 'add' ? 'primary' : 'secondary'}
                className="transform-none mt-6 self-end justify-self-end whitespace-nowrap inline-block"
              />
              {action === 'update' && (
                <Button
                  type="button"
                  label={OC_MES_ETABLISSEMENTS.deletePA}
                  variant="error"
                  className="transform-none mt-6 self-end justify-self-end whitespace-nowrap inline-block"
                  onClick={openDeleteDialog}
                />
              )}
            </div>
          </div>
          <DialogV2
            titre={COMMON.confirmAction}
            description={OC_MES_ETABLISSEMENTS.confirmationDeletePA}
            isOpen={isDialogOpen}
            onClickConfirm={() => handleDeletePA(PADefaultValues?.id)}
            onClickCancel={() => {
              closeDeleteDialog();
            }}
            onClickClose={closeDeleteDialog}
          ></DialogV2>

          {isLoading && (
            <Alert
              description={COMMON.chargement}
              type="info"
              onClose={() => setIsLoading(false)}
            />
          )}

          {isSubmitSuccess && (
            <div className="mt-6">
              <Alert
                description={
                  action === 'add'
                    ? OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL
                        .createPASuccessMsg
                    : OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL
                        .updatePASuccessMsg
                }
                type="success"
                onClose={() => setIsSubmitSuccess(false)}
              />
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};
