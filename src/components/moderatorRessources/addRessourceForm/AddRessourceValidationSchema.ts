import * as yup from 'yup';

export const schema = yup.object().shape({
  category: yup.string().required('Category is required'),
  filePath: yup.string().required('File is required'),
});
