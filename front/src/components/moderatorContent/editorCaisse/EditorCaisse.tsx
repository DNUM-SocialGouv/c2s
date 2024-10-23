import { TextEditor } from '../../common/textEditor/TextEditor.tsx';
import { MODERATOR_CONTENT } from '../../../wording.ts';

export const EditorCaisse = () => {
  return (
    <>
      <header>
        <h3 className="oc__header--font-size mb-2">
          {MODERATOR_CONTENT.caisseHeader}
        </h3>
        <p>{MODERATOR_CONTENT.caisseHeaderDetail}</p>
      </header>
      <TextEditor groupe={'CAISSE'} />
    </>
  );
};
