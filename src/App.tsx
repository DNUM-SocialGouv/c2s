import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './page/homePage/HomePage';
 import ValidationPage from './page/inscriptionPartnerPage/InscriptionPartnerPage'
import InscriptionPartnerPage from './page/inscriptionPartnerPage/ValidationPage';

const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/inscription/validation" element={<ValidationPage />} />
                    <Route path="/inscription" element={<InscriptionPartnerPage />} />
                </Routes>
        </Router>
    );
};

export default App;
