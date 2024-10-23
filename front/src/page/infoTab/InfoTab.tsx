import { useEffect, useState } from 'react';
import { fetchMembreInfo, updateMembreInfo } from './action.ts';
import { useDispatch, useSelector } from 'react-redux';
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
import AlertValidMessage from '../../components/common/alertValidMessage/AlertValidMessage.tsx';
import { INFORMATIONS_FORM } from '../../wording.ts';

interface RootState {
  membreInfo: {
    membreData: iMembreData | null;
    error: string | null;
  };
}

const InfoTab = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteAction } = useDeleteAccount();
  const openModal = () => setIsModalOpen(true);
  const setActionAndOpenModalForInformationsTab = () => {
    openModal();
  };
  const [membreDataRedux, setMembreDataRedux] = useState<iMembreData | null>(
    null
  );
  const { error } = useSelector((state: RootState) => state.membreInfo);
  const { setAccountToDelete } = useDeleteAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState({
    nom: membreDataRedux?.nom || '',
    prenom: membreDataRedux?.prenom || '',
    email: membreDataRedux?.email || '',
    telephone: membreDataRedux?.telephone || '',
    fonction: membreDataRedux?.fonction || '',
    nouveauMdp: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const methods = useForm<{
    nom: string;
    prenom: string;
    telephone: string;
    fonction: string;
    email?: string;
    confirmMdp?: string;
    nouveauMdp?: string;
  }>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      // FIXME: doublon du fetch()
      dispatch(fetchMembreInfo(email));
      fetch(`/api/oc/membres/search?email=${email}`)
        .then((res) => {
          return res.json();
        })
        .then((data: iMembreData) => {
          setMembreDataRedux(data);
          if (data.email) {
            const formValues = {
              nom: data.nom,
              prenom: data.prenom,
              email: data.email,
              telephone: data.telephone,
              fonction: data.fonction,
              nouveauMdp: '',
            };
            setDefaultValues(formValues);
            if (defaultValues.email && defaultValues.email !== '') {
              methods.setValue('email', defaultValues.email);
              methods.setValue('nom', defaultValues.nom);
              methods.setValue('prenom', defaultValues.prenom);
              methods.setValue('telephone', defaultValues.telephone);
              methods.setValue('fonction', defaultValues.fonction);
              setIsLoading(false);
            }
          }
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoading, defaultValues.email]);

  const onSubmit = (data: {
    nom: string;
    prenom: string;
    telephone: string;
    fonction: string;
    email?: string;
    confirmMdp?: string | null;
    nouveauMdp?: string | null;
  }) => {
    if (membreDataRedux && membreDataRedux.membreId) {
      const membreToUpdate = {
        membreId: membreDataRedux.membreId,
        nom: data.nom,
        prenom: data.prenom,
        fonction: data.fonction,
        email: membreDataRedux.email,
        telephone: data.telephone,
        password:
          data.nouveauMdp && data.nouveauMdp?.length > 1
            ? data.nouveauMdp
            : membreDataRedux.password,
      };
      // FIXME: quick fix. à modifier en supprimant le store
      setShowSuccessMessage(true);
      // FIXME: utiliser une méthode sans passer par le store
      dispatch(updateMembreInfo(membreToUpdate));
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  return (
    <>
      {isLoading && defaultValues.email !== '' ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {error && <ErrorMessage message={INFORMATIONS_FORM.errorMessage} />}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Avatar />
            </div>
            <InfoTabHeader />
          </div>

          <div className="flex flex-col lg:gap-2 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">
            <div className="w-full max-w-4xl mx-auto">
              {showSuccessMessage && !error && (
                <AlertValidMessage
                  successMessage={INFORMATIONS_FORM.successMessage}
                  isVisible={showSuccessMessage}
                  onClose={() => setShowSuccessMessage(false)}
                />
              )}
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
                          if (membreDataRedux && membreDataRedux.membreId) {
                            setAccountToDelete({
                              membreId: membreDataRedux?.membreId,
                              email: membreDataRedux?.email,
                            });
                            setActionAndOpenModalForInformationsTab();
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
