import { Button } from '@/components/common/button/Button';
import { Ressources } from '@/components/common/svg/Ressources';
import './RessourcesHeader.css';
import { MODERATOR_RESOURCES_HEADER } from '@/wording';
import { DialogV2 } from '@/components/common/modal/DialogV2';
import { useState } from 'react';
import AddThematiqueForm from '../addThematiqueForm/AddThematiqueForm';

export const RessourcesHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <header className="header flex flex-col md:flex-row justify-start items-start md:items-center">
        <div className="md:mr-6">
          <Ressources />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col">
            <h2 className="mb-0 mt-4 ressources__header--font-size">
              {MODERATOR_RESOURCES_HEADER.title}
            </h2>
            <p className="txt-chapo mb-0">
              0 {MODERATOR_RESOURCES_HEADER.count}
            </p>
          </div>
          <div className="flex">
            <Button
              label={MODERATOR_RESOURCES_HEADER.newThematic}
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
            />
            <div className="header_btn--margin">
              <Button label={MODERATOR_RESOURCES_HEADER.newResource} disabled />
            </div>
          </div>
        </div>
      </header>
      <DialogV2
        isOpen={isModalOpen}
        onClickClose={() => setIsModalOpen(false)}
        size="lg"
        children={<AddThematiqueForm />}
      />
    </>
  );
};
