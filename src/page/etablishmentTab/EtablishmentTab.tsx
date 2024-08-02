import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLPA,
  fetchOcInfo,
  fetchPaginatedLPAInfo,
  updateLPAInfo,
  updateOcInfo,
} from '@/page/etablishmentTab/action';
import Pagination from '@/components/pagination/Pagination.tsx';
import {
  FormDataOC,
  LpaData,
  PointAcceuilInfo,
} from '@/page/etablishmentTab/Contants.ts';
import { LPAForm } from '@/page/etablishmentTab/formulairePointAccueil/LPAForm';
import { SiegeForm } from '@/page/etablishmentTab/formulaireSiege/SiegeForm';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useDeletePA } from '@/hooks/useDeletePA.tsx';
import { ErrorMessage } from '@/components/common/error/Error';
import { COMMON, OC_MES_ETABLISSEMENTS } from '@/wording';
import { EtablissementTabHeader } from './etablissementTabHeader/EtablissementTabHeader';
import { isEmailValid, isPhoneValid } from '@/utils/LPAForm.helper';

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

export const EtablishmentTab = ({ setActionAndOpenModal }: EtablishmentTab) => {
  const dispatch = useDispatch();

  const {
    ocData: ocDataRedux,
    loadingLPA,
    loadingOC,
    lpaData,
    error,
  } = useSelector((state: RootState) => state.ocInfo);

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

  const [filters] = useState({
    searchQuery: '',
    region: '',
    department: '',
    size: 3,
  });

  const numberOfItemPerPage = 10;

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = lpaData ? lpaData.totalPages : 0;
  const [siren, setSiren] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [siteWebError, setSiteWebError] = useState<string>('');
  const [importantFieldsError, setImportantFieldsError] = useState<string>('');

  const [totalPointsAcceuil, setTotalPointsAcceuil] = useState<number>(
    lpaData?.totalElements || 0
  );

  const formRef = useRef<HTMLDivElement>(null);

  const { deletePoint } = useDeletePA();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      dispatch(fetchOcInfo(email));
      if (ocDataRedux?.locSiren) {
        setSiren(ocDataRedux?.locSiren);
      }
    }
  }, [dispatch, ocDataRedux?.locSiren]);

  useEffect(() => {
    if (formDataOC.locSiren) {
      setSiren(formDataOC.locSiren);
      dispatch(
        fetchPaginatedLPAInfo(
          currentPage,
          numberOfItemPerPage,
          formDataOC.locSiren,
          filters
        )
      );
      // FIXME: quick fix, à remplacer
      const totalPA = localStorage.getItem('totalElementForOC');
      if (totalPA) {
        setTotalPointsAcceuil(Number(totalPA));
      }
    }
  }, [
    currentPage,
    formDataOC.locSiren,
    lpaData?.totalElements,
    filters,
    dispatch,
  ]);

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
      if (!isEmailValid(value)) {
        setEmailError('Veuillez entrer une adresse e-mail valide.');
      } else {
        setEmailError('');
      }
    }

    if (name === 'telephone') {
      if (!isPhoneValid(value)) {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handleSubmitOC = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError === '' && phoneError === '' && siteWebError === '') {
      dispatch(updateOcInfo(formDataOC, currentPage, 3, filters));
    }
  };

  const handleSubmitLPA = (formData: PointAcceuilInfo, isEditing: boolean) => {
    if (isEditing) {
      dispatch(updateLPAInfo(formData));
    } else {
      dispatch(createLPA(formData));
      // FIXME: quick fix à modifier
      setTimeout(() => {
        dispatch(
          fetchPaginatedLPAInfo(
            currentPage,
            numberOfItemPerPage,
            siren,
            filters
          )
        );
      }, 6000);

      // FIXME: quick fix, à modifier
      setTotalPointsAcceuil((prev) => prev + 1);
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
        filters: filters,
      });
    };
    // FIXME: quick fix, à modifier
    setTotalPointsAcceuil(totalPointsAcceuil - 1);
    localStorage.setItem('totalElementForOC', String(totalPointsAcceuil - 1));

    setActionAndOpenModal(
      executeDeletion,
      "Vous êtes sur le point de supprimer un point d'accueil "
    );
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {error && <ErrorMessage message={COMMON.errorMessage} />}
      {loadingOC ? (
        <div className="text-center mt-4 mb-4">
          <AutorenewIcon
            className="animate-spin"
            fontSize="inherit"
            style={{ fontSize: '3rem' }}
          />
        </div>
      ) : (
        <>
          <div className="header w-full flex justify-between items-center pr-44 pl-4">
            <EtablissementTabHeader updateDate={formDataOC.dateMaj} />

            <button className="fr-btn" onClick={scrollToForm}>
              {OC_MES_ETABLISSEMENTS.addPointAcceuil}
            </button>
          </div>
          <div className="px-16 w-full">
            <h3 className="text-xl font-semibold mb-2 ml-8">
              {OC_MES_ETABLISSEMENTS.siegeDeLaSociete}
            </h3>
            <SiegeForm
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
            <h3 className="text-xl font-semibold ml-2 lg:ml-8 mb-2">
              {/* TODO: uiliser un composant mutualisé pour gérer le singulier/pluriel*/}
              {totalPointsAcceuil} point(s) d'accueil enregistré(s)
            </h3>
            <div className="max-w-4xl mx-auto p-5 space-x-4 flex items-center justify-between"></div>
            <div>
              {loadingLPA ? (
                <div className="text-center mt-4 mb-4">
                  <AutorenewIcon
                    className="animate-spin"
                    fontSize="inherit"
                    style={{ fontSize: '3rem' }}
                  />
                </div>
              ) : lpaData && lpaData.content.length > 0 ? (
                <>
                  {lpaData.content.map((lpaInfo, index) => (
                    <LPAForm
                      key={lpaInfo.id}
                      index={index}
                      initialData={lpaInfo}
                      onSubmit={handleSubmitLPA}
                      onDelete={handleDeleteLpa}
                      isEditing={true}
                      currentPage={currentPage}
                      pageSize={numberOfItemPerPage}
                    />
                  ))}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center">
                  Aucun résultat à votre recherche.
                </div>
              )}
            </div>
          </div>
          <div className="px-16 w-full" ref={formRef}>
            <h3 className="text-xl font-semibold ml-8 mb-2">
              Ajouter un nouveau point d'accueil
            </h3>
            <div>
              <LPAForm
                onSubmit={(formData) => handleSubmitLPA(formData, false)}
                pageSize={numberOfItemPerPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
