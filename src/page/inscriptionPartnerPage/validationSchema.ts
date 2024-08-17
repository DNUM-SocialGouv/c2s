import * as yup from 'yup';

// TODO: mutualiser les regex. Poser la question de la gestion des regex : on accepte des numéros courts pour les PA
const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

export const schema = yup.object().shape({
  nom: yup
    .string()
    .required('*Le nom est requis')
    .min(2, '*Le champs doit contenir 2 caractères'),
  prenom: yup
    .string()
    .required('*Le prénom est requis')
    .min(2, '*Le champs doit contenir 2 caractères au minimum')
    .max(25, '*Le champs doit contenir 25 caractères au maximum'),
  email: yup
    .string()
    .email('Veuillez entrer un email valide')
    .required("*L'email est requis")
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  telephone: yup
    .string()
    .required('*Le numéro de telephone et requis')
    .matches(
      frenchPhoneRegExp,
      '*Le numéro de téléphone doit être un numéro français'
    ),
  societe: yup.string().required("*L'organisme est requis"),
  groupe: yup.string().required('*Le groupe est requis'),
  siren: yup.string().when('groupe', {
    is: 'ORGANISME_COMPLEMENTAIRE',
    then: (schema) =>
      schema
        .required('*Le numéro siren est requis')
        .length(9, 'Le numéro SIREN doit contenir 9 caractères'),
    otherwise: (schema) => schema.notRequired(),
  }),
  fonction: yup
    .string()
    .required('*La fonction est requise')
    .max(25, '*Le champs doit contenir 25 caractères au maximum'),
  cguAgreement: yup
    .boolean()
    .oneOf([true], "Veuillez accepter les conditions générales d'utilisation"),
  companyName: yup.string(),
});
