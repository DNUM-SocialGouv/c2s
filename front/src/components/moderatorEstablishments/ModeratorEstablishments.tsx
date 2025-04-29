import { useContext, useRef, useState } from 'react';
import { EtablishmentSvg } from '../../assets/EtablishmentSvg.tsx';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { useModeratorEstablishmentsContext } from '../../contexts/ModeratorEstablishmentsContext.tsx';
import { MODERATOR_ESTABLISHMENTS } from '../../wording.ts';
import { Alert } from '../common/alert/Alert.tsx';
import { Button } from '../common/button/Button.tsx';
import { Loader } from '../common/loader/Loader.tsx';
import { DialogV2 } from '../common/modal/DialogV2.tsx';
import { TabHeader } from '../common/tabHeader/tabHeader.tsx';
import { AddEntrepriseForm } from './addEntrepriseForm/AddEntrepriseForm.tsx';
import { Establishments } from './establishments/Establishments.tsx';
import { Filters } from './filters/Filters.tsx';

export const ModeratorEstablishments = () => {
  return <ModeratorEstablishmentsContent />;
};

const ModeratorEstablishmentsContent = () => {
  const formRef = useRef<{ submitForm: () => void }>(null);
  const [createdEntrepriseName, setCreatedEntrepriseName] =
    useState<string>('');
  const [establishmentCreated, setEstablishmentCreated] =
    useState<boolean>(false);
  const [showAddEstablishmentForm, setShowAddEstablishmentForm] =
    useState<boolean>(false);
  // const [establishmentType, setEstablishmentType] = useState<string>('oc');
  const fetchEstablishmentsRef = useRef<{ fetchEstablishments: () => void }>(
    null
  );

  const { activeOC, pointsAccueilCount } = useModeratorEstablishmentsContext();

  const { isLogged } = useContext(LoginContext);

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const handleAddEstablishmentFormReset = () => {
    setShowAddEstablishmentForm(false);
    setEstablishmentCreated(false);
    fetchEstablishmentsRef.current?.fetchEstablishments(); // Trigger the fetch in child component
  };

  return (
    <div className="fr-container--fluid">
      {isLogged && (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <TabHeader
              icon={<EtablishmentSvg />}
              pageTitle={MODERATOR_ESTABLISHMENTS.pageTitle}
              pageDetail={MODERATOR_ESTABLISHMENTS.pageDetail(
                activeOC,
                pointsAccueilCount
              )}
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
          <Establishments ref={fetchEstablishmentsRef} />
          {establishmentCreated ? (
            <DialogV2
              arrowIcon={false}
              isOpen={showAddEstablishmentForm}
              onClickClose={() => handleAddEstablishmentFormReset()}
            >
              <Alert
                type="success"
                label={MODERATOR_ESTABLISHMENTS.establishmentCreated(
                  createdEntrepriseName
                )}
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
              <AddEntrepriseForm
                ref={formRef}
                onUpdateCreatedEntrepriseName={setCreatedEntrepriseName}
                onFormSubmit={() => setEstablishmentCreated(true)}
                // establishmentType={establishmentType}
                // updateEstablishmentType={setEstablishmentType}
              />
              {/* {establishmentType === 'oc' ? (
                <AddEntrepriseForm
                  ref={formRef}
                  onFormSubmit={() => setEstablishmentCreated(true)}
                  establishmentType={establishmentType}
                  updateEstablishmentType={setEstablishmentType}
                />
              ) : (
                <AddEstablishmentForm
                  ref={formRef}
                  onFormSubmit={() => setEstablishmentCreated(true)}
                  establishmentType={establishmentType}
                  updateEstablishmentType={setEstablishmentType}
                />
              )} */}
            </DialogV2>
          )}
        </>
      )}
      {!isLogged && (
        <div className="flex">
          <Loader />
        </div>
      )}
    </div>
  );
};
