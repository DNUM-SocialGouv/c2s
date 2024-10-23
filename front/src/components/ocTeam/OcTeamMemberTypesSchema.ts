import * as yup from 'yup';

export const schema = yup.object().shape({
  membertypesform: yup.array().of(yup.string().required()).required(),
});
