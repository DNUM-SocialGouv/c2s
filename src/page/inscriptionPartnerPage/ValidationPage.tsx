import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ValidationPage = () => {
  const navigate = useNavigate();

  const handleButtonRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col lg:gap-2 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">
        <div className="w-full max-w-4xl mx-auto space-y-10">
          <h1 className="text-left mb-4">
            S'inscrire à l'espace Partenaire C2S
          </h1>
          <div className="fr-alert fr-alert--success">
            <h3 className="fr-alert__title">
              Votre demande d'adhésion a bien été reçue
            </h3>
            <p>
              Elle sera traitée dans les meilleurs délais par notre équipe de
              modérateurs.
            </p>
          </div>
          <button
            className="fr-btn fr-btn--lg fr-btn--secondary"
            onClick={handleButtonRedirect}
          >
            <ArrowBackIcon className="text-primary mr-3" />
            <span>Retour à l'accueil Partenaire</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ValidationPage;
