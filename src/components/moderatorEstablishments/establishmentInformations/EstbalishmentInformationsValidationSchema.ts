import * as yup from 'yup';

export const schema = yup.object().shape({
  societe: yup
    .string()
    .required("*Le nom de l'etablissement est requis")
    .max(100, "Le nom de l'etablissement ne peut pas dépasser 100 caractères"),
  adresse: yup
    .string()
    .required("*L'adresse est requise")
    .max(150, "L'adresse ne peut pas dépasser 150 caractères"),
  ville: yup
    .string()
    .required('*La ville est requise')
    .max(100, 'La ville ne peut pas dépasser 100 caractères'),
  codePostal: yup
    .string()
    .required('*Le code postal est requis')
    .max(5, 'Le code postal ne peut pas dépasser 5 caractères'),
  siren: yup
    .string()
    .required('*Le numéro SIREN est requis')
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
    .required("*L'email est requis")
    .email('Veuillez entrer un email valide')
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  telephone: yup.string(),
  // .matches(
  //   frenchPhoneRegExp,
  //   '*Le numéro de téléphone doit être un numéro Français'
  // ),
  siteWeb: yup.string().max(100, 'Le lien ne peut pas dépasser 100 caractères'),
  pointAccueil: yup.boolean(),
});
