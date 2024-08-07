import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SubmitButton from '@/components/common/submitButton/SubmitButton.tsx';
import { Honeypot } from '@/components/common/honeypot/Honeypot.tsx';
import { useHoneypot } from '@/hooks/useHoneypot';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import {
  submitFormData,
  fetchCompanyInfoFromSiren,
  selectCompanyName,
  resetErrorFromBackendField,
} from './action.js';
import { axiosInstance } from '@/RequestInterceptor';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { RadioGroupWithYup } from '@/components/common/radioGroup/RadioGroupWithYup';
import { DialogV2 } from '@/components/common/modal/DialogV2.tsx';
import { Link } from '@/components/common/link/Link.tsx';
import { TermsAndConditionsContent } from './TermsAndConditionsContent.tsx';

// TODO: dans le domain
export interface InscriptionErrorResponseData {
  [key: string]: string | undefined;
}
// TODO: dans le domain
export interface InscriptionErrorResponse {
  response: {
    data: InscriptionErrorResponseData;
    status: number;
  };
}
// TODO: dans le domain
export interface iFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  societe: string;
  groupe: string;
  siren: string;
  fonction: string;
  cguAgreement?: boolean;
  formId?: string;
  companyName?: string;
}

interface RootState {
  inscription: {
    companyInfo: string | null;
    isLoading: boolean;
    isClicked: boolean;
    isLoadingSubmit: boolean;
    error: string | InscriptionErrorResponseData | null;
    errorsFromBackend: InscriptionErrorResponseData;
  };
}

const defaultValues: iFormData = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  societe: '',
  groupe: 'ORGANISME_COMPLEMENTAIRE',
  siren: '',
  fonction: '',
  cguAgreement: false,
  companyName: '',
};
// TODO: mutualiser les regex
const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
// TODO: sortir le schema de validation
const schema = yup.object().shape({
  nom: yup
    .string()
    .required('*Le nom est requis')
    .min(2, '*Le champs doit contenir 2 caractères'),
  prenom: yup
    .string()
    .required('*Le prénom est requis')
    .min(2, '*Le champs doit contenir 2 caractères au minimum')
    .max(25, '*Le champs doit contenir 25 caractères au maximum'),
  email: yup
    .string()
    .email('Veuillez entrer un email valide')
    .required("*L'email est requis")
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  telephone: yup
    .string()
    .required('*Le numéro de telephone et requis')
    .matches(
      frenchPhoneRegExp,
      '*Le numéro de téléphone doit être un numéro français'
    ),
  societe: yup.string().required("*L'organisme est requis"),
  groupe: yup.string().required('*Le groupe est requis'),
  siren: yup.string().when('groupe', {
    is: 'ORGANISME_COMPLEMENTAIRE',
    then: (schema) =>
      schema
        .required('*Le numéro siren est requis')
        .length(9, 'Le numéro SIREN doit contenir 9 caractères'),
    otherwise: (schema) => schema.notRequired(),
  }),
  fonction: yup
    .string()
    .required('*La fonction est requise')
    .max(25, '*Le champs doit contenir 25 caractères au maximum'),
  cguAgreement: yup
    .boolean()
    .oneOf([true], "Veuillez accepter les conditions générales d'utilisation"),
  companyName: yup.string(),
});

//check for any SIREN related error sent by the backend
const checkForSirenSearchError = (
  error: string | InscriptionErrorResponseData | null
) => {
  if (error && typeof error === 'string') {
    if (error.includes('Aucun élément trouvé pour le siren')) {
      return true;
    }
  } else if (error && typeof error === 'object') {
    if (error['siren']) {
      return true;
    }
  }
  return false;
};

const displayErrorsFromBackend = (
  key: keyof InscriptionErrorResponseData,
  errors: InscriptionErrorResponseData
) => {
  return (
    errors[key] && (
      <p className="error-message pt-2" style={{ color: 'red' }}>
        {errors[key]}
      </p>
    )
  );
};

const displayError = (error: string | InscriptionErrorResponseData | null) => {
  if (!error) return null;

  if (typeof error === 'string') {
    return (
      <p className="error-message pt-2" style={{ color: 'red' }}>
        {error}
      </p>
    );
  }

  if (typeof error === 'object' && error !== null) {
    return Object.keys(error).map((field) => (
      <p key={field} className="error-message pt-2" style={{ color: 'red' }}>
        {error[field]}
      </p>
    ));
  }

  return null;
};

export const FormComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { honeypotValue, handleHoneypotChange } = useHoneypot('honeypot');

  const firstInteractionDetected = useRef(false);
  const formId = useRef('');

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = methods;

  const [showCgu, setShowCgu] = useState(false);

  const onSubmit = (data: iFormData) => {
    if (honeypotValue) {
      //reload page if bot is detected
      console.error('bot detected');
      navigate(0);
      return;
    }

    data.formId = formId.current;

    data.siren = groupeValue === 'ORGANISME_COMPLEMENTAIRE' ? data.siren : '';

    const { companyName, ...formData } = data;

    if (companyName) {
      delete data.companyName;
    }

    if (error) {
      return;
    }

    dispatch(submitFormData(formData));
  };

  //detects first interaction with the form
  useEffect(() => {
    if (isDirty && !firstInteractionDetected.current) {
      formId.current = uuidv4();
      firstInteractionDetected.current = true;

      axiosInstance.get('/public/tm', {
        params: {
          formId: formId.current,
        },
      });
    }
  }, [isDirty]);

  const {
    companyInfo,
    isLoading,
    isClicked,
    isLoadingSubmit,
    error,
    errorsFromBackend,
  } = useSelector((state: RootState) => state.inscription);

  const sirenValue = watch('siren');
  const groupeValue = watch('groupe');

  useEffect(() => {
    if (sirenValue && sirenValue.length === 9) {
      dispatch(fetchCompanyInfoFromSiren(sirenValue));
    }
  }, [sirenValue, dispatch, errors]);

  useEffect(() => {
    if (companyInfo && !companyInfo.includes('Aucun élément')) {
      dispatch(selectCompanyName('isClicked', ''));
    }
  }, [companyInfo, dispatch]);

  const handleClick = () => {
    setValue('groupe', 'ORGANISME_COMPLEMENTAIRE');
    if (companyInfo && !companyInfo.includes('Aucun élément')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(selectCompanyName('isClicked', true));

      if (checkForSirenSearchError(error)) {
        setValue('companyName', companyInfo);
        setValue('societe', '');
        trigger('societe');
        return;
      } else {
        setValue('companyName', companyInfo);
        setValue('societe', companyInfo);
        trigger('societe');
        return;
      }
    }

    setValue('societe', '');
    trigger('societe');
    return;
  };

  //reset the "societe" field when changing the SIREN value
  const handleKeyDownSiren = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    if (
      (key.length === 1 && key.match(/[a-zA-Z0-9]/)) || // letters and numbers
      key === ' ' || // space
      key === 'Backspace' // backspace
    ) {
      setValue('societe', '');
    }
  };

  const handleResetErrorFromBackendField = (field: string) => () => {
    dispatch(resetErrorFromBackendField(field));
  };

  return (
    <div className="flex flex-col lg:gap-2 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="fr-h2 text-left mb-4">
          S'inscrire à l'espace Partenaire C2S
        </h2>
        <div className="fr-alert fr-alert--info">
          <p>
            Espace réservé aux professionnels exerçant dans un organisme
            complémentaire ou une caisse d'assurance maladie
          </p>
        </div>
        <p className="mt-4">
          L'ensemble des champs du formulaire ci-dessous sont obligatoires.
        </p>
        <FormProvider {...methods}>
          {/* @ts-expect-error: check the use of companyName */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Honeypot
              honeypotName="honeypot"
              onHoneypotChange={handleHoneypotChange}
            />
            <FormInputWithYup
              onKeyPress={handleResetErrorFromBackendField('nom')}
              label="Nom"
              name="nom"
            />
            {displayErrorsFromBackend('nom', errorsFromBackend)}
            <FormInputWithYup
              onKeyPress={handleResetErrorFromBackendField('prenom')}
              label="Prénom"
              name="prenom"
            />
            {displayErrorsFromBackend('prenom', errorsFromBackend)}
            <FormInputWithYup
              onKeyPress={handleResetErrorFromBackendField('email')}
              inputType={'email'}
              label="E-mail"
              name="email"
            />
            {displayErrorsFromBackend('email', errorsFromBackend)}
            <FormInputWithYup
              onKeyPress={handleResetErrorFromBackendField('telephone')}
              label="Téléphone"
              name="telephone"
            />
            {displayErrorsFromBackend('telephone', errorsFromBackend)}

            <RadioGroupWithYup
              name="groupe"
              options={[
                {
                  value: 'ORGANISME_COMPLEMENTAIRE',
                  label: 'Organisme complémentaire',
                  checked: true,
                },
                {
                  value: 'CAISSE',
                  label: "Caisse d'assurance maladie",
                  disabled: true,
                },
              ]}
            />
            {groupeValue === 'ORGANISME_COMPLEMENTAIRE' && (
              <div className="form-group">
                <label className="fr-label" htmlFor="siren">
                  Siren
                  <span className="fr-hint-text">9 chiffres</span>
                </label>
                <div className="mt-1">
                  <input
                    className="fr-input"
                    type="text"
                    id="siren"
                    data-test-id="siren"
                    {...register('siren')}
                    onKeyDown={handleKeyDownSiren}
                  />
                  <p className="error-message pt-2">{errors.siren?.message}</p>
                  {displayErrorsFromBackend('siren', errorsFromBackend)}
                  {displayErrorsFromBackend('entreprise', errorsFromBackend)}
                </div>
                {sirenValue &&
                  sirenValue.length === 9 &&
                  (isLoading ? (
                    <span className="flex px-4 py-2 border border-b-gray-500 text-base leading-15 font-medium rounded-md text-gray-700 bg-white">
                      <LoopIcon
                        className="animate-spin"
                        style={{ fontSize: '24px' }}
                      />
                    </span>
                  ) : (
                    <label
                      onClick={handleClick}
                      className={`mb-2 px-4 py-2 border border-b-gray-500 text-base leading-15 font-medium rounded-md text-gray-700 bg-white flex items-center ${!companyInfo?.includes('Aucun élément') ? 'cursor-pointer' : ''}`}
                    >
                      {error ? (
                        displayError(error)
                      ) : (
                        <>
                          {isClicked ? (
                            <CheckCircleIcon className="text-green-700 text-2xl mr-1" />
                          ) : null}
                          {companyInfo}
                        </>
                      )}
                    </label>
                  ))}
              </div>
            )}

            <FormInputWithYup isDisabled label="Organisme" name="societe" />

            <FormInputWithYup
              label="Fonction dans l'organisation"
              name="fonction"
            />
            <div className="form-group form-check pt-2 md:pt-4">
              <div className="fr-fieldset__element fr-fieldset__element--inline">
                <div className="fr-checkbox-group">
                  <input
                    id="cguAgreement"
                    type="checkbox"
                    {...register('cguAgreement')}
                  />
                  <label className="fr-label" htmlFor="cguAgreement">
                    J'accepte les conditions générales d'utilisation et je
                    m'engage à les respecter.
                  </label>
                </div>
                <div className="flex flex-col items-start">
                  <Link
                    label="Lire les conditions générales d'utilisation"
                    onClick={() => setShowCgu(true)}
                  />
                  {errors.cguAgreement && (
                    <p className="error-message pt-1 mb-0">
                      {
                        "Veuillez accepter les conditions générales d'utilisation"
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
            <SubmitButton
              buttonLabel="S'inscrire"
              isLoading={isLoading}
              isLoadingSubmit={isLoadingSubmit}
              classname="w-full flex justify-start"
              btnClassname="float-none transform-none"
            />
          </form>
        </FormProvider>
      </div>
      <DialogV2
        arrowIcon={false}
        isOpen={showCgu}
        size="lg"
        onClickClose={() => setShowCgu(false)}
        onClickConfirm={() => setShowCgu(false)}
      >
        <TermsAndConditionsContent />
      </DialogV2>
    </div>
  );
};
