interface Action {
    type: string;
    payload?: any;
}

interface FormData {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    societe: string;
    groupe: 'OC'|'Caisse';
    siren: string;
    fonction: string;
}

const initialFormData: FormData = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    societe: '',
    groupe: 'OC',
    siren: '',
    fonction: '',
};

const inscriptionReducer = (state: FormData = initialFormData, action: Action) => {
    switch (action.type) {
        case 'UPDATE_FORM_DATA':
            return { ...state, [action.payload.field]: action.payload.value };

        case 'RESET_FORM_DATA':
            return initialFormData;
        case 'FETCH_DATA_SUCCESS':
            return {initialFormData};
        default:
            return state;
    }
};

export default inscriptionReducer;