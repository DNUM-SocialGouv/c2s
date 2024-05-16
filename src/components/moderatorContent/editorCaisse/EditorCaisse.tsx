import { TextEditor } from '@/components/common/textEditor/TextEditor';

export const EditorCaisse = () => {
  return (
    <>
      <header>
        <h3 className="oc__header--font-size mb-2">
          Bloc éditorial - Organismes complémentaires
        </h3>
        <p>Contenu affiché sur la page d’accueil après la connexion</p>
      </header>
      <TextEditor cible={'CAISSE'} />
    </>
  );
};
