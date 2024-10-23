import * as yup from 'yup';

const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

export const schema = yup.object().shape({
  societe: yup
    .string()
    // .required("*Le nom de l'etablissement est requis")
    .max(100, "Le nom de l'établissement ne peut pas dépasser 100 caractères"),
  adresse: yup
    .string()
    // .required("*L'adresse est requise")
    .max(150, "L'adresse ne peut pas dépasser 150 caractères"),
  ville: yup
    .string()
    // .required('*La ville est requise')
    .max(100, 'La ville ne peut pas dépasser 100 caractères'),
  codePostal: yup
    .string()
    // .required('*Le code postal est requis')
    .max(5, 'Le code postal ne peut pas dépasser 5 caractères'),
  siren: yup
    .string()
    // .required('*Le numéro SIREN est requis')
    .length(9, 'Le numéro SIREN doit contenir 9 caractères'),
  // groupe: yup
  //   .string()
  //   .required("*Le type d'organisation est requis")
  //   .oneOf(
  //     ['ORGANISME_COMPLEMENTAIRE', 'CAISSE'],
  //     "Veuillez sélectionner un type d'organisation"
  //   ),
  emailEntreprise: yup
    .string()
    .nullable()
    .test(
      'is-valid-email',
      'Veuillez entrer un email valide',
      (value) => !value || yup.string().email().isValidSync(value)
    ),
  telephone: yup
    .string()
    .nullable()
    .test(
      'is-valid-phone',
      '*Le numéro de téléphone doit être un numéro Français',
      (value) => !value || frenchPhoneRegExp.test(value)
    ),
  siteWeb: yup.string().max(100, 'Le lien ne peut pas dépasser 100 caractères'),
});
