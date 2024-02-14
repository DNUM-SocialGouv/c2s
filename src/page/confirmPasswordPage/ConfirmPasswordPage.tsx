
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import LeftSideBar from "@/components/leftSideBar/LeftSideBar.tsx";

const ConfirmPasswordPage= () => {

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <LeftSideBar/>
                <div className="flex flex-col gap-2 w-full items-center px-20 py-10">
                </div>
            </div>
        </>
    );
}

export default ConfirmPasswordPage;
