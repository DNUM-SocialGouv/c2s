import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import ReadOnlyCheckboxGroup from '@/components/common/input/ReadOnlyCheckboxGroup';
import { Separator } from '@/components/common/svg/Seperator';
import { TextArea } from '@/components/common/textArea/TextArea';
import { MODERATOR_RESOURCES_FORM, COMMON } from '@/wording';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { schema } from '../RessourcesFormValidationSchema';
import { axiosInstance } from '@/RequestInterceptor';
import { ModeratorRessourcesFromAPI } from '@/domain/ModeratorRessources';
import { Button } from '@/components/common/button/Button';

interface Thematique {
  titre: string;
  description: string;
}

interface FormValues {
  thematiques?: Thematique[];
}

export const ThematiquesForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [thematiques, setThematiques] = useState<ModeratorRessourcesFromAPI[]>(
    []
  );

  const [defaultValues, setDefaultValues] = useState<Thematique[]>([]);

  useEffect(() => {
    axiosInstance
      .get<ModeratorRessourcesFromAPI[]>('/moderateur/thematiques', {
        withCredentials: true,
      })
      .then((response) => {
        const thematiquesFromAPI = response.data;
        //console.log(thematiquesFromAPI);
        setThematiques(thematiquesFromAPI);
        setDefaultValues(thematiques);
      })
      .then(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const methods = useForm<FormValues>({
    defaultValues: { thematiques: defaultValues },
    resolver: yupResolver(schema),
  });

  for (const thematique of thematiques) {
    methods.setValue(`thematiques.${thematique.id}.titre`, thematique.titre);
  }

  for (const thematique of thematiques) {
    methods.setValue(
      `thematiques.${thematique.id}.description`,
      thematique.description
    );
  }

  return (
    <>
      <FormProvider {...methods}>
        <form>
          {thematiques.length > 0 &&
            !isLoading &&
            thematiques.map((thematique, index) => {
              return (
                <div key={index}>
                  <div className="form__container">
                    <div>
                      <h3 className="form__title--style">{thematique.titre}</h3>
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
                        name={`thematiques.${thematique.id}.titre`}
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
                              checked:
                                thematique.groupe === 'ORGANISME_COMPLEMENTAIRE'
                                  ? true
                                  : false,
                            },
                            {
                              id: 'checkbox-caisse',
                              label: COMMON.caisse,
                              checked:
                                thematique.groupe === 'CAISSE' ? true : false,
                            },
                          ]}
                        />
                      </div>
                    </div>
                    <div style={{ width: '48%', paddingTop: '.8rem' }}>
                      <TextArea
                        label={MODERATOR_RESOURCES_FORM.textArea}
                        name={`thematiques.${thematique.id}.description`}
                      />
                    </div>
                  </div>
                  <Separator />
                </div>
              );
            })}
        </form>
      </FormProvider>
    </>
  );
};
