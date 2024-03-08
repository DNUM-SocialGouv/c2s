import { axiosInstance } from "../../RequestInterceptor";

import {
  AppActions,
  FETCH_RESET_PASSWORD_ERROR,
  FETCH_RESET_PASSWORD_SUCCESS,
  FETCH_RESET_PASSWORD,
} from "./Contants.ts";
import { Dispatch } from "redux";
import { iData } from "@/page/resetPasswordPage/ResetPasswordPage.tsx";
import axios from "axios";

export const submitConfirmPassword =
  (data: iData) => async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_RESET_PASSWORD });
      const response = await axiosInstance.post("/reset-password", data);
      dispatch({ type: FETCH_RESET_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
      let errorMessage = "Erreur : Veuillez réassyer ultérieurement";
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage = "Utilisateur non trouvé";
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: FETCH_RESET_PASSWORD_ERROR, payload: errorMessage });
    }
  };
