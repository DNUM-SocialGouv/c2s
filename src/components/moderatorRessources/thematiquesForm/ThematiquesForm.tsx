import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import ReadOnlyCheckboxGroup from '@/components/common/input/ReadOnlyCheckboxGroup';
import { Separator } from '@/components/common/svg/Seperator';
import { TextArea } from '@/components/common/textArea/TextArea';
import { MODERATOR_RESOURCES_FORM, COMMON } from '@/wording';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { schema } from '../ressourcesForm/RessourcesFormValidationSchema';
import { axiosInstance } from '@/RequestInterceptor';
import { ModeratorThematiqueFromAPI } from '@/domain/ModeratorRessources';
import { Button } from '@/components/common/button/Button';
import { findThematiqueById } from '@/utils/moderatorThematiquesRessources.helper';
import AlertValidMessage from '@/components/common/alertValidMessage/AlertValidMessage';
import { LinkListForm } from '../ressourcesForm/linkList/LinkList';
import { Alert } from '@/components/common/alert/Alert';

export interface Thematique {
  titre: string;
  description: string;
}

interface FormValues {
  thematiques?: Thematique[];
}

export const ThematiquesForm = () => {
  const [thematiques, setThematiques] = useState<ModeratorThematiqueFromAPI[]>(
    []
  );
  const [defaultValues, setDefaultValues] = useState<Thematique[]>([]);
  const [errors, setErrors] = useState<{
    thematiqueId: number;
    titre: string;
    description: string;
  }>({
    thematiqueId: 0,
    titre: '',
    description: '',
  });
  const [deleteErrors, setDeleteErrors] = useState<{
    thematiqueId: number;
    description: string;
  }>({
    thematiqueId: 0,
    description: '',
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [thematiqueId, setThematiqueId] = useState<number>(0);

  const fetchThematiques = async () => {
    axiosInstance
      .get<ModeratorThematiqueFromAPI[]>('/moderateur/thematiques', {
        withCredentials: true,
      })
      .then((response) => {
        const thematiquesFromAPI = response.data;
        setThematiques(thematiquesFromAPI);
        setDefaultValues(thematiquesFromAPI);
      });
  };

  useEffect(() => {
    fetchThematiques();
  }, []);

  const methods = useForm<FormValues>({
    defaultValues: { thematiques: defaultValues },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    for (const thematique of thematiques) {
      methods.setValue(`thematiques.${thematique.id}.titre`, thematique.titre);
      methods.setValue(
        `thematiques.${thematique.id}.description`,
        thematique.description
      );
    }
  }, [thematiques, methods]);

  const updateThematique = (
    thematiqueId: number,
    titre: string,
    description: string
  ) => {
    const thematiqueToUpdate = findThematiqueById(thematiques, thematiqueId);
    const payload = {
      titre: titre,
      description: description,
      groupe: thematiqueToUpdate?.groupe,
      ordre: thematiqueToUpdate?.ordre,
    };

    axiosInstance
      .put(`/moderateur/thematiques/${thematiqueId}`, payload, {
        withCredentials: true,
      })
      .then(() => {
        setThematiqueId(thematiqueId);
        setIsVisible(true);
      })
      .catch((error) => {
        console.error(error.response.data);
        setErrors({
          thematiqueId: thematiqueId,
          titre: error.response.data.titre,
          description: error.response.data.description,
        });
      })
      .finally(() => fetchThematiques());
  };

  const deleteThematique = async (thematiqueId: number) => {
    event?.preventDefault();
    axiosInstance
      .delete(`/moderateur/thematiques/${thematiqueId}`, {
        withCredentials: true,
      })
      .catch((error) => {
        console.error(error.response.data);
        setDeleteErrors({
          thematiqueId: thematiqueId,
          description: error.response.data.fichiers,
        });
      })
      .finally(() => {
        fetchThematiques();
      });
  };

  return (
    <FormProvider {...methods}>
      <form>
        {thematiques.length > 0 &&
          thematiques.map((thematique, index) => {
            return (
              <div key={index}>
                {deleteErrors &&
                  deleteErrors.thematiqueId === thematique.id && (
                    <>
                      <Alert
                        label="Une erreur est survenue."
                        type="error"
                        description={`Une erreur est survenue. ${deleteErrors.description}, Elle ne peut pas être supprimée`}
                      />
                      <br />
                    </>
                  )}

                <div className="form__container" style={{ marginTop: '0' }}>
                  <div>
                    <h3 className="form__title--style">{thematique.titre}</h3>
                  </div>
                  <div className="flex form_buttons__row">
                    <div className="flex__item">
                      <Button
                        icon="fr-icon-delete-line"
                        variant="secondary"
                        className="fr-btn--error form_delete__btn"
                        type="submit"
                        onClick={() => deleteThematique(thematique.id)}
                      />
                    </div>
                    <div className="flex__item form_btn--margin">
                      <button
                        className="fr-btn fr-btn--secondary"
                        type="submit"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          event.preventDefault();
                          const titre = methods.getValues(
                            `thematiques.${thematique.id}.titre`
                          );
                          const description = methods.getValues(
                            `thematiques.${thematique.id}.description`
                          );
                          methods.setValue(
                            `thematiques.${thematique.id}.titre`,
                            titre
                          );
                          methods.setValue(
                            `thematiques.${thematique.id}.description`,
                            description
                          );
                          updateThematique(thematique.id, titre, description);
                        }}
                      >
                        {COMMON.save}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form__container--align">
                  <div style={{ width: '48%' }}>
                    <FormInputWithYup
                      label={MODERATOR_RESOURCES_FORM.inputLabel}
                      name={`thematiques.${thematique.id}.titre`}
                      onKeyPress={() => {
                        setErrors({
                          thematiqueId: 0,
                          titre: '',
                          description: '',
                        });
                      }}
                    />
                    {errors.thematiqueId === thematique.id &&
                      errors.titre !== '' && (
                        <p
                          className="error-message pt-2"
                          style={{ color: 'red' }}
                        >
                          {errors.titre}
                        </p>
                      )}
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
                      label={MODERATOR_RESOURCES_FORM.textAreaLabel}
                      name={`thematiques.${thematique.id}.description`}
                      onKeyPress={() => {
                        setErrors({
                          thematiqueId: 0,
                          titre: '',
                          description: '',
                        });
                      }}
                    />
                    {errors.thematiqueId === thematique.id &&
                      errors.description !== '' && (
                        <p
                          className="error-message pt-2"
                          style={{ color: 'red' }}
                        >
                          {errors.description}
                        </p>
                      )}
                  </div>
                </div>
                {isVisible && thematiqueId === thematique.id && (
                  <AlertValidMessage
                    isVisible={isVisible}
                    successMessage="Votre thématique a été mise à jour"
                    onClose={() => {
                      setIsVisible(false);
                      setThematiqueId(0);
                    }}
                  />
                )}
                <Separator />
                <LinkListForm thematiqueId={thematique.id} />
                <Separator />
              </div>
            );
          })}
      </form>
    </FormProvider>
  );
};
