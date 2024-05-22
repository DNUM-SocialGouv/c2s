import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioGroup from '@/components/common/radioGroup/RadioGroup.tsx';
import FormInput from '@/components/common/input/FormInput.tsx';
import SubmitButton from '@/components/common/submitButton/SubmitButton.tsx';
import { Honeypot } from '@/components/common/honeypot/Honeypot';
import { useHoneypot } from '@/hooks/useHoneypot';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import {
  submitFormData,
  fetchCompanyInfoFromSiren,
  selectCompanyName,
} from './action.js';

export interface iFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  societe: string;
  groupe: string;
  siren?: string | undefined;
  fonction: string;
  // companyName: string;
  dataAgreement?: boolean | undefined;
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
};

const schema = yup.object().shape({
  nom: yup.string().required('Le nom est requis'),
  prenom: yup.string().required('Le prénom est requis'),
  email: yup
    .string()
    .email('Veuillez entrer un email valide')
    .required("L'email est requis"),
  telephone: yup.string().required('Le numéro de telephone est requis'),
  societe: yup.string().required('Le nom de société est requis'),
  groupe: yup.string().required('Le groupe est requis'),
  siren: yup.string().when('groupe', {
    is: 'OC',
    then: (schema) => schema.required('Le numéro siren est requis'),
    otherwise: (schema) => schema.notRequired(),
  }),
  fonction: yup.string().required('La fonction est requise'),
  dataAgreement: yup
    .boolean()
    .oneOf([true], 'Veuillez accepter les conditions'),
});

const FormComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { honeypotValue, handleHoneypotChange } = useHoneypot('honeypot');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<iFormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const firstInteractionDetected = useRef(false);

  //detect first interaction with the form
  useEffect(() => {
    if (isDirty && !firstInteractionDetected.current) {
      const timeItimeID = uuidv4();
      console.log('First interaction detected!', timeItimeID);
      //post l'uid / au submit
      firstInteractionDetected.current = true;
    }
  }, [isDirty]);

  const onSubmit: SubmitHandler<iFormData> = (data) => {
    //reposte l'uid (time measuring) / check si erreur / catch erreur /
    console.log('SUBMIT', data);
    if (honeypotValue) {
      console.log('Bot detected!');
      return;
    }
    dispatch(submitFormData(data, navigate));
  };

  const { companyInfo, isLoading, isClicked, isLoadingSubmit, error } =
    useSelector((state: RootState) => state.inscription);

  const sirenValue = watch('siren');
  const groupeValue = watch('groupe');

  useEffect(() => {
    console.log('errors: ', errors);
    if (sirenValue && sirenValue.length === 9) {
      dispatch(fetchCompanyInfoFromSiren(sirenValue));
    }
  }, [sirenValue, dispatch]);

  useEffect(() => {
    if (companyInfo && !companyInfo.includes('Aucun élément')) {
      dispatch(selectCompanyName('isClicked', true));
    }
  }, [companyInfo, dispatch]);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Honeypot
            honeypotName="honeypot"
            onHoneypotChange={handleHoneypotChange}
          />
          <FormInput
            label="Nom"
            name="nom"
            register={register}
            errors={errors.nom}
          />
          <FormInput
            label="Prénom"
            name="prenom"
            register={register}
            errors={errors.prenom}
          />
          <FormInput
            label="E-mail"
            name="email"
            register={register}
            errors={errors.email}
          />
          <FormInput
            label="Téléphone"
            name="telephone"
            register={register}
            errors={errors.telephone}
          />
          <FormInput
            label="Société"
            name="societe"
            register={register}
            errors={errors.societe}
          />
          <RadioGroup
            name="groupe"
            register={register}
            errors={errors.groupe}
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
                  {...register('siren')}
                />
                <p className="error-message pt-2">{errors.siren?.message}</p>
              </div>
              {sirenValue?.length === 9 &&
                (isLoading ? (
                  <span className="flex px-4 py-2 border border-b-gray-500 text-base leading-15 font-medium rounded-md text-gray-700 bg-white">
                    <LoopIcon
                      className="animate-spin"
                      style={{ fontSize: '24px' }}
                    />
                  </span>
                ) : (
                  <label
                    onClick={() => {}}
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
          <FormInput
            label="Fonction dans l'organisation"
            name="fonction"
            register={register}
            errors={errors.fonction}
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
                  En soumettant ce formulaire j'autorise la création d'un compte
                  membre, la conservation de ces données pour contact éventuel,
                  consultation et archivage par les administrateurs
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
      </div>
    </div>
  );
};

export default FormComponent;
