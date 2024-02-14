import {axiosInstance} from '../../RequestInterceptor';

import {
    AppActions,
    FETCH_RESET_PASSWORD_REQUEST_ERROR,
    FETCH_RESET_PASSWORD_REQUEST_SUCCESS,
    FETCH_RESET_PASSWORD_REQUEST,
} from './Contants.ts';
import {Dispatch} from 'redux';

export const submitSentMail = (mail: string ) => async (dispatch: Dispatch<AppActions>) => {
    try {
        dispatch({ type: FETCH_RESET_PASSWORD_REQUEST });
        const data = { email: mail };
        const response = await axiosInstance.post('/reset-password', data)
        dispatch({ type: FETCH_RESET_PASSWORD_REQUEST_SUCCESS, payload: response.data });
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch({ type: FETCH_RESET_PASSWORD_REQUEST_ERROR, payload: error.toString() });
    }
};
