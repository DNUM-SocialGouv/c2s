import React, { ChangeEvent, useState } from 'react';
import FormInput from '../../../components/common/input/FormInput.tsx';
import { PointAcceuilInfo } from '../Contants.ts';
import AlertValidMessage from '../../../components/common/alertValidMessage/AlertValidMessage.tsx';
import {
  isEmailValid,
  isPhoneValid,
  pointAcceuilNumero,
} from '../../../utils/LPAForm.helper.ts';
import { COMMON, OC_MES_ETABLISSEMENTS } from '../../../wording.ts';
import './PointAcceuil.css';

interface LpaInfoFormProps {
  initialData?: PointAcceuilInfo;
  onSubmit: (formData: PointAcceuilInfo, isEditing: boolean) => void;
  isEditing?: boolean;
  onDelete?: (id: string) => void;
  index?: number;
  pageSize: number;
  currentPage: number;
}

export const LPAForm: React.FC<LpaInfoFormProps> = ({
  initialData = {
    id: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    adresse2: '',
    adresse3: '',
    cedex: '',
    adresseComplete: '',
    codePostal: '',
    context: '',
    ville: '',
  },
  onSubmit,
  isEditing = false,
  index = 0,
  onDelete,
  pageSize,
  currentPage,
}) => {
  const [formData, setFormData] = useState<PointAcceuilInfo>(initialData);

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
    setFormData((prev) => ({ ...prev, adresse: inputValue }));
  };

  const handleCodePostalChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setFormData((prev) => ({ ...prev, codePostal: inputValue }));
    console.log('handleCodePostalChange inputValue', inputValue);
  };

  const handleVilleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setFormData((prev) => ({ ...prev, ville: inputValue }));
  };

  const resetForm = () => {
    setFormData({ ...initialData });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      onSubmit(formData, isEditing);
      setShowSuccessMessage(true);
      setSuccessMessage(
        isEditing
          ? OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.updatePASuccessMsg
          : OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.createPASuccessMsg
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
          {pointAcceuilNumero(currentPage, pageSize, index)}
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
            label="Nom de l'établissement *"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            isError={isEditing && !formData.nom}
            errorMessage="Ce champ est obligatoire"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
          <div className="form-group" style={{ position: 'relative' }}>
            {/* Adresse 1 */}
            <label className="fr-label" htmlFor="adresse">
              {OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.adresse}
            </label>
            <div className="fr-input-wrap" style={{ position: 'relative' }}>
              <input
                className="fr-input"
                id="adresse"
                name="adresse"
                type="text"
                onChange={handleAdresseChange}
                value={formData.adresse}
              />
            </div>
            <div
              id="adresse-desc"
              className={`${isEditing && !formData.adresse ? 'fr-error-text' : ''}`}
            >
              {isEditing && !formData.adresse ? 'Ce champ est obligatoire' : ''}
            </div>
            {/* Adresse 2 */}
            <label
              className="fr-label adresse__input--magin-top"
              htmlFor="adresse2"
            >
              {OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.adresse2}
            </label>
            <div className="fr-input-wrap" style={{ position: 'relative' }}>
              <input
                className="fr-input"
                id="adresse2"
                name="adresse2"
                type="text"
                onChange={handleChange}
                value={formData.adresse2}
              />
            </div>
            {/* Adresse 3 */}
            <label
              className="fr-label adresse__input--magin-top"
              htmlFor="adresse3"
            >
              {OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.adresse3}
            </label>
            <div className="fr-input-wrap" style={{ position: 'relative' }}>
              <input
                className="fr-input"
                id="adresse3"
                name="adresse3"
                type="text"
                onChange={handleChange}
                value={formData.adresse3}
              />
            </div>
            {/* téléphone */}
            <FormInput
              label={OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.telephone}
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              isError={
                !!(
                  (isEditing &&
                    (!formData.telephone ||
                      !isPhoneValid(formData.telephone))) ||
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

        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          {/* Code postal */}
          <label
            className="fr-label adresse__input--magin-top"
            htmlFor="code-postal"
          >
            {OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.zipCode}
          </label>
          <div className="fr-input-wrap" style={{ position: 'relative' }}>
            <input
              className="fr-input"
              id="code-postal"
              name="code-postal"
              type="text"
              onChange={handleCodePostalChange}
              value={formData.codePostal}
            />
          </div>
          <div
            id="cp-desc"
            className={`${isEditing && !formData.codePostal ? 'fr-error-text' : ''}`}
          >
            {isEditing && !formData.codePostal
              ? 'Ce champ est obligatoire'
              : ''}
          </div>
          {/* Ville */}

          <label className="fr-label adresse__input--magin-top" htmlFor="ville">
            {OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.ville}
          </label>
          <div className="fr-input-wrap" style={{ position: 'relative' }}>
            <input
              className="fr-input"
              id="ville"
              name="ville"
              type="text"
              onChange={handleVilleChange}
              value={formData.ville}
            />
          </div>
          <div
            id="ville-desc"
            className={`${isEditing && !formData.ville ? 'fr-error-text' : ''}`}
          >
            {isEditing && !formData.ville ? 'Ce champ est obligatoire' : ''}
          </div>

          {/* Cedex */}

          <label className="fr-label adresse__input--magin-top" htmlFor="cedex">
            {OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.cedex}
          </label>
          <div className="fr-input-wrap" style={{ position: 'relative' }}>
            <input
              className="fr-input"
              id="cedex"
              name="cedex"
              type="text"
              onChange={handleChange}
              value={formData.cedex}
            />
          </div>

          <FormInput
            label={OC_MES_ETABLISSEMENTS.FORMULAIRE_POINT_ACCUEIL.email}
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
                !formData.codePostal ||
                !formData.ville ||
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
