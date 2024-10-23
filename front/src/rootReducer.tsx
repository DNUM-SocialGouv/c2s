import { combineReducers } from 'redux';
import inscriptionPartnerReducer from './page/inscriptionPartnerPage/InscriptionPartnerReducer.ts';
import requestResetPasswordReducer from './page/requestResetPasswordPage/RequestResetPasswordReducer.ts';
import resetPasswordReducer from './page/resetPasswordPage/ResetPasswordReducer.ts';
import infoTabReducer from './page/infoTab/InfoTabReducer.ts';
import etablishmentTabReducer from './page/etablishmentTab/EtablishmentTabReducer.ts';

export const rootReducer = combineReducers({
  inscription: inscriptionPartnerReducer,
  requestResetPasswordState: requestResetPasswordReducer,
  resetPasswordState: resetPasswordReducer,
  membreInfo: infoTabReducer,
  ocInfo: etablishmentTabReducer,
});
