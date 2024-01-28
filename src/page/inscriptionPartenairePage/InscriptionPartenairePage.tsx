import React from 'react';
import { Header } from '../../components/header/Header.tsx';
import { Footer } from '../../components/footer/Footer';
import { Svg } from '../../components/svg/Svg';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import {submitFormData,updateFormData} from './action.tsx'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface MyFormProps {
    handleCheckboxChange: (checkboxName: string) => void;
}
const InscriptionPartenairePage: React.FC<MyFormProps> = () => {
    const formData = useSelector((state: any) => state.formData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/inscription/validation');
        dispatch(submitFormData(formData));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            dispatch(updateFormData(name, checked));
        } else {
            dispatch(updateFormData(name, value));
        }
    };


    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateFormData(name, value));
    };
    return (
        <>
            <div className='dialog-off-canvas-main-canvas'>
                <Header />
                <div  className="flex">
                    <div className="flex bg-primary justify-center align-middle py-20 w-full">
                        <Svg />
                    </div>
                    <div className="flex flex-col gap-2 w-full items-center px-20 py-10">
                        <div className="w-full max-w-4xl mx-auto">
                            <h1 className="text-center mb-4">S'inscrire à l'espace Partenaire C2S</h1>
                            <div className='fr-alert fr-alert--info'>
                                <p>Espace réservé aux professionnels exerçant dans un organisme complémentaire ou une caisse
                                    d'assurance maladie</p>
                            </div>
                            <div className='register-form'>
                                <p>L'ensemble des champs du formulaire ci-dessous sont obligatoires.</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="fr-label" htmlFor="nom">Nom</label>
                                        <input className="fr-input" type="text" id="nom"
                                               name="nom" value={formData.nom} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="fr-label" htmlFor="prenom">Prénom</label>
                                        <input className="fr-input" type="text" id="prenom"
                                               name="prenom" value={formData.prenom} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="fr-label" htmlFor="email">E-mail</label>
                                        <input className="fr-input" type="text" id="email"
                                               name="email" value={formData.email} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="fr-label" htmlFor="telephonet">Téléphone</label>
                                        <input className="fr-input" type="text" id="telephone"
                                               name="telephone" value={formData.telephone} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="fr-label" htmlFor="societe">Société</label>
                                        <input className="fr-input" type="text" id="societe"
                                               name="societe" value={formData.societe} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <fieldset className="fr-fieldset" id="radio"
                                                  aria-labelledby="radio-legend radio-messages">
                                            <legend className="fr-fieldset__legend--regular fr-fieldset__legend"
                                                    id="radio-legend">
                                                Type d'organisation
                                            </legend>
                                            <div className="fr-fieldset__element">
                                                <div className="fr-radio-group">
                                                    <input type="radio"
                                                           id="radio-1"
                                                           name="groupe"
                                                           checked={formData.groupe === 'OC'}
                                                           value="OC"
                                                           onChange={handleRadioChange}/>
                                                    <label className="fr-label" htmlFor="radio-1">
                                                        Organisme complémentaire
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="fr-fieldset__element">
                                                <div className="fr-radio-group">
                                                    <input   type="radio"
                                                             id="radio-2"
                                                             name="groupe"
                                                             checked={formData.groupe === 'Caisse'}
                                                             value="Caisse"
                                                             onChange={handleRadioChange}/>
                                                    <label className="fr-label" htmlFor="radio-2">
                                                        Caisse d'assurance maladie
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="fr-messages-group" id="radio-messages" aria-live="assertive">
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="form-group">
                                        <label className="fr-label" htmlFor="siren">Siren
                                            <span className="fr-hint-text">9 chiffres</span></label>
                                        <input className="fr-input" type="text" id="siren"
                                               name="siren" value={formData.siren} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="fr-label" htmlFor="fonction">Fonction dans
                                            l'organisation</label>
                                        <input className="fr-input" type="text" id="fonction"
                                               name="fonction" value={formData.fonction} onChange={handleChange}/>
                                    </div>

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

                                    <div className='form-group'>
                                        <button className="fr-btn">
                                            <span>S'inscrire</span>
                                            <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default InscriptionPartenairePage;
