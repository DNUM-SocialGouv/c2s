import { TextEditor } from '@/components/common/textEditor/TextEditor';
import { MODERATOR_CONTENT } from '@/wording';

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
