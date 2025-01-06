import { useContext, useEffect, useRef, useState } from 'react';
import { EtablissementTabHeader } from './etablissementTabHeader/EtablissementTabHeader.tsx';
import { LPAForm } from './LPAForm/LPAForm';
import { SiegeForm } from './siegeForm/SiegeForm.tsx';
import { axiosInstance } from '../../RequestInterceptor';
import { EstablishmentFilters } from './establishmentFilters/EstablishmentFilters.tsx';
import { FormDataOC } from '../../domain/OcEstablishments.ts';
import { OcList } from './osList/OcList.tsx';
import { OcEstablishmentContext } from '../../contexts/OcEstablishmentContext.tsx';
import { OC_MES_ETABLISSEMENTS } from '../../wording.ts';

const ocInfoEndpoint = (email: string) =>
  `/oc?email=${encodeURIComponent(email)}`;

export const OcEstablishments = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [ocInfo, setOcInfo] = useState<FormDataOC | null>(null);

  const { setSiren } = useContext(OcEstablishmentContext) || {};

  const fetchOcInfo = async (email: string) => {
    try {
      const response = await axiosInstance.get<FormDataOC>(
        ocInfoEndpoint(email)
      );
      setOcInfo(response.data);
      setSiren?.(response.data.locSiren);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('email');

    if (!email) {
      console.error('No email found in localStorage');
      return;
    }
    fetchOcInfo(email);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!ocInfo?.locSiren) {
    return <div className="block min-h-screen">Chargement...</div>;
  }

  return (
    <div className="fr-container--fluid">
      <div className="header w-full flex justify-between items-center pr-44 pl-4">
        <EtablissementTabHeader updateDate={ocInfo?.dateMaj ?? ''} />
        <button className="fr-btn" onClick={scrollToForm}>
          {OC_MES_ETABLISSEMENTS.addPointAcceuil}
        </button>
      </div>
      <div className="px-16 ">
        <h3 className="text-xl font-semibold mb-2 mt-4">
          {OC_MES_ETABLISSEMENTS.siegeDeLaSociete}
        </h3>
        {ocInfo && <SiegeForm ocInfos={ocInfo} />}
        <EstablishmentFilters />
        <OcList />
        <div className="w-full" ref={formRef}>
          <h3 className="text-xl font-semibold mb-2 mt-4">
            {OC_MES_ETABLISSEMENTS.addNewPointAcceuil}
          </h3>
          <LPAForm action="add" />
        </div>
      </div>
    </div>
  );
};
