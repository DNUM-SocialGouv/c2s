import { combineReducers } from 'redux';
import reducer from './page/inscriptionPartnerPage/reducer.ts';

export const rootReducer = combineReducers({
    inscription: reducer,
});
