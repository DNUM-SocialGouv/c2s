import { useSelector } from 'react-redux';
import LeftSideBar from '../../components/leftSideBar/LeftSideBar.tsx';
import { FormComponent } from './FormComponent.tsx';
import ValidationPage from './ValidationPage.tsx';

export interface iFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  societe: string;
  groupe: string;
  siren: string;
  fonction: string;
  companyName?: string;
}
const InscriptionPartnerPage = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { error, isSubscribe } = useSelector((state) => state.inscription);

  return (
    <>
      {error && (
        <div className="fr-alert fr-alert--error fr-alert--sm bg-white">
          <p>Erreur : Veuillez réssayer ultérieurement</p>
        </div>
      )}
      <div className="flex flex-col md:flex-row bg-white">
        <LeftSideBar />
        {isSubscribe ? <ValidationPage /> : <FormComponent />}
      </div>
    </>
  );
};

export default InscriptionPartnerPage;
