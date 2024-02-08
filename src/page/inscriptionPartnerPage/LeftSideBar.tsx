import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import {PartenaireSVGMobile} from "@/components/svg/PartenaireSVGMobile.tsx";
import {PartenaireSVG} from "@/components/svg/PartenaireSVG.tsx";


const LeftSideBar = () => {


    return (
        <>
            <div className="flex bg-darkPrimary justify-center align-middle py-20 w-full">
                <PartenaireSVG/>
                <PartenaireSVGMobile/>
            </div>

        </>
    );
}

export default LeftSideBar;
