import { useEffect, useState } from 'react';
import { fetchMembreInfo, updateMembreInfo } from '@/page/infoTab/action.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { iMembreData } from '@/domain/OcInformationTab';
import { Avatar } from '@/components/common/svg/Avatar';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { schema } from './InformationTabValidationSchema';
import { ErrorMessage } from '../../components/common/error/Error';
import { InfoTabHeader } from './InfoTabHeader';
import { Loader } from '@/components/common/loader/Loader';

interface InfoTabProps {
  setActionAndOpenModal: () => void;
}

interface RootState {
  membreInfo: {
    membreData: iMembreData | null;
    error: string | null;
  };
}

const InfoTab = ({ setActionAndOpenModal }: InfoTabProps) => {
  const dispatch = useDispatch();

  const [membreDataRedux, setMembreDataRedux] = useState<iMembreData | null>(
    null
  );
  const { error } = useSelector((state: RootState) => state.membreInfo);
  const { setAccountToDelete } = useDeleteAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState({
    login: membreDataRedux?.login || '',
    nom: membreDataRedux?.nom || '',
    prenom: membreDataRedux?.prenom || '',
    email: membreDataRedux?.email || '',
    telephone: membreDataRedux?.telephone || '',
    fonction: membreDataRedux?.fonction || '',
    nouveauMdp: '',
  });

  const methods = useForm<{
    login?: string;
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
    const login = localStorage.getItem('login');
    if (login) {
      dispatch(fetchMembreInfo(login));
      fetch(`/api/oc/membres/search?login=${login}`)
        .then((res) => {
          return res.json();
        })
        .then((data: iMembreData) => {
          setMembreDataRedux(data);
          if (data.email) {
            const formValues = {
              login: data.login,
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
              methods.setValue('login', defaultValues.login);
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
    login?: string;
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
        login: membreDataRedux.login,
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
      dispatch(updateMembreInfo(membreToUpdate));
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
          {error && (
            <ErrorMessage
              message={'Erreur: veuilliez réessayer ultérieurement'}
            />
          )}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Avatar />
            </div>
            <InfoTabHeader />
          </div>
          <div className="flex flex-col lg:gap-2 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">
            <div className="w-full max-w-4xl mx-auto">
              <div className="register-form">
                <FormProvider {...methods}>
                  <form>
                    <FormInputWithYup
                      label="Identifiant"
                      name="login"
                      isDisabled={true}
                    />
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
                              login: membreDataRedux?.login,
                              email: membreDataRedux?.email,
                            });
                            setActionAndOpenModal();
                          }
                        }}
                      >
                        Supprimer mon compte
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InfoTab;
