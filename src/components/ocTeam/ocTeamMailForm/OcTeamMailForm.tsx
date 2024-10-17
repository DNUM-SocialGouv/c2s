import { useState } from 'react';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosInstance } from '@/RequestInterceptor';
import { AxiosError } from 'axios';
import { Button } from '@/components/common/button/Button';
import { Alert } from '@/components/common/alert/Alert';
import { OC_TEAM } from '@/wording';

interface ErrorResponse {
  message: string;
  email?: string;
}

interface FormData {
  email: string;
}

interface OcTeamMailFormProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const endpoint = '/oc/equipes';

const schema = yup.object().shape({
  email: yup
    .string()
    .required("*L'email est requis")
    .email('Veuillez entrer un email valide')
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
});

const defaultValues: FormData = {
  email: '',
};

export const OcTeamMailForm = ({ targetRef }: OcTeamMailFormProps) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [invitationSent, setInvitationSent] = useState<boolean>(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    setInvitationSent(false);

    const payload = {
      email: data?.email,
    };

    try {
      await axiosInstance.post(endpoint, payload, {
        withCredentials: true,
      });
      setInvitationSent(true);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error:', axiosError);
      setApiError(
        axiosError.response?.data?.message ||
          axiosError.response?.data?.email ||
          axiosError?.message ||
          'erreur inconnue'
      );
    }
  };

  return (
    <div
      data-testid="oc-team-mail-form"
      ref={targetRef}
      className="border-[1px] border-[#e5e5e5] p-4 pb-12 lg:p-8 lg:pb-24"
    >
      <p className="mb-2">{OC_TEAM.emailFormInstruction}</p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div
            className={`w-full flex flex-col lg:flex-row gap-y-6 lg:justify-between ${Object.keys(errors).length ? 'lg:items-center' : 'lg:items-end'}`}
          >
            <div className="w-full lg:w-5/12">
              <FormInputWithYup label="E-mail *" name="email" />
            </div>
            <Button
              type="submit"
              label="Envoyer une invitation"
              variant="primary"
              className="transform-none"
              icon="send-plane-fill"
              iconPosition="right"
            />
          </div>
        </form>
      </FormProvider>

      {isSubmitting && (
        <div className="mt-4 lg:mt-8">
          <Alert type="info" label={OC_TEAM.emailSending} />
        </div>
      )}

      {invitationSent && (
        <div className="mt-4 lg:mt-8">
          <Alert
            type="success"
            label={OC_TEAM.emailConfirmation}
            onClose={() => setInvitationSent(false)}
          />
        </div>
      )}
      {apiError && (
        <div className="mt-4 lg:mt-8">
          <Alert
            type="error"
            label="Une erreur s'est produite lors de l'envoi de l'email"
            description={apiError}
            onClose={() => setApiError(null)}
          />
        </div>
      )}
    </div>
  );
};
