import { useEffect, useState, useRef } from 'react';
import { TabHeader } from '../common/tabHeader/tabHeader';
import { Button } from '@/components/common/button/Button';
import { Establishments } from '@/components/moderatorEstablishments/establishments/Establishments';
import { Filters } from '@/components/moderatorEstablishments/filters/Filters';
import { EtablishmentSvg } from '@/assets/EtablishmentSvg';
import { DialogV2 } from '@/components/common/modal/DialogV2';
import { AddEstablishmentForm } from '@/components/moderatorEstablishments/addEstablishmentForm/AddEstablishmentForm';
import { MODERATOR_ESTABLISHMENTS } from '@/wording';
import { useKeycloak } from '@react-keycloak/web';
import { ModeratorEstablishmentsProvider } from '@/contexts/ModeratorEstablishmentsContext';
import { Alert } from '@/components/common/alert/Alert';

export const ModeratorEstablishments = () => {
  return (
    <ModeratorEstablishmentsProvider>
      <ModeratorEstablishmentsContent />
    </ModeratorEstablishmentsProvider>
  );
};
const ModeratorEstablishmentsContent = () => {
  const formRef = useRef<{ submitForm: () => void }>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [establishmentCreated, setEstablishmentCreated] =
    useState<boolean>(false);
  const [showAddEstablishmentForm, setShowAddEstablishmentForm] =
    useState<boolean>(false);

  const { keycloak } = useKeycloak();

  useEffect(() => {
    console.log('render PARENT');
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

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const handleAddEstablishmentFormReset = () => {
    setShowAddEstablishmentForm(false);
    setEstablishmentCreated(false);
  };

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
          <Filters />
          <Establishments />
          {establishmentCreated ? (
            <DialogV2
              arrowIcon={false}
              isOpen={showAddEstablishmentForm}
              onClickClose={() => handleAddEstablishmentFormReset()}
            >
              <Alert
                type="success"
                label={MODERATOR_ESTABLISHMENTS.establishmentCreated}
              />
            </DialogV2>
          ) : (
            <DialogV2
              titre={MODERATOR_ESTABLISHMENTS.addNewEstablishment}
              arrowIcon={false}
              isOpen={showAddEstablishmentForm}
              size="lg"
              onClickCancel={() => handleAddEstablishmentFormReset()}
              onClickConfirm={() => handleFormSubmit()}
              onClickClose={() => handleAddEstablishmentFormReset()}
            >
              <AddEstablishmentForm
                ref={formRef}
                onFormSubmit={() => setEstablishmentCreated(true)}
              />
            </DialogV2>
          )}
        </>
      )}
    </div>
  );
};
