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
import { useKeycloak } from '@react-keycloak/web';

interface InfoTabProps {
  setActionAndOpenModal: () => void;
}

interface RootState {
  membreInfo: {
    membreData: iMembreData | null;
    error: string | null;
  };
}

const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;

const schema = yup.object().shape(
  {
    nom: yup
      .string()
      .required('*Le nom est requis')
      .min(2, '*Le champs doit contenir 2 caractères'),
    prenom: yup.string().required('*Le prénom est requis').min(2),
    telephone: yup
      .string()
      .required('*Le numéro de telephone et requis')
      .matches(
        frenchPhoneRegExp,
        '*Le numéro de téléphone doit être un numéro français'
      ),
    fonction: yup
      .string()
      .required('*La fonction est requise')
      .max(10, '*Le champs doit contenir 10 caractères au maximum'),
    nouveauMdp: yup.string().when('nouveauMdp', (val) => {
      if (val?.length > 1) {
        return yup
          .string()
          .matches(
            passwordRegEx,
            '12 caractères, composé de chiffres, lettres et caractères spéciaux.'
          )
          .required();
      } else {
        return yup.string().notRequired().nullable();
      }
    }),
    confirmMdp: yup
      .string()
      .optional()
      .oneOf(
        [yup.ref('nouveauMdp')],
        '*Les mots de passes doivent être identiques'
      )
      .matches(
        passwordRegEx,
        '12 caractères, composé de chiffres, lettres et caractères spéciaux.'
      ),
  },
  [['nouveauMdp', 'nouveauMdp']]
);

const InfoTab = ({ setActionAndOpenModal }: InfoTabProps) => {
  const dispatch = useDispatch();
  const membreDataRedux = useSelector(
    (state: RootState) => state.membreInfo.membreData
  );

  const { error } = useSelector((state: RootState) => state.membreInfo);

  const { setAccountToDelete } = useDeleteAccount();

  const formDefaultValues = {
    login: membreDataRedux?.login || '',
    nom: membreDataRedux?.nom || '',
    prenom: membreDataRedux?.prenom || '',
    email: membreDataRedux?.email || '',
    telephone: membreDataRedux?.telephone || '',
    fonction: membreDataRedux?.fonction || '',
    nouveauMdp: '',
  };

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
    defaultValues: formDefaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

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

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) {
      dispatch(fetchMembreInfo(login));
    }
  }, [dispatch]);

  const { keycloak } = useKeycloak();

  const sendMyToken = (token: string) => {
    let result: boolean | null;

    fetch('/api/public/login', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      credentials: 'include',
      body: token,
    })
      .then(() => {
        result = true;
      })
      .catch(() => {
        result = false;
      })
      .finally(() => {
        return result;
      });
    return '';
  };
  /* FIN SAMPLE */

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
                      inputType="password"
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
                      inputType="password"
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
      {sendMyToken(keycloak.token!)}
    </>
  );
};

export default InfoTab;
