import { combineReducers } from 'redux';
import inscriptionPartnerReducer from './page/inscriptionPartnerPage/InscriptionPartnerReducer.ts';
import requestResetPasswordReducer from "@/page/requestResetPasswordPage/RequestResetPasswordReducer.ts";

export const rootReducer = combineReducers({
    inscription: inscriptionPartnerReducer,
    resetPasswordState: requestResetPasswordReducer
});
