import React from 'react';
import { Header } from '../../components/header/Header.tsx';
import { Footer } from '../../components/footer/Footer';
import { Svg } from '../../components/svg/Svg';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
interface MyFormProps {
    handleCheckboxChange: (checkboxName: string) => void;
}
const HomePage: React.FC<MyFormProps> = () => {

    return (
        <>
            <div className='dialog-off-canvas-main-canvas'>
                <Header />
                <div  className="flex">
                    <div className="flex bg-primary justify-center align-middle py-20 w-full">
                        <Svg />
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
