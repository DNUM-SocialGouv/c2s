import { TextEditor } from '../../common/textEditor/TextEditor.tsx';
import { MODERATOR_CONTENT } from '../../../wording.ts';

export const EditorOc = () => {
  return (
    <>
      <header>
        <h3 className="oc__header--font-size mb-2">
          {MODERATOR_CONTENT.ocHeader}
        </h3>
        <p>{MODERATOR_CONTENT.ocHeaderDetail}</p>
      </header>
      <TextEditor groupe={'ORGANISME_COMPLEMENTAIRE'} />
    </>
  );
};
