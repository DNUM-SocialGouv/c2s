import { useState } from 'react';
import { FormInputWithYup } from '../../common/input/FormInputWithYup.tsx';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { AxiosError } from 'axios';
import { Button } from '../../common/button/Button.tsx';
import { Alert } from '../../common/alert/Alert.tsx';
import { MODERATOR_MODERATORS } from '../../../wording.ts';

interface ErrorResponse {
  message?: string;
  email?: string;
  nom?: string;
  prenom?: string;
  fonction?: string;
  telephone?: string;
}

interface FormData {
  email: string;
  nom: string;
  prenom: string;
  fonction: string;
  telephone: string;
}

interface AddModeratorFormProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const endpoint = '/moderateur/moderateurs';

const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("*L'email est requis")
    .email('Veuillez entrer un email valide')
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  nom: yup
    .string()
    .required('*Le nom est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  prenom: yup
    .string()
    .required('*Le prénom est requis')
    .max(100, 'Le prénom ne peut pas dépasser 100 caractères'),
  fonction: yup
    .string()
    .required('*La fonction est requise')
    .max(100, 'La fonction ne peut pas dépasser 100 caractères'),
  telephone: yup
    .string()
    .required('*Le numéro de telephone et requis')
    .matches(
      frenchPhoneRegExp,
      '*Le numéro de téléphone doit être un numéro français'
    ),
});

const defaultValues: FormData = {
  email: '',
  nom: '',
  prenom: '',
  fonction: '',
  telephone: '',
};

export const AddModeratorForm = ({ targetRef }: AddModeratorFormProps) => {
  const [apiError, setApiError] = useState<ErrorResponse | null>(null);
  const [invitationSent, setInvitationSent] = useState<boolean>(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  //verifie si l'erreur est liée aux champs du formulaire
  const isFieldError = (data: unknown): data is ErrorResponse => {
    const allowedKeys = ['email', 'nom', 'prenom', 'fonction', 'telephone'];

    return (
      typeof data === 'object' &&
      data !== null &&
      Object.keys(data).every((key) => allowedKeys.includes(key))
    );
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    setInvitationSent(false);

    const payload = {
      email: data?.email,
      nom: data?.nom,
      prenom: data?.prenom,
      fonction: data?.fonction,
      telephone: data?.telephone,
    };

    try {
      await axiosInstance.post(endpoint, payload, {
        withCredentials: true,
      });
      setInvitationSent(true);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setApiError(
        isFieldError(axiosError.response?.data)
          ? axiosError.response?.data
          : {
              message:
                axiosError.message || 'Une erreur inconnue est survenue.',
            }
      );
    }
  };

  const getApiErrors = () => {
    if (!apiError) {
      return null;
    }

    const errors = Object.values(apiError);

    return (
      <div className="mt-4">
        <Alert
          type="error"
          label="Une erreur s'est produite lors de l'envoi de la requête"
          description={[...errors].join(', ')}
        />
      </div>
    );
  };

  return (
    <div
      data-testid="oc-team-mail-form"
      ref={targetRef}
      className="border-[1px] border-[#e5e5e5] p-4 pb-12 lg:p-8 lg:pb-24"
    >
      <p className="mb-2">{MODERATOR_MODERATORS.emailFormInstruction}</p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className={`w-full relative`}>
            <div className="flex flex-col lg:flex-row w-full justify-between lg:gap-x-8">
              <div className="w-full">
                <FormInputWithYup label="Nom *" name="nom" />
              </div>
              <div className="w-full">
                <FormInputWithYup label="Prénom *" name="prenom" />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full justify-between lg:gap-x-8">
              <div className="w-full">
                <FormInputWithYup label="E-mail *" name="email" />
              </div>
              <div className="w-full">
                <FormInputWithYup label="Téléphone *" name="telephone" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
              <div>
                <FormInputWithYup label="Fonction *" name="fonction" />
              </div>
              <Button
                type="submit"
                label={MODERATOR_MODERATORS.addNewModeratorBtn}
                variant="primary"
                className="transform-none mt-6 self-end justify-self-end"
              />
            </div>
          </div>
        </form>
      </FormProvider>

      {isSubmitting && (
        <div className="mt-4 lg:mt-8">
          <Alert type="info" label={MODERATOR_MODERATORS.emailSending} />
        </div>
      )}

      {invitationSent && (
        <div className="mt-4 lg:mt-8">
          <Alert
            type="success"
            label={MODERATOR_MODERATORS.emailConfirmation}
            onClose={() => setInvitationSent(false)}
          />
        </div>
      )}
      {apiError && getApiErrors()}
    </div>
  );
};
