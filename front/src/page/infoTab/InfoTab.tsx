import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { iMembreData } from '../../domain/OcInformationTab.ts';
import { Avatar } from '../../components/common/svg/Avatar.tsx';
import { FormInputWithYup } from '../../components/common/input/FormInputWithYup.tsx';
import { useDeleteAccount } from '../../hooks/useDeleteAccount.tsx';
import { schema } from './InformationTabValidationSchema.ts';
import { ErrorMessage } from '../../components/common/error/Error.tsx';
import { InfoTabHeader } from './InfoTabHeader.tsx';
import { Loader } from '../../components/common/loader/Loader.tsx';
import { DialogForInformationTab } from '../../components/common/modal/DialogForInformationsTab.tsx';
import { Alert } from '../../components/common/alert/Alert.tsx';
import { INFORMATIONS_FORM } from '../../wording.ts';

const InfoTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membreId, setMembreId] = useState<number | null>(null); 
  const [email] = useState(() => localStorage.getItem('email') || "")
  const [error, setError] = useState('');
  const { deleteAction } = useDeleteAccount();
  const { setAccountToDelete } = useDeleteAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  const methods = useForm<{
    nom: string;
    prenom: string;
    telephone: string;
    fonction: string;
    email?: string;
    confirmMdp?: string;
    nouveauMdp?: string;
  }>({
    defaultValues: {
      nom: '',
      prenom: '',
      telephone: '',
      fonction: '',
      email: '',
      confirmMdp: '',
      nouveauMdp: '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try { 
        const response = await fetch(`/api/partenaire/membres/search?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setMembreId(data.membreId);
          methods.setValue('email', data.email);
          methods.setValue('nom', data.nom);
          methods.setValue('prenom', data.prenom);
          methods.setValue('telephone', data.telephone);
          methods.setValue('fonction', data.fonction);
          methods.setValue('nouveauMdp', '');
          methods.setValue('confirmMdp', '');
        } else {
          if (response.status === 404) throw new Error('404, Not found');
          if (response.status === 500) throw new Error('500, internal server error');
          throw new Error(response.statusText);
        }
      } catch (error) {
        if (error instanceof Error && error?.message) {
          setError(error.message);
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    }

    if (email) {
      fetchData();
    }
  }, [email, methods]);

  let alertTimeoutAlert: null | ReturnType<typeof setTimeout> = null;

  const displayAlert = (type: 'success' | 'error', message: string) => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertShow(true);
    alertTimeoutAlert = setTimeout(() => setIsAlertShow(false), 5000);
  };

  const closeAlert = () => {
    if (alertTimeoutAlert) {
      clearTimeout(alertTimeoutAlert);
    }
    setIsAlertShow(false);
  };
  
  const onSubmit = (data: {
    nom: string;
    prenom: string;
    telephone: string;
    fonction: string;
    email?: string;
    confirmMdp?: string | null;
    nouveauMdp?: string | null;
  }) => {

    async function updateData(data: iMembreData) {
      try {
        const response = await fetch('/api/partenaire/membres/update', {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          displayAlert('success', INFORMATIONS_FORM.successMessage)
        } else {
            if (response.status === 400) throw new Error('400, Bad request');
            if (response.status === 404) throw new Error('404, Not found');
            if (response.status === 500) throw new Error('500, internal server error');
            throw new Error(response.statusText);
          }
      } catch (error) {
        displayAlert('error', INFORMATIONS_FORM.errorMessage)
        throw error;
      }
    }

    if (membreId !== null) {
      const membreToUpdate: iMembreData = {
        membreId: membreId,
        nom: data.nom,
        prenom: data.prenom,
        fonction: data.fonction,
        email,
        telephone: data.telephone,
        password: data.nouveauMdp || null
      };
      updateData(membreToUpdate);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Avatar />
            </div>
            <InfoTabHeader />
          </div>

          <div className="flex flex-col lg:gap-2 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">
            <div className="w-full max-w-4xl mx-auto">
                {isAlertShow &&
                  (<Alert
                    label={alertMessage}
                    type={alertType}
                    onClose={() => closeAlert()}
                />)
              }
              <div className="register-form">
                <FormProvider {...methods}>
                  <form>
                    <FormInputWithYup label="Nom" name="nom" />
                    <FormInputWithYup label="Prénom" name="prenom" />
                    <FormInputWithYup label="Fonction" name="fonction" />
                    <div className="form-group">
                      <div className="mb-8 mt-8 h-px bg-gray-300 flex-none order-2 self-stretch flex-grow-0"></div>
                      <h5 className="fr-h5">Contacts</h5>
                    </div>
                    <FormInputWithYup
                      label="E-mail"
                      name="email"
                      isDisabled={true}
                    />
                    <FormInputWithYup label="Téléphone" name="telephone" />
                    <div className="form-group">
                      <div className="mb-8 mt-8 h-px bg-gray-300 flex-none order-2 self-stretch flex-grow-0"></div>
                      <h5 className="fr-h5">Mot de passe</h5>
                    </div>
                    <div className="form-group mb-6">
                      <div
                        className="fr-input-wrap"
                        style={{ position: 'relative' }}
                      >
                        <FormInputWithYup
                          label="Nouveau mot de passe"
                          name="nouveauMdp"
                          inputType="password"
                        />
                        <span className="fr-hint-text">
                          12 caractères, composé de chiffres, lettres et
                          caractères spéciaux.
                        </span>
                      </div>
                    </div>
                    <div className="form-group mb-6">
                      <div
                        className="fr-input-wrap"
                        style={{ position: 'relative' }}
                      >
                        <FormInputWithYup
                          label="Nouveau mot de passe"
                          name="confirmMdp"
                          inputType="password"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between w-full flex-col md:flex-row gap-y-4 lg:gap-y-0">
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="fr-btn"
                        type="submit"
                      >
                        Enregistrer
                      </button>
                      <button
                        type="button"
                        className="fr-btn fr-btn--sm fr-btn--tertiary"
                        onClick={() => {
                          if (membreId) {
                            setAccountToDelete({
                              membreId: membreId,
                              email: email,
                            });
                            setIsModalOpen(true);
                          }
                        }}
                      >
                        Supprimer mon compte
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </div>
              <DialogForInformationTab
                titre="Confirmez cette action"
                description="Vous êtes sur le point de supprimer votre compte de l'espace Partenaire"
                isOpen={isModalOpen}
                onClickCancel={() => setIsModalOpen(false)}
                onClickConfirm={() => {
                  deleteAction();
                  setIsModalOpen(false);
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InfoTab;
