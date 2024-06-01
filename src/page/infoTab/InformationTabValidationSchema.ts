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
    prenom: yup.string().required('*Le prénom est requis').min(2),
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
      .max(10, '*Le champs doit contenir 10 caractères au maximum'),
    nouveauMdp: yup.string().when('nouveauMdp', (val) => {
      if (val?.length > 1) {
        return yup
          .string()
          .matches(
            passwordRegEx,
            '*12 caractères, composé de chiffres, lettres et caractères spéciaux.'
          )
          .required();
      } else {
        return yup.string().notRequired().nullable();
      }
    }),
    confirmMdp: yup
      .string()
      .optional()
      .oneOf(
        [yup.ref('nouveauMdp')],
        '*Les mots de passe doivent être identiques'
      )
      .matches(
        passwordRegEx,
        '*12 caractères, composé de chiffres, lettres et caractères spéciaux.'
      ),
  },
  [['nouveauMdp', 'nouveauMdp']]
);

export { schema };
