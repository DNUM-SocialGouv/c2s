import { Link } from '@/components/common/link/Link';
import { EtablishmentSvg } from '@/assets/EtablishmentSvg';
import { Accordion } from '@/components/common/accordion/Accordion';
// import { UserInformations } from '@/components/moderatorUsers/userInformations/UserInformations';
import { EstablishmentInformations } from '@/components/moderatorEstablishments/establishmentInformations/EstbalishmentInformations';
import { EstablishmentTable } from '@/components/moderatorEstablishments/establishmentTable/EstablishmentTable';
import { MODERATOR_ESTABLISHMENTS } from '@/wording';
import { Establishment } from '@/domain/ModeratorEstablishments';
import './EstablishmentBlock.css';

interface EstablishmentBlockProps {
  establishment: Establishment;
}

export const EstablishmentBlock = ({
  establishment,
}: EstablishmentBlockProps) => {
  return (
    <div className="fr-container--fluid border-[1px] border-[#e5e5e5]">
      <header className="header p-6 lg:px-10 flex flex-col md:flex-row justify-start items-start md:items-center p-4">
        <div className="md:mr-6">
          <EtablishmentSvg />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col lg:max-w-[80%] gap-y-4 lg:gap-y-2">
            <h3 className="text-[24px] mb-0">MGEN</h3>
            <p className="txt-chapo mb-0">
              <span className="font-bold">
                "Organisme complémentaire" • "SIREN 123 456 789"
              </span>
            </p>
            <p className="mb-0">
              <Link href="#" label={MODERATOR_ESTABLISHMENTS.addContact} />
            </p>
            <p className="mb-0">
              Gestion <Link href="#" label="Caroline Solaar" /> • Statistiques{' '}
              <Link href="#" label="Lionel Dupont" /> • Déclaration{' '}
              <Link href="#" label="Karine Dupuis" />
            </p>
            <p className="mb-0">17 rue de l’Avenue 75007 Paris</p>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-y-4 lg:gap-y-2     mt-4 lg:mt-0">
            <div className="flex mt-3 md:mt-2">
              <span
                className="fr-icon-mail-fill pr-3"
                aria-hidden="true"
              ></span>
              <p className="mb-0">contact@mapetiteentreprise.fr</p>
            </div>
            <div className="flex">
              <span
                className="fr-icon-phone-fill pr-3"
                aria-hidden="true"
              ></span>
              <p className="mb-0">01 02 03 04 05</p>
            </div>
            <Link
              href="www.internet.com"
              label="mon site internet"
              icon="cursor-fill"
              iconPosition="left"
            />
          </div>
        </div>
      </header>
      <Accordion title={MODERATOR_ESTABLISHMENTS.establishmentInformation}>
        <EstablishmentInformations establishment={establishment} />
      </Accordion>
      <Accordion title={MODERATOR_ESTABLISHMENTS.establishmentsNumber(244)}>
        <EstablishmentTable />
      </Accordion>
    </div>
  );
};
