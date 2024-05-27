import { useEffect } from 'react';
import { fetchMembreInfo, updateMembreInfo } from '@/page/infoTab/action.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { iMembreData } from '@/domain/OcInformationTab';
import { Avatar } from '@/components/common/svg/Avatar';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';

interface InfoTabProps {
  setActionAndOpenModal: () => void;
}

interface RootState {
  membreInfo: {
    membreData: iMembreData | null;
    error: string | null;
  };
}

const schema = yup.object().shape({
  nom: yup.string().required('*Le nom est requis').min(2, 'Doit contenir au moins 2 caractères'),
  prenom: yup.string().required('*Le prénom est requis').min(2),
  telephone: yup.string().required('*Le numéro de telephone et requis').min(10, '*Le champs doit contenir 10 caractères'),
  fonction: yup.string().required('*La fonction est requise'),
  nouveauMdp: yup
    .string()
    .required('*Le mot de passe est requis').min(12, 'Doit contenir 12 caractères'),
  confirmMdp: yup
    .string()
    .required('*la confirmation est requise').oneOf([yup.ref('nouveauMdp')],'*Les mots de passes doivent être identiques'),
});

const InfoTab = ({ setActionAndOpenModal }: InfoTabProps) => {
  const dispatch = useDispatch();
  const membreDataRedux = useSelector(
    (state: RootState) => state.membreInfo.membreData
  );

  const { error } = useSelector((state: RootState) => state.membreInfo);

  const { setAccountToDelete } = useDeleteAccount();

  const formDefaultValues = { 
    nom: membreDataRedux?.nom || '',
    prenom: membreDataRedux?.prenom || '',
    telephone: membreDataRedux?.telephone || '',
    fonction: membreDataRedux?.fonction || '',
    confirmMdp: '',
    nouveauMdp: '',
  }

  const methods = useForm<{ 
    nom: string;
    prenom: string;
    telephone: string;
    fonction: string;
    confirmMdp: string;
    nouveauMdp: string;
  }>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: {
    nom: string;
    prenom: string;
    telephone: string;
    fonction: string;
    confirmMdp: string;
    nouveauMdp: string;
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
        password: data.nouveauMdp,
      };
      dispatch(updateMembreInfo(membreToUpdate));
    }
  };

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) {
      dispatch(fetchMembreInfo(login));
    }
  }, [dispatch]);

  return (
    <>
      {error && (
        <div className="fr-alert fr-alert--error fr-alert--sm bg-white">
          <p>Erreur : Veuillez réassyer ultérieurement</p>
        </div>
      )}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 flex items-center justify-center">
          <Avatar />
        </div>
        <div className="flex-grow mt-5">
          <h2 className="mb-0">Mes informations</h2>
          <p>Gérez les informations relatives à votre compte</p>
        </div>
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
                      inputType='password'
                    />
                    <span className="fr-hint-text">
                      12 caractères, composé de chiffres, lettres et caractères
                      spéciaux.
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
                      inputType='password'
                    />
                  </div>
                </div>
                <div className="flex justify-between w-full md:flex-row">
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
  );
};

export default InfoTab;
