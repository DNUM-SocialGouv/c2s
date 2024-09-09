//update backend errors in errors object on type
import { AddEstablishmentErrorResponseData } from '@/domain/ModeratorEstablishments';

export const handleInputChange = (
  fieldNames: string[],
  setErrors: React.Dispatch<
    React.SetStateAction<AddEstablishmentErrorResponseData>
  >
) => {
  setErrors((prevErrors) => {
    const newErrors = { ...prevErrors };
    fieldNames.forEach((fieldName) => {
      delete newErrors[fieldName];
    });
    return newErrors;
  });
};
