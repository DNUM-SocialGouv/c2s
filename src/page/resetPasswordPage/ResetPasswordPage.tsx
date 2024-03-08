import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "@/components/leftSideBar/LeftSideBar.tsx";
import React, { useState, useEffect } from "react";
import SubmitButton from "@/components/common/submitButton/SubmitButton.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { jwtDecode } from "jwt-decode";
import { submitConfirmPassword } from "@/page/resetPasswordPage/action.ts";
export interface iData {
  email?: string;
  password: string;
}
interface RootState {
  resetPasswordState:  {
    resetPasswordSuccess: boolean;
    isLoading: boolean;
    error: string | null;
  };
}
const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, resetPasswordSuccess, isLoading } = useSelector(
    (state: RootState) => state.resetPasswordState,
  );
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);
  const [isMatch, setIsMatch] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState<iData>({ email: "", password: "" });

  useEffect(() => {
    const decodeToken = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        setData((prevState) => ({
          ...prevState,
          email: decoded.sub,
        }));
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
      }
    };

    decodeToken();
  }, [data]);

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
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword !== null && confirmPassword !== "") {
      setIsMatch(value === confirmPassword);
    }
    setData((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsMatch(password === value);
  };

  const handleButtonRedirect = () => {
    navigate("/");
  };
  return (
    <>
      {error && (
        <div className="fr-alert fr-alert--error fr-alert--sm">
          <p>{error}</p>
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <LeftSideBar />
        <div className="flex flex-col gap-8 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="fr-h2 text-left mb-8">Définition du mot de passe</h2>
            <div className="register-form ">
              <form onSubmit={handleSubmitRequest}>
                <div className="form-group mb-6">
                  <label className="fr-label" htmlFor="password">
                    Nouveau mot de passe
                    <span className="fr-hint-text">
                      12 caractères, composé de chiffres, lettres et caractères
                      spéciaux.
                    </span>
                  </label>
                  <div
                    className="fr-input-wrap"
                    style={{ position: "relative" }}
                  >
                    <input
                      className="fr-input"
                      aria-describedby="text-input-icon-messages"
                      data-testid="password"
                      id="password"
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      onChange={handlePasswordChange}
                      value={password}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {passwordShown ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </span>
                  </div>
                </div>
                <div className="form-group mb-6">
                  <label className="fr-label" htmlFor="confirmPassword">
                    Confirmation du nouveau mot de passe
                  </label>
                  <div
                    className="fr-input-wrap"
                    style={{ position: "relative" }}
                  >
                    <input
                      className="fr-input"
                      aria-describedby="text-input-icon-messages"
                      id="confirmPassword"
                      name="confirmPassword"
                      type={passwordConfirmShown ? "text" : "password"}
                      onChange={handleConfirmPasswordChange}
                      value={confirmPassword}
                    />
                    <span
                      onClick={togglePasswordConfirmVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {passwordConfirmShown ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </span>
                  </div>
                  {!isMatch && (
                    <p className="fr-error-text">
                      Les mots de passe ne sont pas identiques.
                    </p>
                  )}
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
                  <p>Votre nouveau mot de passe a bien été enregistré</p>
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
              <span>Retour à la connexion</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;