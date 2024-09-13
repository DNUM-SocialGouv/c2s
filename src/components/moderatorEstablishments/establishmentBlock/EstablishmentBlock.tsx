import { Suspense, lazy, useState } from 'react';
import { Link } from '@/components/common/link/Link';
import { EtablishmentSvg } from '@/assets/EtablishmentSvg';
import { Accordion } from '@/components/common/accordion/Accordion';
import { EstablishmentInformations } from '@/components/moderatorEstablishments/establishmentInformations/EstbalishmentInformations';
import { MODERATOR_ESTABLISHMENTS } from '@/wording';
import { Establishment } from '@/domain/ModeratorEstablishments';
import { Alert } from '@/components/common/alert/Alert';
import { COMMON } from '@/wording';
import './EstablishmentBlock.css';

const AssociatedPaTable = lazy(() =>
  import(
    '@/components/moderatorEstablishments/associatedPaTable/AssociatedPaTable'
  ).then((module) => ({
    default: module.AssociatedPaTable,
  }))
);

interface EstablishmentBlockProps {
  establishment: Establishment;
  fetchEstablishments: () => void;
}

const displayGroupe = (groupe: string) => {
  if (groupe === 'ORGANISME_COMPLEMENTAIRE') {
    return COMMON.oc;
  } else if (groupe === 'CAISSE') {
    return COMMON.caisse;
  }

  return '';
};

const displayTypes = (types: string[]): string => {
  if (types.length === 0) {
    return '';
  }
  return types
    .map((type) => type.charAt(0).toUpperCase() + type.slice(1).toLowerCase())
    .join(', ');
};

const displayMembres = (membres: Establishment['membres']) => {
  if (membres?.length === 0) {
    return '';
  }

  return membres?.map((membre, index) => (
    <span className="mb-0" key={membre.id}>
      {membre.types !== null && `${displayTypes(membre.types)}:`}
      <b>
        {membre.prenom} {membre.nom}
      </b>
      {index !== membres.length - 1 && ' • '}
    </span>
  ));
};

export const EstablishmentBlock = ({
  establishment,
  fetchEstablishments,
}: EstablishmentBlockProps) => {
  const [showAssociatedPas, setShowAssociatedPas] = useState<boolean>(false);
  const [
    displayEstablishmentUpdatedSuccessMessage,
    setDisplayEstablishmentUpdatedSuccessMessage,
  ] = useState<boolean>(false);
  const [
    displayEstablishmentDeletedSuccessMessage,
    setDisplayEstablishmentDeletedSuccessMessage,
  ] = useState<boolean>(false);
  const { membres = [] } = establishment;

  const handleEstablishmentUpdate = () => {
    setDisplayEstablishmentUpdatedSuccessMessage(true);
    fetchEstablishments();
  };

  return (
    <div className="fr-container--fluid border-[1px] border-[#e5e5e5]">
      <header className="header p-6 lg:px-10 flex flex-col md:flex-row justify-start items-start md:items-center p-4">
        <div className="md:mr-6">
          <EtablishmentSvg />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col lg:max-w-[70%] gap-y-4 lg:gap-y-2">
            <h3 className="text-[24px] mb-0">{establishment.nom}</h3>
            <p className="txt-chapo mb-0">
              <span className="font-bold">
                {displayGroupe(establishment.groupe)} • {COMMON.siren}{' '}
                {establishment.locSiren}
              </span>
            </p>
            {/* <p className="mb-0">
              <Link href="#" label={MODERATOR_ESTABLISHMENTS.addContact} />
            </p> */}
            {membres.length > 0 && (
              <p className="mb-0">{displayMembres(membres)}</p>
            )}
            <p className="mb-0">
              {establishment.adresse} {establishment.codePostal}{' '}
              <span className="capitalize">
                {establishment.ville.toLowerCase()}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-y-4 lg:gap-y-2 mt-4 lg:mt-0">
            {establishment.email && (
              <div className="flex mt-3 md:mt-2">
                <span
                  className="fr-icon-mail-fill pr-3"
                  aria-hidden="true"
                ></span>
                <p className="mb-0">{establishment.email}</p>
              </div>
            )}
            {establishment.telephone && (
              <div className="flex">
                <span
                  className="fr-icon-phone-fill pr-3"
                  aria-hidden="true"
                ></span>
                <p className="mb-0">{establishment.telephone}</p>
              </div>
            )}
            {establishment.siteWeb && (
              <Link
                href={establishment.siteWeb}
                label={establishment.siteWeb}
                icon="cursor-fill"
                iconPosition="left"
              />
            )}
          </div>
        </div>
      </header>
      <Accordion
        title={MODERATOR_ESTABLISHMENTS.establishmentInformation}
        onChange={() => setDisplayEstablishmentUpdatedSuccessMessage(false)}
      >
        <EstablishmentInformations
          onEstablishmentUpdated={handleEstablishmentUpdate}
          onEstablishmentDeleted={() =>
            setDisplayEstablishmentDeletedSuccessMessage(true)
          }
          onFormReset={() =>
            setDisplayEstablishmentUpdatedSuccessMessage(false)
          }
          establishment={establishment}
        />
        {displayEstablishmentUpdatedSuccessMessage && (
          <div className="mt-6">
            <Alert
              type="success"
              label={MODERATOR_ESTABLISHMENTS.establishmentUpdated}
            />
          </div>
        )}
        {displayEstablishmentDeletedSuccessMessage && (
          <div className="mt-6">
            <Alert
              type="success"
              label={MODERATOR_ESTABLISHMENTS.establishmentDeleted}
            />
          </div>
        )}
      </Accordion>
      {establishment.pointAccueilCount > 0 && (
        <Accordion
          onActive={() => setShowAssociatedPas(true)}
          title={MODERATOR_ESTABLISHMENTS.establishmentsNumber(
            establishment.pointAccueilCount
          )}
        >
          <Suspense fallback={<div>Chargement...</div>}>
            {showAssociatedPas && (
              <AssociatedPaTable establishmentId={establishment.id} />
            )}
          </Suspense>
        </Accordion>
      )}
    </div>
  );
};
