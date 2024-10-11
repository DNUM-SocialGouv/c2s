import AlertValidMessage from '@/components/common/alertValidMessage/AlertValidMessage';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { Separator } from '@/components/common/svg/Seperator';
import { TextArea } from '@/components/common/textArea/TextArea';
import { COMMON, MODERATOR_RESOURCES_FORM } from '@/wording';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { schema } from './AddThematiqueValidationSchema';
import { axiosInstance } from '@/RequestInterceptor';
import { LoginContext } from '@/contexts/LoginContext';
import { CheckboxGroup } from '@/components/common/input/CheckboxGroup';

interface FormValues {
  titre: string;
  description: string;
  groupes: string[];
}

const AddThematiqueForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { setIsLogged } = useContext(LoginContext);

  const methods = useForm<FormValues>({
    defaultValues: { titre: '', description: '', groupes: [] },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    axiosInstance
      .post(`/moderateur/thematiques`, data, {
        withCredentials: true,
      })
      .then(() => {
        setIsLogged(false);
      })
      .finally(() => {
        setIsVisible(true);
        setTimeout(() => {
          setIsLogged(true);
        }, 1000);
      });
  };

  return (
    <FormProvider {...methods}>
      <form>
        <div>
          {isVisible && (
            <AlertValidMessage
              isVisible={isVisible}
              successMessage="Votre thématique a été créee avec succès"
              onClose={() => {
                setIsVisible(false);
              }}
            />
          )}
          <div className="form__container">
            <div>
              <h4 className="form__title--style">nouvelle thématique</h4>
            </div>
          </div>
          <div className="form__container--align">
            <div style={{ width: '48%' }}>
              <FormInputWithYup
                label={MODERATOR_RESOURCES_FORM.inputLabel}
                name={`titre`}
              />
              <div className="flex mt-8">
                <CheckboxGroup
                  name={'groupes'}
                  options={[
                    {
                      id: 'ORGANISME_COMPLEMENTAIRE',
                      label: COMMON.oc,
                    },
                    {
                      id: 'CAISSE',
                      label: COMMON.caisse,
                    },
                  ]}
                />
              </div>
            </div>
            <div style={{ width: '48%', paddingTop: '.8rem' }}>
              <TextArea
                label={MODERATOR_RESOURCES_FORM.textAreaLabel}
                name={`description`}
                rows={6}
              />
            </div>
          </div>
          <Separator />
          <div
            className="flex"
            style={{ marginTop: '1rem', justifyContent: 'flex-end' }}
          >
            <div className="flex__item form_btn--margin">
              <button
                className="fr-btn fr-btn--secondary"
                type="submit"
                disabled
              >
                {COMMON.cancel}
              </button>
            </div>
            <div className="flex__item form_btn--margin">
              <button
                className="fr-btn fr-btn--primary"
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
              >
                {COMMON.confirm}
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddThematiqueForm;
