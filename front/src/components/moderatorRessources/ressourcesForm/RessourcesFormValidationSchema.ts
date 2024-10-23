import * as yup from 'yup';

const schema = yup.object().shape({
  thematiques: yup.array().of(
    yup.object().shape({
      titre: yup
        .string()
        .required('*Ce champ est requis')
        .min(2, '*Le champs doit contenir 2 caractères au minimum')
        .max(25, '*Le champs doit contenir 25 caractères au maximum'),
      description: yup
        .string()
        .required('*Ce champ est requis')
        .min(2, '*Le champs doit contenir 2 caractères au minimum')
        .max(255, '*Le champs doit contenir 25 caractères au maximum'),
    })
  ),
});
export { schema };
