import { useId, useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { EtablishmentSvg } from '@/assets/EtablishmentSvg';
import { Accordion } from '@/components/common/accordion/Accordion';
import './EstablishmentBlock.css';

interface UserBlockProps {
  title: string;
}

export const EstablishmentBlock = ({ title }: UserBlockProps) => {
  return (
    <div className="fr-container--fluid border-[1px] border-[#e5e5e5]">
      <header className="header p-6 lg:px-10 flex flex-col md:flex-row justify-start items-start md:items-center p-4">
        <div className="md:mr-6">
          <EtablishmentSvg />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-full">
          <div className="flex flex-col lg:max-w-[80%]">
            <h3 className="text-[24px] mb-0 mt-4">MGEN</h3>
            <p className="txt-chapo mb-0 mt-2">
              <span className="font-bold">
                Organisme complémentaire • SIREN 123 456 789Ajouter un contact
              </span>
              <span className="font-bold">societe</span>
            </p>
            <div className="flex gap-x-6 flex-col lg:flex-row">
              <div className="flex mt-3 md:mt-2">
                <span
                  className="fr-icon-mail-fill pr-3"
                  aria-hidden="true"
                ></span>
                <p className="mb-0">email</p>
              </div>
              {true && (
                <div className="flex mt-3 md:mt-2">
                  <span
                    className="fr-icon-phone-fill pr-3"
                    aria-hidden="true"
                  ></span>
                  <p>user.telephone</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-center gap-y-4 mt-4 lg:mt-0">
            test
          </div>
        </div>
      </header>
      <Accordion title="accordionTitle">test</Accordion>
    </div>
  );
};
