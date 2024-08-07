import { useDispatch, useSelector } from 'react-redux';
import LeftSideBar from '@/components/leftSideBar/LeftSideBar.tsx';
import React, { useState } from 'react';
import { submitSentMail } from '@/page/requestResetPasswordPage/action.ts';
import SubmitButton from '@/components/common/submitButton/SubmitButton.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface RootState {
  requestResetPasswordState: {
    sentRequestSuccess: boolean;
    isLoading: boolean;
    error: string | null;
  };
}
const RequestResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { error, sentRequestSuccess, isLoading } = useSelector(
    (state: RootState) => state.requestResetPasswordState
  );
  const [email, setEmail] = useState<string>('');
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(submitSentMail(email));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleButtonRedirect = () => {
    navigate('/');
  };
  return (
    <>
      {error && (
        <div className="fr-alert fr-alert--error fr-alert--sm bg-white">
          <p>Erreur : Veuillez réessyer ultérieurement</p>
        </div>
      )}
      <div className="flex flex-col md:flex-row bg-white shadow-custom">
        <LeftSideBar />
        <div className="flex flex-col gap-8 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="fr-h2 text-left mb-8">
              Réinitialisation du mot de passe
            </h2>
            <div className="register-form ">
              <form onSubmit={handleSubmitRequest}>
                <div className="form-group mb-6">
                  <label className="fr-label" htmlFor="email">
                    Identifiant ou e-mail
                  </label>
                  <input
                    className="fr-input"
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <SubmitButton
                  buttonLabel="Réinitialiser votre mot de passe"
                  isLoadingSubmit={isLoading}
                />
              </form>
            </div>
          </div>
          {sentRequestSuccess && (
            <>
              <div className="w-full max-w-4xl mx-auto space-y-10">
                <div className="fr-alert fr-alert--success">
                  <p>
                    Si cet identifiant correspond bien à un compte, un e-mail
                    vous a été envoyé pour vous permettre de réinitialiser votre
                    mot de passe.
                  </p>
                </div>

                <button
                  className="fr-btn fr-btn--lg fr-btn--secondary"
                  onClick={handleButtonRedirect}
                >
                  <ArrowBackIcon className="text-primary mr-3" />
                  <span>Retour à la connexion</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestResetPasswordPage;
