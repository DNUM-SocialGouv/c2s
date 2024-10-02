import * as yup from 'yup';

const schema = yup.object().shape({
  titre: yup
    .string()
    .required('*Le titre est requis')
    .min(2, '*Le champs doit contenir 10 caractères')
    .max(5000, '*Le champs doit contenir 5000 caractères au maximum'),
  description: yup
    .string()
    .required('*La description est requise')
    .min(2, '*Le champs doit contenir 2 caractères au minimum')
    .max(5000, '*Le champs doit contenir 5000 caractères au maximum'),
  groupe: yup.string().required('*Le groupe est requis'),
});

export { schema };