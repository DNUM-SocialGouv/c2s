import './App.css';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import { Routes, Route } from 'react-router-dom';
import { ROUTES_LIST, ROUTES_PUBLIC_LIST } from '@/utils/RoutesList.ts';
import RequireAuth from '@/layouts/RequireAuth.tsx';
import { Header } from '@/components/header/Header.tsx';
import { Footer } from '@/components/footer/Footer.tsx';
import { useKeycloak } from '@react-keycloak/web';
const App = () => {
  const logoutOptions = {};
  const { keycloak } = useKeycloak();

  const handleLogOut = () => {
    keycloak
      .logout(logoutOptions)
      .then((success: unknown) => {
        localStorage.removeItem('login');
        console.log('--> log: logout success ', success);
      })
      .catch((error: Error) => {
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
          <Route
            path="unauthorized"
            element={<div>You are not allowed to access this page</div>}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
