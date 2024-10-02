import { LoginContext } from '@/contexts/LoginContext';
import { useContext } from 'react';
import './RessourcesForm.css';
import { ThematiquesForm } from './thematiquesForm/ThematiquesForm';
import { Loader } from '@/components/common/loader/Loader';

export const RessourceForm = () => {
  const { isLogged } = useContext(LoginContext);
  return <>{!isLogged ? <Loader /> : <ThematiquesForm />}</>;
};
