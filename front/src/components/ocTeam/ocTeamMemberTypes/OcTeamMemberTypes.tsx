import { useEffect, useState } from 'react';
import { Button } from '../../common/button/Button.tsx';
import { CheckboxGroupWithYup } from '../../common/checkboxGroup/CheckBoxGroupWithYup.tsx';
import { Alert } from '../../common/alert/Alert.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../OcTeamMemberTypesSchema.ts';
import { OC_TEAM } from '../../../wording.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { AxiosError } from 'axios';

interface OcTeamMemberTypesProps {
  memberTypes: string[];
  memberEmail: string;
}

interface FormValues {
  membertypesform: string[];
}

interface ErrorResponse {
  type: string;
}

export const OcTeamMemberTypes = ({
  memberTypes,
  memberEmail,
}: OcTeamMemberTypesProps) => {
  const [error, setError] = useState<string | null>(null);
  const [formWasSent, setFormWasSent] = useState<boolean>(false);
  const [updatedMemberTypes, setUpdatedMemberTypes] =
    useState<string[]>(memberTypes);

  useEffect(() => {
    return () => {
      setError(null);
      setFormWasSent(false);
    };
  }, []);

  const changeTypes = async (email: string, types: string[] = []) => {
    const typesAsParams =
      types.length > 0
        ? types.map((type) => `types=${encodeURIComponent(type)}`).join('&')
        : 'types=';

    const endpoint = `/oc/equipes?email=${encodeURIComponent(email)}&${typesAsParams}`;

    try {
      const response = await axiosInstance.put(endpoint, {
        withCredentials: true,
      });

      if (response.data === true) {
        setFormWasSent(true);
        setUpdatedMemberTypes(types);
        return;
      }
      throw new Error(`réponse serveur: ${response}`);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error:', error);
      if (axiosError.response?.data?.type) {
        setError(axiosError.response?.data?.type);
      } else {
        setError(OC_TEAM.changeTypesError);
      }

      setFormWasSent(false);
    }
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      membertypesform: updatedMemberTypes ?? [],
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset({
      membertypesform: updatedMemberTypes ?? [],
    });
  }, [updatedMemberTypes, reset]);

  const onSubmit = (data: FormValues) => {
    setError(null);
    setFormWasSent(false);

    if (!memberEmail) {
      setError(OC_TEAM.changeTypesErrorMail);
      return;
    }

    changeTypes(memberEmail, data.membertypesform);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="px-8 lg:px-32">
          <div className="flex flex-col justify-center w-full mb-6">
            <CheckboxGroupWithYup
              name="membertypesform"
              classes="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between"
              options={[
                { value: 'GESTION', label: OC_TEAM.typeGestion },
                { value: 'STATISTIQUES', label: OC_TEAM.typeStatistiques },
                { value: 'DECLARATION_TSA', label: OC_TEAM.typeDeclaration },
              ]}
            />
          </div>
          <Button
            className="fr-btn--transform-none mb-8 float-none"
            variant="primary"
            label={OC_TEAM.saveTypes}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </FormProvider>

      {formWasSent && !error && (
        <Alert
          label={OC_TEAM.changeTypesSuccess}
          type="success"
          onClose={() => setFormWasSent(false)}
        />
      )}
      {error && <Alert label={error} type="error" onClose={handleCloseError} />}
    </>
  );
};
