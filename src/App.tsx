import './App.css';

import {Routes, Route,} from 'react-router-dom';
import {ROUTES_LIST, ROUTES_PUBLIC_LIST} from "@/utils/RoutesList.ts";
import RequireAuth from "@/layouts/RequireAuth.tsx";
import {Header} from "@/components/header/Header.tsx";
import {Footer} from "@/components/footer/Footer.tsx";
import {useKeycloak} from "@react-keycloak/web";
const App = () => {
    const logoutOptions = {  };
    const { keycloak } = useKeycloak();
    return (
        <>
            <div className='dialog-off-canvas-main-canvas'>
                <Header/>
                <Routes>
                    {ROUTES_LIST.map(page =>
                        <Route key={page.link} element={<RequireAuth
                            requiredRoles={[...page?.authorizedRoles!, 'Admin', 'Caisse', 'OC']}/>}>
                            <Route path={page.link} element={<page.component/>}/>
                        </Route>
                    )}
                    {ROUTES_PUBLIC_LIST.map(page =>
                        <Route key={page.link} path={page.link} element={<page.component/>}/>
                    )}
                    <Route path="unauthorized" element={<div>You are not allowed to access this page</div>}/>
                </Routes>
                <Footer/>
                <div className="flex gap-4 py-6 justify-center">
                    {keycloak?.authenticated && (
                        <button onClick={() =>
                            keycloak.logout(logoutOptions)
                                .then((success) => {
                                    console.log("--> log: logout success ", success);
                                }).catch((error) => {
                                console.log("--> log: logout error ", error);
                            })
                        }
                        >logout</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default App;