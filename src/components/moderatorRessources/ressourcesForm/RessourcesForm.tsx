import './RessourcesForm.css';
import { ThematiquesForm } from '../thematiquesForm/ThematiquesForm';
import { Filters } from '../filters/Filters';

export const RessourceForm = () => {
  return (
    <>
      <Filters thematiquesList={[]} />
      <ThematiquesForm />
    </>
  );
};
