import { Button } from '@/components/common/button/Button';
import { Ressources } from '@/components/common/svg/Ressources';
import './RessourcesHeader.css';
import { MODERATOR_RESOURCES_HEADER } from '@/wording';

export const RessourcesHeader = () => {
  return (
    <header className="header flex flex-col md:flex-row justify-start items-start md:items-center">
      <div className="md:mr-6">
        <Ressources />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
        <div className="flex flex-col">
          <h2 className="mb-0 mt-4 ressources__header--font-size">
            {MODERATOR_RESOURCES_HEADER.title}
          </h2>
          <p className="txt-chapo mb-0">0 {MODERATOR_RESOURCES_HEADER.count}</p>
        </div>
        <div className="flex">
          <Button
            label={MODERATOR_RESOURCES_HEADER.newThematic}
            variant="secondary"
          />
          <div className="header_btn--margin">
            <Button label={MODERATOR_RESOURCES_HEADER.newResource} />
          </div>
        </div>
      </div>
    </header>
  );
};