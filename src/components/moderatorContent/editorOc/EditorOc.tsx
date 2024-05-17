import { TextEditor } from '@/components/common/textEditor/TextEditor';

export const EditorOc = () => {
  return (
    <>
      <header>
        <h3 className="oc__header--font-size mb-2">
          Bloc éditorial - Organismes complémentaires
        </h3>
        <p>Le mot de l'équipe C2S</p>
      </header>
      <TextEditor cible={'OC'} />
    </>
  );
};
