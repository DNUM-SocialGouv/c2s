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
} from '@/utils/RoutesList.ts';
import RequireAuth from '@/keycloak/RequireAuth';
import { Header } from '@/components/header/Header.tsx';
import { Footer } from '@/components/footer/Footer.tsx';
import { useKeycloak } from '@react-keycloak/web';

const App = () => {
  const logoutOptions = {};
  const { keycloak } = useKeycloak();

  const handleLogOut = () => {
    keycloak
      .logout(logoutOptions)
      .then((success) => {
        localStorage.removeItem('login');
        console.log('--> log: logout success ', success);
      })
      .catch((error) => {
        console.log('--> log: logout error ', error);
      });
  };
  const USED_ROUTE_LIST = featureFlipRoutes(
    true,
    ROUTES_LIST,
    FEATURE_FLIP_ROUTES_LIST
  );

  return (
    <>
      <div className="dialog-off-canvas-main-canvas">
        <Header
          isAuthenticated={keycloak?.authenticated}
          onClick={handleLogOut}
          userName={keycloak.tokenParsed?.name}
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
