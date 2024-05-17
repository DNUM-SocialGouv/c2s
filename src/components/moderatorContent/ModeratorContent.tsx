import { Separator } from '../common/svg/Seperator';
import { EditorCaisse } from './editorCaisse/EditorCaisse';
import { EditorOc } from './editorOc/EditorOc';
import { ModeratorContentHeader } from './moderatorContentHeader/ModeratorContentHeader';

export const ModeratorContent = () => {
  return (
    <div className="fr-container--fluid">
      <ModeratorContentHeader />
      <Separator />
      <EditorCaisse />
      <Separator className="my-[32px] md:my-[55px] " />
      <EditorOc />
    </div>
  );
};
