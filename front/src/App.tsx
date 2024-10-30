import './App.css';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import { Routes, Route } from 'react-router-dom';
import {
  FEATURE_FLIP_ROUTES_LIST,
  ROUTES_LIST,
  ROUTES_PUBLIC_LIST,
  featureFlipRoutes,
} from './utils/RoutesList.ts';
import RequireAuth from './keycloak/RequireAuth.tsx';
import { Header } from './components/header/Header.tsx';
import { Footer } from './components/footer/Footer.tsx';
import { useKeycloak } from '@react-keycloak/web';
import packageJson from '../package.json';
import { useLogoutUserAfterInactivity } from './hooks/useLogoutUserAfterInactivity';
//import { axiosInstance } from './RequestInterceptor';

const App = () => {
  const logoutOptions = {};
  const { keycloak } = useKeycloak();

  const handleLogOut = () => {
    keycloak
      .logout(logoutOptions)
      .then((success) => {
        localStorage.removeItem('email');
        console.info('--> log: logout success ', success);
      })
      .catch((error) => {
        console.info('--> log: logout error ', error);
      });
  };
  const USED_ROUTE_LIST = featureFlipRoutes(
    false,
    ROUTES_LIST,
    FEATURE_FLIP_ROUTES_LIST
  );

  const { givenName = '', familyName = '' } = {
    givenName: localStorage.getItem('givenName'),
    familyName: localStorage.getItem('familyName'),
  };

  console.info('version number ', packageJson.version);

  useLogoutUserAfterInactivity(900000);

  return (
    <>
      <div className="dialog-off-canvas-main-canvas">
        <Header
          isAuthenticated={keycloak?.authenticated}
          onClick={handleLogOut}
          userName={givenName + ' ' + familyName}
        />
        <Routes>
          {USED_ROUTE_LIST.map((page) => (
            <Route
              key={page.link}
              element={
                <RequireAuth
                  requiredRoles={[...(page.authorizedRoles ?? [])]}
                />
              }
            >
              <Route path={page.link} element={<page.component />} />
            </Route>
          ))}
          {ROUTES_PUBLIC_LIST.map((page) => (
            <Route
              key={page.link}
              path={page.link}
              element={<page.component />}
            />
          ))}
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
