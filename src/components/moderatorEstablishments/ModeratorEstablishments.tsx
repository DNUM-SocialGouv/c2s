import { useEffect, useState, lazy, Suspense } from 'react';
import { TabHeader } from '../common/tabHeader/tabHeader';
import { Button } from '@/components/common/button/Button';
import { Establishments } from '@/components/moderatorEstablishments/establishments/Establishments';
import { Filters } from '@/components/moderatorEstablishments/filters/Filters';
import { EtablishmentSvg } from '@/assets/EtablishmentSvg';
import { MODERATOR_ESTABLISHMENTS } from '@/wording';
import { useKeycloak } from '@react-keycloak/web';
import { ModeratorEstablishmentsProvider } from '@/contexts/ModeratorEstablishmentsContext';

const AddEstablishmentForm = lazy(() =>
  import('./addEstablishmentForm/AddEstablishmentForm').then((module) => ({
    default: module.AddEstablishmentForm,
  }))
);

const regionsListMock = [
  "Provence-Alpes-Côte d'Azur",
  'Île-de-France',
  'Nouvelle-Aquitaine',
  'Centre-Val de Loire',
  'Bourgogne-Franche-Comté',
  'La Réunion',
  'Auvergne-Rhône-Alpes',
];
const departementsListMock = [
  'Ille-et-Vilaine',
  'Ain',
  'Hérault',
  'Haute-Savoie',
  'Seine-et-Marne',
  'Yvelines',
  'Seine-Saint-Denis',
];

export const ModeratorEstablishments = () => {
  return (
    <ModeratorEstablishmentsProvider>
      <ModeratorEstablishmentsContent />
    </ModeratorEstablishmentsProvider>
  );
};
const ModeratorEstablishmentsContent = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [showAddEstablishmentForm, setShowAddEstablishmentForm] =
    useState<boolean>(false);

  const { keycloak } = useKeycloak();

  useEffect(() => {
    console.log('render');
  });

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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <TabHeader
              icon={<EtablishmentSvg />}
              pageTitle={MODERATOR_ESTABLISHMENTS.pageTitle}
              pageDetail={MODERATOR_ESTABLISHMENTS.pageDetail(82, 432)}
            />
            <Button
              className="fr-btn--transform-none"
              variant="primary"
              label={MODERATOR_ESTABLISHMENTS.newEstablishmentLabel}
              onClick={() =>
                setShowAddEstablishmentForm(!showAddEstablishmentForm)
              }
            />
          </div>
          <Filters
            regionsList={regionsListMock}
            departementsList={departementsListMock}
          />
          <Establishments />
          {showAddEstablishmentForm && (
            //todo: loader ?
            <Suspense fallback={<div>Chargement...</div>}>
              <AddEstablishmentForm />
            </Suspense>
          )}
        </>
      )}
    </div>
  );
};
