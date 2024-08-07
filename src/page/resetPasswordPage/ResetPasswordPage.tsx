import { useDispatch, useSelector } from 'react-redux';
import LeftSideBar from '@/components/leftSideBar/LeftSideBar.tsx';
import React, { useState, useEffect } from 'react';
import SubmitButton from '@/components/common/submitButton/SubmitButton.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { jwtDecode } from 'jwt-decode';
import { submitConfirmPassword } from '@/page/resetPasswordPage/action.ts';
import { RESET_PASSWORD_PAGE } from '@/wording';
import { ROLES_LIST } from '@/utils/RolesList';
import { validatePassword } from '@/utils/PasswordValidation.helper';

export interface iData {
  email?: string;
  password: string;
  token: string;
}
interface RootState {
  resetPasswordState: {
    resetPasswordSuccess: boolean;
    isLoading: boolean;
    error: string | null;
  };
}
const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, resetPasswordSuccess, isLoading } = useSelector(
    (state: RootState) => state.resetPasswordState
  );
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);
  const [isMatch, setIsMatch] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState<iData>({
    email: '',
    password: '',
    token: '',
  });

  const [isValidPassword, setIsValidPassword] = useState(true);

  const [redirectUrl, setRedirectUrl] = useState<string>('');

  useEffect(() => {
    const decodeToken = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        setData((prevState) => ({
          ...prevState,
          email: decoded.sub,
          token: token,
        }));
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
      }
    };

    decodeToken();
  }, [data]);

  useEffect(() => {
    const userRole = localStorage.getItem('role');

    if (userRole) {
      if (userRole === ROLES_LIST.ORGANISME_COMPLEMENTAIRE) {
        return setRedirectUrl('/oc');
      }
      if (userRole === ROLES_LIST.MODERATEUR) {
        return setRedirectUrl('/admin/membres');
      }
      if (userRole === ROLES_LIST.CAISSE) {
        return setRedirectUrl('/caisse');
      }
    }
  }, []);

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
  const togglePasswordConfirmVisibility = () =>
    setPasswordConfirmShown(!passwordConfirmShown);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(submitConfirmPassword(data));
    }
    if (!validatePassword(data.password)) {
      setIsValidPassword(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword !== null && confirmPassword !== '') {
      setIsMatch(value === confirmPassword);
    }
    setData((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsMatch(password === value);
  };

  const handleButtonRedirect = () => {
    navigate(`${redirectUrl}`);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <LeftSideBar />
        <div className="flex flex-col gap-8 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="fr-h2 text-left mb-8">
              {RESET_PASSWORD_PAGE.title}
            </h2>
            <div className="register-form ">
              <form onSubmit={handleSubmitRequest}>
                <div className="form-group mb-6">
                  <label className="fr-label" htmlFor="password">
                    {RESET_PASSWORD_PAGE.newPassword}
                    <span className="fr-hint-text">
                      {RESET_PASSWORD_PAGE.passwordInfos}
                    </span>
                  </label>
                  <div
                    className="fr-input-wrap"
                    style={{ position: 'relative' }}
                  >
                    <input
                      className="fr-input"
                      aria-describedby="text-input-icon-messages"
                      data-testid="password"
                      id="password"
                      name="password"
                      type={passwordShown ? 'text' : 'password'}
                      onChange={handlePasswordChange}
                      value={password}
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {passwordShown ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </button>
                  </div>
                  {!isValidPassword && (
                    <p className="fr-error-text">
                      {RESET_PASSWORD_PAGE.passwordComplexityError}
                    </p>
                  )}
                </div>
                <div className="form-group mb-6">
                  <label className="fr-label" htmlFor="confirmPassword">
                    {RESET_PASSWORD_PAGE.confirmPassword}
                  </label>
                  <div
                    className="fr-input-wrap"
                    style={{ position: 'relative' }}
                  >
                    <input
                      className="fr-input"
                      aria-describedby="text-input-icon-messages"
                      id="confirmPassword"
                      name="confirmPassword"
                      type={passwordConfirmShown ? 'text' : 'password'}
                      onChange={handleConfirmPasswordChange}
                      value={confirmPassword}
                    />
                    <button
                      onClick={togglePasswordConfirmVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {passwordConfirmShown ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </button>
                  </div>
                  {!isMatch && (
                    <p className="fr-error-text">
                      {RESET_PASSWORD_PAGE.passwordNotMatch}
                    </p>
                  )}
                  <br />
                  {error && (
                    <div className="fr-alert fr-alert--error fr-alert--sm">
                      <p dangerouslySetInnerHTML={{ __html: error }}></p>
                    </div>
                  )}
                  <br />
                </div>
                <SubmitButton
                  buttonLabel="Enregistrer ce mot de passe"
                  isLoadingSubmit={isLoading}
                />
              </form>
            </div>
          </div>
          {resetPasswordSuccess && (
            <>
              <div className="w-full max-w-4xl mx-auto space-y-10">
                <div className="fr-alert fr-alert--success">
                  <p>{RESET_PASSWORD_PAGE.successMsg}</p>
                </div>
              </div>
            </>
          )}
          <div className="w-full max-w-4xl mx-auto">
            <div className="mb-8 h-px bg-gray-300 flex-none order-2 self-stretch flex-grow-0"></div>
            <button
              className="fr-btn fr-btn--lg fr-btn--secondary"
              onClick={handleButtonRedirect}
            >
              <ArrowBackIcon className="text-primary mr-3" />
              <span>{RESET_PASSWORD_PAGE.toConnectionPage}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
