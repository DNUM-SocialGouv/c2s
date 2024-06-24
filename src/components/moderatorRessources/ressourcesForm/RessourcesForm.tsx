import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/common/button/Button';
import './RessourcesForm.css';
import { Separator } from '@/components/common/svg/Seperator';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { schema } from './RessourcesFormValidationSchema';
import { TextArea } from '@/components/common/textArea/TextArea';
import { COMMON, MODERATOR_RESOURCES_FORM } from '@/wording';
import ReadOnlyCheckboxGroup from '@/components/common/input/ReadOnlyCheckboxGroup';

export const RessourceForm = () => {
  const content = {
    typeOrganisation: 'OC',
  };
  const [defaultValues] = useState({
    thematique: '',
    description: '',
  });
  const methods = useForm<{
    thematique: string;
    description: string;
  }>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  return (
    <div className="">
      <FormProvider {...methods}>
        <form>
          <div className="form__container">
            <div>
              <h3 className="form__title--style">évolution juridiques</h3>
            </div>
            <div className="flex form_buttons__row">
              <div className="flex__item">
                <Button
                  icon="fr-icon-delete-line"
                  variant="secondary"
                  className="fr-btn--error form_delete__btn"
                />
              </div>
              <div className="flex__item form_btn--margin">
                <Button label="Enregistrer" variant="secondary" />
              </div>
            </div>
          </div>
          <div className="form__container--align">
            <div style={{ width: '48%' }}>
              <FormInputWithYup
                label={MODERATOR_RESOURCES_FORM.inputLabel}
                name={'thematique'}
              />
              <br />
              <div className="flex">
                <ReadOnlyCheckboxGroup
                  legend={`Public`}
                  name={'typeOrganisation'}
                  options={[
                    {
                      id: 'checkbox-oc',
                      label: COMMON.oc,
                      checked: content.typeOrganisation === 'OC' ? true : false,
                    },
                    {
                      id: 'checkbox-caisse',
                      label: COMMON.caisse,
                      checked:
                        content.typeOrganisation === 'CAISSE' ? true : false,
                    },
                  ]}
                />
              </div>
            </div>
            <div style={{ width: '48%', paddingTop: '.8rem' }}>
              <TextArea
                label={MODERATOR_RESOURCES_FORM.textArea}
                name={'description'}
              />
            </div>
          </div>
          <Separator />
        </form>
      </FormProvider>
    </div>
  );
};
