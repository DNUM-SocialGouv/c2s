import AlertValidMessage from '@/components/common/alertValidMessage/AlertValidMessage';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { Separator } from '@/components/common/svg/Seperator';
import { TextArea } from '@/components/common/textArea/TextArea';
import { COMMON, MODERATOR_RESOURCES_FORM } from '@/wording';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { schema } from './AddThematiqueValidationSchema';
import { RadioGroupWithYup } from '@/components/common/radioGroup/RadioGroupWithYup';
import { axiosInstance } from '@/RequestInterceptor';

interface FormValues {
  titre: string;
  description: string;
  groupe: string;
}

const AddThematiqueForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const methods = useForm<FormValues>({
    defaultValues: { titre: '', description: '', groupe: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    axiosInstance
      .post(`/moderateur/thematiques`, data, {
        withCredentials: true,
      })
      .finally(() => {
        setIsVisible(true);
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
              <br />
              <div className="flex">
                <RadioGroupWithYup
                  name={'groupe'}
                  options={[
                    {
                      value: 'ORGANISME_COMPLEMENTAIRE',
                      label: COMMON.oc,
                    },
                    {
                      value: 'CAISSE',
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
              />
            </div>
          </div>
          <div className="flex" style={{ marginTop: '2rem' }}>
            <div className="flex__item form_btn--margin">
              <button
                className="fr-btn fr-btn--secondary"
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
              >
                {COMMON.save}
              </button>
            </div>
          </div>
          <Separator />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddThematiqueForm;
