import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App.tsx';
import KeycloakInitializer from '@/keycloak/KeycloakInitializer.tsx';
import { AccountProvider } from '@/contexts/AccountContext.tsx';
import { EstablishmentProvider } from '@/contexts/EstablishmentContext.tsx';
import { OcActiveTabProvider } from './contexts/OcActiveTabContext.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    //<React.StrictMode>
    <Provider store={store}>
      <KeycloakInitializer>
        <Router basename="/mon-espace">
          <EstablishmentProvider>
            <AccountProvider>
              <OcActiveTabProvider>
                <App />
              </OcActiveTabProvider>
            </AccountProvider>
          </EstablishmentProvider>
        </Router>
      </KeycloakInitializer>
    </Provider>
    //</React.StrictMode>
  );
} else {
  console.error('The element with the ID "root" was not found.');
}
