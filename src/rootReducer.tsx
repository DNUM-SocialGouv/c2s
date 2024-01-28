import { combineReducers } from 'redux';
import inscriptionReducer from './page/inscriptionPartenairePage/InscriptionReducer';

export const rootReducer = combineReducers({
    formData: inscriptionReducer,
});
