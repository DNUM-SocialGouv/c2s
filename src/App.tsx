import './App.css';

import { Routes, Route, } from 'react-router-dom';
import InscriptionParterrePage from "@/page/inscriptionPartnerPage/InscriptionPartnerPage.tsx";
import HomePage from "@/page/homePage/HomePage.tsx";
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage /> }/>
            <Route path="/inscription" element={<InscriptionParterrePage /> } />
        </Routes>
    );
};

export default App;