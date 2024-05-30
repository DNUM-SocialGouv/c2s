import { useEffect, useRef } from 'react';
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
} from './action.js';
import { axiosInstance } from '@/RequestInterceptor';
import { FormInputWithYup } from '@/components/common/input/FormInputWithYup';
import { RadioGroupWithYup } from '@/components/common/radioGroup/RadioGroupWithYup';

export interface iFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  societe: string;
  groupe: string;
  siren: string;
  fonction: string;
  dataAgreement?: boolean;
  formId?: string;
  companyName: string;
}

interface RootState {
  inscription: {
    companyInfo: string | null;
    isLoading: boolean;
    isClicked: boolean;
    isLoadingSubmit: boolean;
    error: string | null;
  };
}

const defaultValues: iFormData = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  societe: '',
  groupe: '',
  siren: '',
  fonction: '',
  dataAgreement: false,
  companyName: '',
};

const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

const schema = yup.object().shape({
  nom: yup
    .string()
    .required('*Le nom est requis')
    .min(2, '*Le champs doit contenir 2 caractères'),
  prenom: yup.string().required('*Le prénom est requis').min(2),
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
  societe: yup
    .string()
    .required('*Le nom de société est requis')
    .max(100, 'Le nom de société ne peut pas dépasser 100 caractères'),
  groupe: yup.string().required('*Le groupe est requis'),
  siren: yup.string().when('groupe', {
    is: 'OC',
    then: (schema) =>
      schema
        .required('*Le numéro siren est requis')
        .length(9, 'Le numéro SIREN doit contenir 9 caractères'),
    otherwise: (schema) => schema.notRequired(),
  }),
  fonction: yup
    .string()
    .required('*La fonction est requise')
    .max(100, 'La fonction ne peut pas dépasser 100 caractères'),
  dataAgreement: yup
    .boolean()
    .oneOf([true], 'Veuillez accepter les conditions'),
  companyName: yup.string(),
});

const FormComponent = () => {
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
    formState: { errors, isDirty },
  } = methods;

  const onSubmit = (data: iFormData) => {
    if (honeypotValue) {
      //reload page if bot is detected
      console.error('bot detected');
      navigate(0);
      return;
    }

    data.formId = formId.current;

    data.siren = groupeValue === 'OC' ? data.siren : '';

    delete data.dataAgreement;

    //todo:traiter la réponse back
    dispatch(submitFormData(data));
  };

  //detect first interaction with the form
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

  const { companyInfo, isLoading, isClicked, isLoadingSubmit, error } =
    useSelector((state: RootState) => state.inscription);

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
      console.log('ICI!companyInfo: ', companyInfo);
    }
  }, [companyInfo, dispatch]);

  const handleClick = () => {
    if (companyInfo && !companyInfo.includes('Aucun élément')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(selectCompanyName('isClicked', true));
      setValue('companyName', companyInfo); // Update form state with company name
    }
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
            <FormInputWithYup label="Nom" name="nom" />
            <FormInputWithYup label="Prénom" name="prenom" />
            <FormInputWithYup label="E-mail" name="email" />
            <FormInputWithYup label="Téléphone" name="telephone" />
            <FormInputWithYup label="Société" name="societe" />

            <RadioGroupWithYup
              name="groupe"
              options={[
                { value: 'OC', label: 'Organisme complémentaire' },
                { value: 'Caisse', label: "Caisse d'assurance maladie" },
              ]}
            />
            {groupeValue === 'OC' && (
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
                  />
                  <p className="error-message pt-2">{errors.siren?.message}</p>
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
                      className={`px-4 py-2 border border-b-gray-500 text-base leading-15 font-medium rounded-md text-gray-700 bg-white flex items-center ${!companyInfo?.includes('Aucun élément') ? 'cursor-pointer' : ''}`}
                    >
                      {error ? (
                        <p>Erreur : veuillez réassyer ultérieurement</p>
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
            <FormInputWithYup
              label="Fonction dans l'organisation"
              name="fonction"
            />
            <div className="form-group form-check">
              <div className="fr-fieldset__element fr-fieldset__element--inline">
                <div className="fr-checkbox-group">
                  <input
                    id="dataAgreement"
                    type="checkbox"
                    aria-describedby="dataAgreement-messages"
                    {...register('dataAgreement')}
                  />
                  <label className="fr-label" htmlFor="dataAgreement">
                    En soumettant ce formulaire j'autorise la création d'un
                    compte membre, la conservation de ces données pour contact
                    éventuel, consultation et archivage par les administrateurs
                  </label>
                  <div
                    className="fr-messages-group"
                    id="dataAgreement-messages"
                    aria-live="assertive"
                  ></div>
                  {errors.dataAgreement && (
                    <p className="error-message pt-2">
                      {'Veuillez accepter les conditions'}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <SubmitButton
              buttonLabel="S'inscrire"
              isLoading={isLoading}
              isLoadingSubmit={isLoadingSubmit}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default FormComponent;
