import FormInput from '@/components/common/input/FormInput.tsx';
import React, { useState, useEffect } from 'react';
import { fetchMembreInfo, updateMembreInfo } from '@/page/infoTab/action.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteAccount } from '@/hooks/useDeleteAccount.tsx';
import { iMembreData } from '@/domain/OcInformationTab';
import { Avatar } from '@/components/common/svg/Avatar';

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
  const membreDataRedux = useSelector(
    (state: RootState) => state.membreInfo.membreData
  );
  const { error } = useSelector((state: RootState) => state.membreInfo);

  const { setAccountToDelete } = useDeleteAccount();
  useEffect(() => {
    if (membreDataRedux) {
      setMembreData(membreDataRedux);
      const { membreId, login, email } = membreDataRedux;
      setAccountToDelete({ membreId, login, email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membreDataRedux]);

  const [membreData, setMembreData] = useState<iMembreData>({
    membreId: '',
    login: '',
    nom: '',
    prenom: '',
    fonction: '',
    email: '',
    telephone: '',
    password: '',
  });
  const [isMatch, setIsMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) {
      dispatch(fetchMembreInfo(login));
    }
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateMembreInfo(membreData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMembreData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMembreData((prevState) => ({
      ...prevState,
      password: value,
    }));
    if (confirmPassword !== null && confirmPassword !== '') {
      setIsMatch(value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setIsMatch(membreData.password === value);
  };
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
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Identifiant"
                name="login"
                value={membreData.login || ''}
                onChange={handleChange}
                isDisabled={true}
              />
              <FormInput
                label="Nom"
                name="nom"
                value={membreData.nom || ''}
                onChange={handleChange}
              />
              <FormInput
                label="Prénom"
                name="prenom"
                value={membreData.prenom || ''}
                onChange={handleChange}
              />
              <FormInput
                label="Fonction"
                name="fonction"
                value={membreData.fonction || ''}
                onChange={handleChange}
              />

              <div className="form-group">
                <div className="mb-8 mt-8 h-px bg-gray-300 flex-none order-2 self-stretch flex-grow-0"></div>
                <h5 className="fr-h5">Contacts</h5>
              </div>
              <FormInput
                label="E-mail"
                name="email"
                value={membreData.email || ''}
                onChange={handleChange}
                isDisabled={true}
              />
              <FormInput
                label="Téléphone"
                name="telephone"
                value={membreData.telephone || ''}
                onChange={handleChange}
              />
              <div className="form-group">
                <div className="mb-8 mt-8 h-px bg-gray-300 flex-none order-2 self-stretch flex-grow-0"></div>
                <h5 className="fr-h5">Mot de passe</h5>
              </div>
              <div className="form-group mb-6">
                <label className="fr-label" htmlFor="password">
                  Nouveau mot de passe
                  <span className="fr-hint-text">
                    12 caractères, composé de chiffres, lettres et caractères
                    spéciaux.
                  </span>
                </label>
                <div className="fr-input-wrap" style={{ position: 'relative' }}>
                  <input
                    className="fr-input"
                    aria-describedby="text-input-icon-messages"
                    data-testid="password"
                    id="password"
                    name="password"
                    type="password"
                    onChange={handlePasswordChange}
                    value={membreData.password || ''}
                  />
                </div>
              </div>

              <div className="form-group mb-6">
                <label className="fr-label" htmlFor="confirmPassword">
                  Confirmation du nouveau mot de passe
                </label>
                <div className="fr-input-wrap" style={{ position: 'relative' }}>
                  <input
                    className="fr-input"
                    aria-describedby="text-input-icon-messages"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword}
                  />
                </div>
                {!isMatch && (
                  <p className="fr-error-text">
                    Les mots de passe ne sont pas identiques.
                  </p>
                )}
              </div>
              <div className="flex justify-between w-full md:flex-row">
                <button className="fr-btn" type="submit">
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="fr-btn fr-btn--sm fr-btn--tertiary"
                  onClick={() => setActionAndOpenModal()}
                >
                  Supprimer mon compte
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoTab;
