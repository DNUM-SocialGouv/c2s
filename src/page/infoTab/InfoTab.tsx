import FormInput from "@/components/common/input/FormInput.tsx";
import React, { useState, useEffect } from "react";
import { fetchMembreInfo, updateMembreInfo } from "@/page/infoTab/action.ts";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteAccount } from '@/hooks/useDeleteAccount.tsx';

export interface iMembreData {
  membreId: string;
  login: string;
  nom: string;
  prenom: string;
  fonction: string;
  email: string;
  telephone: string;
  password: string;
}

export interface iDeleteObject {
  membreId: string;
  login: string;
  email: string;
}

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
  const membreDataRedux = useSelector((state: RootState) => state.membreInfo.membreData);
  const { error } = useSelector((state: RootState) => state.membreInfo);

  const {setAccountToDelete} = useDeleteAccount();
  useEffect(() => {
    if (membreDataRedux) {
      setMembreData(membreDataRedux);
      const { membreId, login, email } = membreDataRedux;
      setAccountToDelete({ membreId, login, email });
    }
  }, [membreDataRedux]);

  const [membreData, setMembreData] = useState<iMembreData>({
    membreId: "",
    login: "",
    nom: "",
    prenom: "",
    fonction: "",
    email: "",
    telephone: "",
    password: "",
  });
  const [isMatch, setIsMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(fetchMembreInfo(login));
    }
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
    if (confirmPassword !== null && confirmPassword !== "") {
      setIsMatch(value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
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
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 13.9996C14.4486 13.9996 14 13.551 14 12.9996C14 12.4482 14.4486 11.9996 15 11.9996C15.5514 11.9996 16 12.4482 16 12.9996C16 13.551 15.5514 13.9996 15 13.9996Z"
              fill="#CACAFB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 69.9996C4.4486 69.9996 4 69.551 4 68.9996C4 68.4482 4.4486 67.9996 5 67.9996C5.5514 67.9996 6 68.4482 6 68.9996C6 69.551 5.5514 69.9996 5 69.9996Z"
              fill="#CACAFB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M75 63.9996C74.4486 63.9996 74 63.551 74 62.9996C74 62.4482 74.4486 61.9996 75 61.9996C75.5514 61.9996 76 62.4482 76 62.9996C76 63.551 75.5514 63.9996 75 63.9996Z"
              fill="#CACAFB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M59 11.9996C58.4486 11.9996 58 11.551 58 10.9996C58 10.4482 58.4486 9.99963 59 9.99963C59.5514 9.99963 60 10.4482 60 10.9996C60 11.551 59.5514 11.9996 59 11.9996Z"
              fill="#CACAFB"
            />
            <path
              d="M42.1479 9.99963C58.7164 9.99963 72.1479 23.4311 72.1479 39.9996C72.1479 40.5519 71.7001 40.9996 71.1479 40.9996C70.5956 40.9996 70.1479 40.5519 70.1479 39.9996C70.1479 24.5357 57.6118 11.9996 42.1479 11.9996C26.6839 11.9996 14.1479 24.5357 14.1479 39.9996C14.1479 55.4636 26.6839 67.9996 42.1479 67.9996C53.3026 67.9996 63.255 61.4171 67.7263 51.4079C67.9515 50.9037 68.5429 50.6775 69.0472 50.9028C69.5514 51.128 69.7776 51.7194 69.5523 52.2237C64.7621 62.9469 54.0988 69.9996 42.1479 69.9996C25.5793 69.9996 12.1479 56.5682 12.1479 39.9996C12.1479 23.4311 25.5793 9.99963 42.1479 9.99963Z"
              fill="#E1000F"
            />
            <path
              d="M71.1479 48.5922C71.1479 49.1854 70.667 49.6663 70.0738 49.6663C69.4806 49.6663 68.9997 49.1854 68.9997 48.5922C68.9997 47.999 69.4806 47.5182 70.0738 47.5182C70.667 47.5182 71.1479 47.999 71.1479 48.5922Z"
              fill="#E1000F"
            />
            <path
              d="M14.4929 21.0317C14.0534 20.6972 13.426 20.7822 13.0915 21.2216C9.71184 25.661 7.85156 31.0794 7.85156 36.7774C7.85156 37.3297 8.29928 37.7774 8.85156 37.7774C9.40385 37.7774 9.85156 37.3297 9.85156 36.7774C9.85156 31.5209 11.566 26.5272 14.6828 22.4331C15.0174 21.9937 14.9323 21.3662 14.4929 21.0317Z"
              fill="#E1000F"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M55.9965 34.9166C55.2867 26.399 50.5208 21.9996 42 21.9996C33.4792 21.9996 28.7133 26.399 28.0035 34.9166C27.9497 35.5611 28.5128 36.0864 29.1521 35.988L31 35.7037V36.1406C30.2842 36.2786 29.7566 36.4695 29.3867 36.7453C28.4488 37.4445 27.9999 38.5629 27.9999 39.9996C27.9999 42.5519 29.4476 43.9996 31.9999 43.9996C32.1088 43.9996 32.2136 43.9822 32.3117 43.9501C33.3755 46.0129 35.0247 47.6985 37.0285 48.7615C37.0099 48.8379 37 48.9176 37 48.9996C37 50.2983 36.3811 51.4524 35.4222 52.1832C35.4067 52.1941 35.3916 52.2055 35.3768 52.2172C34.7123 52.7089 33.8901 52.9996 33 52.9996H31L30.7751 53.0038C27.5656 53.1221 25 55.7612 25 58.9996C25 59.5519 25.4477 59.9996 26 59.9996C26.5523 59.9996 27 59.5519 27 58.9996C27 56.7905 28.7909 54.9996 31 54.9996H33L33.2249 54.9955C34.0613 54.9647 34.854 54.7626 35.5689 54.4234C36.6411 56.1107 38.6184 56.6258 41.2425 55.9698C41.7783 55.8358 42.1041 55.2929 41.9701 54.7571C41.8362 54.2213 41.2933 53.8955 40.7575 54.0295C38.8877 54.4969 37.7957 54.2439 37.2131 53.2716C38.1917 52.3065 38.8402 51.0076 38.9742 49.5595C39.9351 49.8461 40.9501 49.9996 42 49.9996C43.0499 49.9996 44.0649 49.8461 45.0258 49.5595C45.3013 52.5372 47.7527 54.8841 50.7751 54.9955L51 54.9996H53C55.2091 54.9996 57 56.7905 57 58.9996C57 59.5519 57.4477 59.9996 58 59.9996C58.5523 59.9996 59 59.5519 59 58.9996C59 55.7612 56.4344 53.1221 53.2249 53.0038L53 52.9996H51C48.7909 52.9996 47 51.2088 47 48.9996C47 48.9176 46.9901 48.8379 46.9715 48.7615C48.9753 47.6985 50.6245 46.0129 51.6883 43.9501C51.7864 43.9822 51.8912 43.9996 52 43.9996C54.5523 43.9996 56 42.5519 56 39.9996C56 38.5629 55.5511 37.4445 54.6132 36.7453C54.1076 36.3683 53.3072 36.1499 52.1344 36.0086C52.0917 36.0028 52.048 35.9998 52.0037 35.9996L52.0021 35.9995C51.9056 35.9992 51.8116 36.0129 51.7222 36.0387C51.5782 36.0803 51.4475 36.1534 51.3381 36.25C51.1446 36.421 51.0178 36.6657 51.0017 36.9402C51.0002 36.9653 50.9997 36.9902 51 37.015V38.4996L50.9963 38.7754C50.8579 43.9045 46.8723 47.9996 42 47.9996C37.0406 47.9996 33 43.757 33 38.4996V35.396L42.1521 33.988L42.27 33.9625C42.5398 33.8869 42.7675 33.7007 42.8944 33.4468L43.8944 31.4468L43.9406 31.3395C44.1113 30.8689 43.9059 30.3346 43.4472 30.1052L43.3399 30.0591C42.8692 29.8883 42.3349 30.0937 42.1056 30.5524L41.336 32.0896L30.14 33.8116L30.1582 33.6829C31.1383 27.1507 35.0033 23.9996 42 23.9996L42.3591 24.0024C49.0103 24.1074 52.7461 27.1536 53.7885 33.348L53.84 33.6786L47.2425 32.0295L47.1278 32.0077C46.6313 31.9432 46.1542 32.2596 46.0299 32.7571C45.8959 33.2929 46.2217 33.8358 46.7575 33.9698L54.7575 35.9698L54.8743 35.9919C55.4941 36.0723 56.0501 35.5593 55.9965 34.9166ZM31 38.1897C30.7879 38.2454 30.6463 38.3008 30.5822 38.3486C30.2074 38.6281 29.9999 39.1449 29.9999 39.9996C29.9999 41.2715 30.4262 41.8522 31.5113 41.9746C31.2063 40.9675 31.0303 39.9009 31.0036 38.796L31 38.4996V38.1897ZM54 39.9996C54 41.2714 53.5738 41.8522 52.4887 41.9746C52.8209 40.8778 53 39.7102 53 38.4996V38.1898C53.2121 38.2455 53.3536 38.3008 53.4177 38.3486C53.7925 38.6281 54 39.1449 54 39.9996Z"
              fill="#000091"
            />
          </svg>
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
                value={membreData.login || ""}
                onChange={handleChange}
                isDisabled={true}
              />
              <FormInput
                label="Nom"
                name="nom"
                value={membreData.nom || ""}
                onChange={handleChange}
              />
              <FormInput
                label="Prénom"
                name="prenom"
                value={membreData.prenom || ""}
                onChange={handleChange}
              />
              <FormInput
                label="Fonction"
                name="fonction"
                value={membreData.fonction || ""}
                onChange={handleChange}
              />

              <div className="form-group">
                <div className="mb-8 mt-8 h-px bg-gray-300 flex-none order-2 self-stretch flex-grow-0"></div>
                <h5 className="fr-h5">Contacts</h5>
              </div>
              <FormInput
                label="E-mail"
                name="email"
                value={membreData.email || ""}
                onChange={handleChange}
                isDisabled={true}
              />
              <FormInput
                label="Téléphone"
                name="telephone"
                value={membreData.telephone || ""}
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
                <div className="fr-input-wrap" style={{ position: "relative" }}>
                  <input
                    className="fr-input"
                    aria-describedby="text-input-icon-messages"
                    data-testid="password"
                    id="password"
                    name="password"
                    type="password"
                    onChange={handlePasswordChange}
                    value={membreData.password || ""}
                  />
                </div>
              </div>

              <div className="form-group mb-6">
                <label className="fr-label" htmlFor="confirmPassword">
                  Confirmation du nouveau mot de passe
                </label>
                <div className="fr-input-wrap" style={{ position: "relative" }}>
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
