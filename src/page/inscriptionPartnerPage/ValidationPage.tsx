import React from 'react';
import { Header } from '../../components/header/Header.tsx';
import { Footer } from '../../components/footer/Footer';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import {PartenaireSVG} from "@/components/svg/PartenaireSVG.tsx";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {PartenaireSVGMobile} from "@/components/svg/PartenaireSVGMobile.tsx";
interface MyFormProps {
    handleCheckboxChange: (checkboxName: string) => void;
}
const ValidationPage: React.FC<MyFormProps> = () => {

    const navigate = useNavigate();

    const handleButtonRedirect = () => {
        navigate('/');
    };

    return (
        <>
            <div className='dialog-off-canvas-main-canvas'>
                <Header />
                <div className="flex">
                    <div className="flex bg-darkPrimary justify-center align-middle py-20 w-full">
                        <PartenaireSVG/>
                        <PartenaireSVGMobile/>
                    </div>
                    <div className="flex flex-col gap-2 w-full items-center px-20 py-10">
                        <div className="w-full max-w-4xl mx-auto space-y-10">
                            <h1 className="text-center mb-4">S'inscrire à l'espace Partenaire C2S</h1>
                            <div className="fr-alert fr-alert--success">
                                <h3 className="fr-alert__title">Votre demande d'adhésion a bien été reçue</h3>
                                <p>Elle sera traitée dans les meilleurs délais par notre équipe de modérateurs.</p>
                            </div>
                            <button className="fr-btn fr-btn--lg fr-btn--secondary" onClick={handleButtonRedirect}>
                                <ArrowBackIcon className="text-primary mr-3"/>
                                <span>Retour à l'accueil Partenaire</span>
                            </button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default ValidationPage;
