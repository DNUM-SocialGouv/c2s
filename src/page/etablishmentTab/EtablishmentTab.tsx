import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EtablishmentSvg } from '@/assets/EtablishmentSvg';
import {
  createLPA,
  fetchDepartementData,
  fetchOcInfo,
  fetchPaginatedLPAInfo,
  fetchRegionData,
  updateLPAInfo,
  updateOcInfo,
} from '@/page/etablishmentTab/action';
import Pagination from '@/components/pagination/Pagination.tsx';
import { FormDataOC, LpaData, LpaInfo } from '@/page/etablishmentTab/Contants.ts';
import LPAFormInfo from '@/page/etablishmentTab/LPAFormInfo.tsx';
import EtablishmentForm from '@/page/etablishmentTab/EtablishmentForm.tsx';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useDeletePA } from '@/hooks/useDeletePA.tsx';

interface EtablishmentTab {
  setActionAndOpenModal: (action: () => void, message: string) => void;
}
interface RootState {
  ocInfo: {
    ocData: FormDataOC | null;
    lpaData: LpaData | null;
    departments: string[];
    regions: string[];
    loadingLPA: boolean;
    loadingOC: boolean;
    error: string | null;
  };
}

const EtablishmentTab=({ setActionAndOpenModal }: EtablishmentTab) => {
  const dispatch = useDispatch();
  const { ocData: ocDataRedux, departments: lpaDepartment, regions: lpaRegions, loadingLPA,loadingOC, lpaData } = useSelector(
    (state: RootState) => state.ocInfo
  );
  const [formDataOC, setFormDataOC] = useState<FormDataOC>({
    locSiren: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    groupe: '',
    siteWeb: '',
    ocAddedtoLPA: false,
    dateMaj: '',
    totalPAitems: 0,
  });
  const [filters, setFilters] = useState({
    searchQuery: '',
    region: '',
    department: '',
    size: 3,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = lpaData ? lpaData.totalPages : 0;
  const [selectedRegion, setSelectedRegion] = useState('');
  const [siren, setSiren] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [siteWebError, setSiteWebError] = useState<string>('');
  const [importantFieldsError, setImportantFieldsError] = useState<string>('');
  const formRef = useRef<HTMLDivElement>(null);
  const { deletePoint } = useDeletePA();
  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(fetchOcInfo(login));
    }
  }, [dispatch]);

  useEffect(() => {
    if (formDataOC.locSiren) {
      setSiren(formDataOC.locSiren);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(fetchPaginatedLPAInfo(currentPage, 3, formDataOC.locSiren, filters));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(fetchDepartementData(formDataOC.locSiren, ''));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(fetchRegionData(formDataOC.locSiren));
    }
  }, [currentPage, formDataOC.locSiren, filters, dispatch]);

  useEffect(() => {
    if (ocDataRedux) {
      setFormDataOC(ocDataRedux);
    }
  }, [ocDataRedux]);

  const handleInputChangeOC = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormDataOC((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'email') {
      if (!isValidEmail(value)) {
        setEmailError('Veuillez entrer une adresse e-mail valide.');
      } else {
        setEmailError('');
      }
    }

    if (name === 'telephone') {
      if (!isValidPhone(value)) {
        setPhoneError('Veuillez entrer un numéro de téléphone valide.');
      } else {
        setPhoneError('');
      }
    }

    if (name === 'siteWeb') {
      if (value === '') {
        setSiteWebError('Champ obligatoire');
      } else {
        setSiteWebError('');
      }
    }

    if (value === '') {
      setImportantFieldsError('Champs importants');
    } else {
      setImportantFieldsError('');
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handleSubmitOC = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError === '' && phoneError === '' && siteWebError === '') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(updateOcInfo(formDataOC));
    }
  };

  const handleSubmitLPA = (formData: LpaInfo, isEditing: boolean) => {
    if (isEditing) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(updateLPAInfo(formData));
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(createLPA(formData));
    }
  };

  const handleDeleteLpa = (id: string) => {
    // Create an inner function to execute upon user interaction
    const executeDeletion = () => {
      deletePoint({
        id: id,
        siren: formDataOC.locSiren,
        currentPage: currentPage,
        pageSize: 3,
        filters: filters
      });
    };

    setActionAndOpenModal(executeDeletion, "Vous êtes sur le point de supprimer in point d'accueil ");
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = event.target.value;
    setSelectedRegion(newRegion);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(fetchDepartementData(siren, newRegion));
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(phone);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {loadingOC ? (
        <div className="text-center mt-4 mb-4">
          <AutorenewIcon className="animate-spin" fontSize="inherit" style={{ fontSize: '3rem' }} />
        </div>
      ) : (
        <>
          <div className="header w-full flex justify-between items-center pr-44 pl-4">
            <div className="flex items-center">
              <EtablishmentSvg />
              <div className="ml-4">
                <h2 className="mb-0">Mes établissements</h2>
                <p>Mise à jour le {formDataOC.dateMaj}</p>
              </div>
            </div>
            <button className="fr-btn" onClick={scrollToForm}>
              Ajouter un point d'accueil
            </button>
          </div>
          <div className="px-16 w-full">
            <h3 className="text-xl font-semibold mb-2 ml-8">Siège de la société</h3>
            <EtablishmentForm
              formDataOC={formDataOC}
              emailError={emailError}
              phoneError={phoneError}
              siteWebError={siteWebError}
              importantFieldsError={importantFieldsError}
              handleInputChangeOC={handleInputChangeOC}
              handleSubmitOC={handleSubmitOC}
            />
            <div className=" bg-gray-900 flex-none order-2 self-stretch flex-grow-0"></div>
          </div>
          <div className="px-4 lg:px-16 w-full">
            <h3 className="text-xl font-semibold ml-2 lg:ml-8 mb-2">{lpaData?.totalElements} points d'accueil enregistrés</h3>
            <div className="max-w-4xl mx-auto p-5 space-x-4 flex items-center justify-between">
              <div className="flex flex-col pt-2">
                <label className="fr-label" htmlFor="searchQuery">Recherche</label>
                <div className="flex fr-search-bar items-center">
                  <input className="fr-input border border-gray-300 rounded-lg p-2 flex-1"
                         placeholder="Nom de l'établissement" type="search" id="searchQuery" name="searchQuery"
                         value={filters.searchQuery} onChange={handleFilterChange} />
                  <button className="fr-btn py-2 px-4"
                          title="Rechercher">
                    Rechercher
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col">
                  <label className="fr-label" htmlFor="region">Région</label>
                  <select className="fr-select p-2" id="region" name="region"
                          onChange={handleRegionChange} value={selectedRegion}>
                    <option value="" disabled hidden>Sélectionner une région</option>
                    {loadingLPA && <option disabled>Chargement...</option>}
                    <option value="">Réinitialiser le filtre</option>
                    {!loadingLPA && lpaRegions.map(item => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="fr-label" htmlFor="department">Département</label>
                  <select className="fr-select p-2" id="department" name="department"
                          value={filters.department} onChange={handleFilterChange}>
                    <option value="" disabled hidden>Sélectionner un département</option>
                    {loadingLPA && <option disabled>Chargement...</option>}
                    <option value="">Réinitialiser le filtre</option>
                    {!loadingLPA && lpaDepartment.map(item => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              {loadingLPA ? (
                <div className="text-center mt-4 mb-4">
                  <AutorenewIcon className="animate-spin" fontSize="inherit" style={{ fontSize: '3rem' }} />
                </div>
              ) :(
                lpaData && lpaData.content.length > 0 ? (
                  <>
                    {lpaData.content.map((lpaInfo, index) => (
                      <LPAFormInfo
                        key={lpaInfo.lpaId}
                        index={index}
                        initialData={lpaInfo}
                        onSubmit={handleSubmitLPA}
                        onDelete={ handleDeleteLpa}
                        isEditing={true}
                      />
                    ))}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                <div className="text-center">Aucun résultat à votre recherche.</div>
                )
              )}
            </div>

          </div>
          <div className="px-16 w-full" ref={formRef}>
            <h3 className="text-xl font-semibold ml-8 mb-2">Ajouter un nouveau point d'accueil</h3>
            <div>
              <LPAFormInfo onSubmit={(formData) => handleSubmitLPA(formData, false)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EtablishmentTab;
