
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import LeftSideBar from "@/components/leftSideBar/LeftSideBar.tsx";

const HomePage= () => {

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <LeftSideBar/>
                <div className="flex flex-col lg:gap-2 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">

                </div>
            </div>
        </>
    );
}

export default HomePage;
