import React from 'react';
import { Header } from '../../components/header/Header.tsx';
import { Footer } from '../../components/footer/Footer';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import {Svg} from "@/components/svg/Svg.tsx";
import {useNavigate} from "react-router-dom";
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
                <div  className="flex">
                    <div className="flex bg-primary justify-center align-middle py-20 w-full">
                        <Svg />
                    </div>
                    <div className="flex flex-col gap-2 w-full items-center px-20 py-10">
                        <div className="w-full max-w-4xl mx-auto space-y-10">
                            <h1 className="text-center mb-4">S'inscrire à l'espace Partenaire C2S</h1>
                            <div className="fr-alert fr-alert--success">
                            <h3 className="fr-alert__title">Votre demande d'adhésion a bien été reçue</h3>
                                <p>Elle sera traitée dans les meilleurs délais par notre équipe de modérateurs.</p>
                            </div>
                            <button className="fr-btn fr-btn--lg fr-btn--secondary" onClick={handleButtonRedirect}>
                                <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M15 19l-7-7 7-7"/>
                                </svg>
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
