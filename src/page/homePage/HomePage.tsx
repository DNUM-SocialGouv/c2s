import { Header } from '../../components/header/Header.tsx';
import { Footer } from '../../components/footer/Footer';
import { PartenaireSVG } from '../../components/svg/PartenaireSVG.tsx';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import {PartenaireSVGMobile} from "@/components/svg/PartenaireSVGMobile.tsx";

const HomePage= () => {

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
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default HomePage;
