import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import {submitFormData, fetchCompanyInfoFromSiren, selectCompanyName} from './action.js';
import { useNavigate } from 'react-router-dom';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioGroup from "@/components/common/radioGroup/RadioGroup.tsx";
import FormInput from "@/components/common/input/FormInput.tsx";
import SubmitButton from "@/components/common/submitButton/SubmitButton.tsx";

export interface iFormData {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    societe: string;
    groupe: string;
    siren: string;
    fonction: string;
    companyName: string;
}
const FormComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { companyInfo, isLoading ,isClicked, isLoadingSubmit, error }= useSelector(state => state.inscription);


    const [formData, setFormData] = useState<iFormData>({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        societe: '',
        groupe: 'OC',
        siren: '',
        fonction: '',
        companyName:'',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(submitFormData(formData,navigate));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleClick = () => {
        if (!companyInfo.includes('Aucun élément')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(selectCompanyName('isClicked', true));
            setFormData(prevState => ({
                ...prevState,
                companyName: companyInfo
            }));
        }
    };
    const handleSirenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            siren: value
        }));
        if (value.length === 9) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(fetchCompanyInfoFromSiren(value));
        }
    };
    return (
        <> <div className="flex flex-col lg:gap-2 w-full items-center px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0">
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="fr-h2 text-left mb-4">S'inscrire à l'espace Partenaire C2S</h2>
                <div className='fr-alert fr-alert--info'>
                    <p>Espace réservé aux professionnels exerçant dans un organisme complémentaire ou une
                        caisse
                        d'assurance maladie</p>
                </div>
                <div className='register-form'>
                    <p>L'ensemble des champs du formulaire ci-dessous sont obligatoires.</p>
                    <form onSubmit={handleSubmit}>
                        <FormInput label="Nom" name="nom" value={formData.nom} onChange={handleChange}/>
                        <FormInput label="Prénom" name="prenom" value={formData.prenom}
                                   onChange={handleChange}/>
                        <FormInput label="E-mail" name="email" value={formData.email}
                                   onChange={handleChange}/>
                        <FormInput label="Téléphone" name="telephone" value={formData.telephone}
                                   onChange={handleChange}/>
                        <FormInput label="Société" name="societe" value={formData.societe}
                                   onChange={handleChange}/>
                        <RadioGroup
                            selectedValue={formData.groupe}
                            onChange={handleChange}
                            options={[{value: 'OC', label: "Organisme complémentaire"}, {
                                value: 'Caisse',
                                label: "Caisse d'assurance maladie"
                            }]}
                        />
                        {formData.groupe === 'OC' && (
                            <div className="form-group">
                                <label className="fr-label" htmlFor="siren">Siren
                                    <span className="fr-hint-text">9 chiffres</span></label>
                                <div className="mt-1">
                                    <input className="fr-input" type="number" id="siren"
                                           name="siren" value={formData.siren}
                                           onChange={handleSirenChange}/>
                                </div>
                                {formData.siren.length === 9 && (
                                    isLoading ? (
                                        <span
                                            className="flex px-4 py-2 border border-b-gray-500 text-base leading-15 font-medium rounded-md text-gray-700 bg-white">
                                            <LoopIcon className="animate-spin"
                                                      style={{fontSize: '24px'}}/>
                                        </span>
                                    ) : (
                                        <label
                                            onClick={handleClick}
                                            className={`px-4 py-2 border border-b-gray-500 text-base leading-15 font-medium rounded-md text-gray-700 bg-white flex items-center ${!companyInfo?.includes('Aucun élément') ? 'cursor-pointer' : ''}`}
                                        >
                                            {
                                                error ? (
                                                    <p>Erreur : veuillez réassyer ultérieurement</p>
                                                ) : (
                                                    <>
                                                        {isClicked ? <CheckCircleIcon className="text-green-700 text-2xl mr-1" /> : null}
                                                        {companyInfo}
                                                    </>
                                                )
                                            }
                                        </label>
                                    )
                                )}
                            </div>
                        )}
                        <FormInput label="Fonction dans l'organisation" name="fonction"
                                   value={formData.fonction} onChange={handleChange}/>
                        <div className='form-group form-check'>
                            <div className="fr-fieldset__element fr-fieldset__element--inline">
                                <div className="fr-checkbox-group">
                                    <input name="checkboxes-inline-1" id="checkboxes-inline-1"
                                           type="checkbox"
                                           aria-describedby="checkboxes-inline-1-messages"/>
                                    <label className="fr-label" htmlFor="checkboxes-inline-1">
                                        En soumettant ce formulaire j'autorise la création d'un compte
                                        membre,
                                        la
                                        conservation de ces données pour contact éventuel, consultation et
                                        archivage par
                                        les administrateurs
                                    </label>
                                    <div className="fr-messages-group" id="checkboxes-inline-1-messages"
                                         aria-live="assertive">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SubmitButton buttonLabel="S'inscrire" isLoading={isLoading} isLoadingSubmit={isLoadingSubmit}/>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default FormComponent;
