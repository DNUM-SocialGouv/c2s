import * as yup from 'yup';

interface FormValues {
  titre: string;
  description: string;
  groupes: string[];
}

const schema = yup.object<FormValues>().shape({
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
  groupes: yup
    .array()
    .of(yup.string().required())
    .min(1, '*Veuillez sélectionner au moins un groupe'),
});

export { schema };
