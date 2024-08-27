import { axiosInstance } from '../../RequestInterceptor';

import {
  AppActions,
  FETCH_RESET_PASSWORD_ERROR,
  FETCH_RESET_PASSWORD_SUCCESS,
  FETCH_RESET_PASSWORD,
} from './Contants.ts';
import { Dispatch } from 'redux';
import { iData } from '@/page/resetPasswordPage/ResetPasswordPage.tsx';
import axios from 'axios';

export const submitConfirmPassword =
  (data: iData) => async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_RESET_PASSWORD_ERROR, payload: '' });
      dispatch({ type: FETCH_RESET_PASSWORD });
      const response = await axiosInstance.post('/public/reset-password', data);
      dispatch({ type: FETCH_RESET_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
      let errorMessage =
        "Une erreur s'est produite, veuillez réessayer ulterieurement.";
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage = 'Utilisateur non trouvé';
        }

        if (error.response?.status === 400) {
          if (error.response?.data) {
            const errorAPIResponse = error.response?.data;
            const { email, password, token } = errorAPIResponse;
            if (email) {
              errorMessage = 'Erreur: ' + email;
            }
            if (password) {
              errorMessage = 'Erreur: ' + password;
            }
            if (token) {
              errorMessage = 'Erreur: ' + token;
            }
            if (email && password) {
              errorMessage = 'Erreur: ' + email + ' ' + password;
            }
            if (email && token) {
              errorMessage =
                'Les erreurs suivantes se sont produites: ' +
                '<br />' +
                email +
                ' <br/>' +
                token;
            }
            if (password && token) {
              errorMessage =
                'Les erreurs suivantes se sont produites: ' +
                '<br />' +
                password +
                '<br/>' +
                token;
            }
            if (email && password && token) {
              errorMessage =
                'Les erreurs suivantes se sont produites: ' +
                '<br /><br />' +
                email +
                '.' +
                ' <br/> <br />' +
                password +
                '.' +
                ' <br/> <br />' +
                token +
                '.' +
                '<br />';
            }
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: FETCH_RESET_PASSWORD_ERROR, payload: errorMessage });
    }
  };
