import { useSelector } from 'react-redux';
import { Header } from '../../components/header/Header.tsx';
import { Footer } from '../../components/footer/Footer';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';

import LeftSideBar from "@/page/inscriptionPartnerPage/LeftSideBar.tsx";
import FormComponent from "@/page/inscriptionPartnerPage/FormComponent.tsx";
import ValidationPage from "@/page/inscriptionPartnerPage/ValidationPage.tsx";

export interface iFormData {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    societe: string;
    groupe: string;
    siren: string;
    fonction: string;
    companyName: string;
}
const InscriptionPartnerPage = () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error, isSubscribe }= useSelector(state => state.inscription);

    return (
        <>
            <div className='dialog-off-canvas-main-canvas'>

                {error &&
                    <div className="fr-alert fr-alert--error fr-alert--sm">
                        <p>Erreur : Veuillez réassyer ultérieurement</p>
                    </div>
                }
                <Header/>

                    <div className="flex flex-col md:flex-row">
                        <LeftSideBar/>
                        {isSubscribe ? (<ValidationPage/>) : (     <FormComponent/>
                        )}
                    </div>

                <Footer/>
            </div>
        </>
    );
}

export default InscriptionPartnerPage;
