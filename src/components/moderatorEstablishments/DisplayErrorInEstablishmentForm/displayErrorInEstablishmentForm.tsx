//display errors from backend
import { AddEstablishmentErrorResponseData } from '@/domain/ModeratorEstablishments';

export const displayErrorInEstablishmentForm = (
  keys: string[],
  errors: AddEstablishmentErrorResponseData
) => {
  return (
    keys &&
    keys.map((key) => {
      return (
        errors[key] && (
          <p key={key} className="error-message pt-2" style={{ color: 'red' }}>
            {errors[key]}
          </p>
        )
      );
    })
  );
};
