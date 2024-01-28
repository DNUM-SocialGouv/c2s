import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InscriptionPartenairePage from "@/page/inscriptionPartenairePage/InscriptionPartenairePage.tsx";
import ValidationPage from "@/page/inscriptionPartenairePage/ValidationPage.tsx";
import HomePage from "@/page/homePage/HomePage.tsx";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage /> }/>
                <Route path="/inscription/validation" element={<ValidationPage /> }/>
                <Route path="/inscription" element={<InscriptionPartenairePage /> } />
            </Routes>
        </Router>
    );
};

export default App;


