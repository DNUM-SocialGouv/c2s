import React, { ChangeEvent, useState } from 'react';
import FormInput from '@/components/common/input/FormInput';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { LpaInfo, AdresseInfo } from '@/page/etablishmentTab/Contants';
import AlertValidMessage from '@/components/common/alertValidMessage/AlertValidMessage.tsx';
import { fetchAdresseSuggestions } from '@/page/etablishmentTab/action.ts';
import { isEmailValid, isPhoneValid } from '@/utils/LPAForm.helper';
import { COMMON, OC_MES_ETABLISSEMENTS } from '@/wording';

interface LpaInfoFormProps {
  initialData?: LpaInfo;
  onSubmit: (formData: LpaInfo, isEditing: boolean) => void;
  isEditing?: boolean;
  onDelete?: (id: string) => void;
  index?: number;
}

export const LPAForm: React.FC<LpaInfoFormProps> = ({
  initialData = {
    id: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    adresseComplete: '',
    codePostal: '',
    context: '',
    ville: '',
  },
  onSubmit,
  isEditing = false,
  index = 0,
  onDelete,
}) => {
  const [formData, setFormData] = useState<LpaInfo>(initialData);
  const [adresseSuggestions, setAdresseSuggestions] = useState<AdresseInfo[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdresseChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setFormData((prev) => ({ ...prev, adresseComplete: inputValue }));
    if (inputValue.length > 3) {
      try {
        const suggestions = await fetchAdresseSuggestions(inputValue);
        setAdresseSuggestions(suggestions);
      } catch (error) {
        console.error('Error retrieving addresses:', error);
        setErrorMessage('Failed to fetch address suggestions.');
      }
    }
  };

  const handleAdresseSelect = (selectedAdresse: AdresseInfo) => {
    setFormData((prev) => ({
      ...prev,
      adresse: selectedAdresse.adresse,
      adresseComplete: selectedAdresse.label,
      codePostal: selectedAdresse.codePostal,
      context: selectedAdresse.context,
      ville: selectedAdresse.ville,
    }));
    setAdresseSuggestions([]);
  };

  const resetForm = () => {
    setFormData({ ...initialData });
  };
  //FIXME: supprimer isEditing
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      onSubmit(formData, isEditing);
      setShowSuccessMessage(true);
      setSuccessMessage(
        isEditing
          ? `Le point d'acceil a été mis à jour!`
          : `Le point d'acceil a été ajouté!`
      );

      if (!isEditing) {
        resetForm();
      }
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setErrorMessage('Error: ' + error.toString());
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    onDelete?.(id);
    console.log('formData', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-5 border border-gray-200"
      data-testid="lpa-form"
    >
      {isEditing && (
        <div
          className="text-center font-serif bg-yellow-100 px-1 py-1 rounded inline-block my-2.5 uppercase text-[0.75rem] leading-[1.25rem] font-bold"
          style={{
            color: 'var(--light-accent-yellow-tournesol-sun-407, #716043)',
            fontFamily: 'Marianne',
          }}
        >
          {OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.PANumber}
          {index + 1}
        </div>
      )}
      {showSuccessMessage && (
        <AlertValidMessage
          successMessage={successMessage}
          isVisible={showSuccessMessage}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
      {errorMessage && (
        <div className="fr-alert fr-alert--error">{errorMessage}</div>
      )}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormInput
            label="Nom de l'établissement"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            isError={isEditing && !formData.nom}
            errorMessage="Ce champ est obligatoire"
          />
          <FormInput
            label="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isError={
              !!(
                (isEditing &&
                  (!formData.email || !isEmailValid(formData.email))) ||
                (!isEditing && formData.email && !isEmailValid(formData.email))
              )
            }
            errorMessage={
              !formData.email
                ? 'Ce champ est obligatoire'
                : 'Veuillez entrer une adresse e-mail valide.'
            }
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="fr-label" htmlFor="adresse">
              Adresse
            </label>
            <div className="fr-input-wrap" style={{ position: 'relative' }}>
              <input
                className="fr-input"
                id="adresse"
                name="adresse"
                type="text"
                onChange={handleAdresseChange}
                value={formData.adresseComplete}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FmdGoodIcon />
              </span>
            </div>
            <div
              id="adresse-desc"
              className={`${isEditing && !formData.adresse ? 'fr-error-text' : ''}`}
            >
              {isEditing && !formData.adresse ? 'Ce champ est obligatoire' : ''}
            </div>
            {/* //FIXME: use Select */}
            {adresseSuggestions.length > 0 && (
              <ul className="absolute w-full z-10 list-none bg-white mt-1 border border-gray-300">
                {adresseSuggestions.map((adresse, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAdresseSelect(adresse)}
                  >
                    {adresse.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <FormInput
            label="Téléphone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            isError={
              !!(
                (isEditing &&
                  (!formData.telephone || !isPhoneValid(formData.telephone))) ||
                (!isEditing &&
                  formData.telephone &&
                  !isPhoneValid(formData.telephone))
              )
            }
            errorMessage={
              !formData.telephone
                ? 'Ce champ est obligatoire'
                : 'Veuillez entrer un numéro de téléphone valide.'
            }
          />
        </div>
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <>
            <button
              className="fr-btn fr-btn--secondary"
              type="submit"
              disabled={
                !formData.email ||
                !formData.telephone ||
                !formData.adresse ||
                !formData.nom ||
                !isEmailValid(formData.email) ||
                !isPhoneValid(formData.telephone)
              }
            >
              {COMMON.save}
            </button>
            <button
              className="ml-4 fr-btn fr-btn--tertiary btn-delete"
              onClick={(e) => handleDelete(e, formData.id)}
            >
              {COMMON.delete}
            </button>
          </>
        ) : (
          <button
            className="fr-btn"
            type="submit"
            disabled={
              !formData.email ||
              !formData.telephone ||
              !formData.adresse ||
              !formData.nom ||
              !isEmailValid(formData.email) ||
              !isPhoneValid(formData.telephone)
            }
          >
            Ajouter
          </button>
        )}
      </div>
    </form>
  );
};
