import { TextEditor } from '@/components/common/textEditor/TextEditor';
import { MODERATOR_CONTENT } from '@/wording';

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
