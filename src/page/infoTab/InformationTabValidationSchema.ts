import * as yup from 'yup';

const frenchPhoneRegExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;

const schema = yup.object().shape(
  {
    nom: yup
      .string()
      .required('*Le nom est requis')
      .min(2, '*Le champs doit contenir 2 caractères'),
    prenom: yup
      .string()
      .required('*Le prénom est requis')
      .min(2, '*Le champs doit contenir 2 caractères au minimum')
      .max(25, '*Le champs doit contenir 25 caractères au maximum'),
    telephone: yup
      .string()
      .required('*Le numéro de telephone et requis')
      .matches(
        frenchPhoneRegExp,
        '*Le numéro de téléphone doit être un numéro français'
      ),
    fonction: yup
      .string()
      .required('*La fonction est requise')
      .max(25, '*Le champs doit contenir 25 caractères au maximum'),
    nouveauMdp: yup.string().when('nouveauMdp', {
      is: (val: string) => val?.length > 0,
      then: (schema) =>
        schema
          .required('*Le mot de passe est requis')
          .matches(
            passwordRegEx,
            '*12 caractères, composé de chiffres, lettres et caractères spéciaux.'
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
    confirmMdp: yup
      .string()
      .optional()
      .when('nouveauMdp', {
        is: (val: string) => val?.length > 0,
        then: (schema) =>
          schema
            .required('*La confirmation du mot de passe est requise')
            .oneOf(
              [yup.ref('nouveauMdp')],
              '*Les mots de passe doivent être identiques'
            )
            .matches(
              passwordRegEx,
              '*12 caractères, composé de chiffres, lettres et caractères spéciaux.'
            ),
        otherwise: (schema) => schema.notRequired(),
      }),
  },
  [['nouveauMdp', 'nouveauMdp']]
);

export { schema };
