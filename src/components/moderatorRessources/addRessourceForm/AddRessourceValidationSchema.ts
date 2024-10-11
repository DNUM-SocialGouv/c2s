import * as yup from 'yup';

export const schema = yup.object().shape({
  category: yup.string().required('*La catégorie est requise'),
  filePath: yup.string().required('*Le fichier est requis'),
});
