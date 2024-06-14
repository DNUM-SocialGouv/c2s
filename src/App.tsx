import './App.css';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import { Routes, Route } from 'react-router-dom';
import { ROUTES_LIST, ROUTES_PUBLIC_LIST } from '@/utils/RoutesList.ts';
import RequireAuth from '@/keycloak/RequireAuth';
import { Header } from '@/components/header/Header.tsx';
import { Footer } from '@/components/footer/Footer.tsx';
import { useKeycloak } from '@react-keycloak/web';
import { NotAuthorizedPage } from './page/NotAuthorizedPage/NotAuthorizedPage';

const App = () => {
  const logoutOptions = {};
  const { keycloak } = useKeycloak();
  const handleLogOut = () => {
    keycloak
      .logout(logoutOptions)
      .then((success) => {
        localStorage.removeItem('login');
        localStorage.removeItem('role');
        console.log('--> log: logout success ', success);
      })
      .catch((error) => {
        console.log('--> log: logout error ', error);
      });
  };
  return (
    <>
      <div className="dialog-off-canvas-main-canvas">
        <Header
          isAuthenticated={keycloak?.authenticated}
          onClick={handleLogOut}
          userName={keycloak.tokenParsed?.name}
        />
        <Routes>
          {ROUTES_LIST.map((page) => (
            <Route
              key={page.link}
              element={
                <RequireAuth
                  requiredRoles={[...(page.authorizedRoles ?? [])]}
                  pageLink={page.link}
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
          <Route path="/non-autorise" element={<NotAuthorizedPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
