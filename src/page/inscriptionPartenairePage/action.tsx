import { axiosInstance } from '../../RequestInterceptor';

export const updateFormData = (field: string, value: string | boolean) => ({
    type: 'UPDATE_FORM_DATA',
    payload: { field, value },
});
export const submitFormData = (formData: any) => async (dispatch: any) => {
    axiosInstance.post('/inscription/membre',formData).then(()=>{

    }).then(data => {
        // Dispatch the actual action with the data
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
        dispatch(resetFormData());
    })
        .catch(error => {
            // Handle error and dispatch an error action if needed
            dispatch({ type: 'FETCH_DATA_ERROR', payload: error });
            dispatch(resetFormData());
        });

};
export const resetFormData = () => ({
    type: 'RESET_FORM_DATA',
});