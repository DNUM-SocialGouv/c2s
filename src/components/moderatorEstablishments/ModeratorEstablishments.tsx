import { useEffect, useState } from 'react';
import { TabHeader } from '../common/tabHeader/tabHeader';
import { AddEstablishmentForm } from './addEstablishmentForm/AddEstablishmentForm';
import { EtablishmentSvg } from '@/assets/EtablishmentSvg';
import { MODERATOR_ESTABLISHMENTS } from '@/wording';
import { UserProvider } from '@/contexts/UserContext';
import { useKeycloak } from '@react-keycloak/web';
import { axiosInstance } from '@/RequestInterceptor';

const apiEndpoint = '/moderateur/membres/home';

interface UserApiResponse {
  membreCount: number;
}

export const ModeratorEstablishments = () => {
  return (
    <UserProvider>
      <ModeratorEstablishmentsContent />
    </UserProvider>
  );
};
const ModeratorEstablishmentsContent = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [showAddEstablishmentForm, setShowAddEstablishmentForm] =
    useState<boolean>(false);

  const { keycloak } = useKeycloak();

  useEffect(() => {
    axiosInstance
      .get<UserApiResponse | null>(apiEndpoint, { withCredentials: true })
      .then((response) => {
        console.log('response', response);
      });
  }, []);

  useEffect(() => {
    const sendMyToken = (token: string) => {
      let result: boolean | null;

      fetch('/api/public/login', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        credentials: 'include',
        body: token,
      })
        .then(() => {
          result = true;
          setIsLogged(true);
        })
        .catch(() => {
          result = false;
        })
        .finally(() => {
          return result;
        });
      return '';
    };
    sendMyToken(keycloak.token!);
  }, [keycloak.token]);

  useEffect(() => {
    if (keycloak.authenticated) {
      setIsLogged(true);
    }
  }, [keycloak.authenticated]);

  return (
    <div className="fr-container--fluid">
      {isLogged && (
        <>
          <div className="flex items-center justify-between">
            <TabHeader
              icon={<EtablishmentSvg />}
              pageTitle={MODERATOR_ESTABLISHMENTS.pageTitle}
              pageDetail={MODERATOR_ESTABLISHMENTS.pageDetail(82, 432)}
            />
            <button
              onClick={() =>
                setShowAddEstablishmentForm(!showAddEstablishmentForm)
              }
            >
              bouton
            </button>
          </div>
          {showAddEstablishmentForm && <AddEstablishmentForm />}
        </>
      )}
    </div>
  );
};
