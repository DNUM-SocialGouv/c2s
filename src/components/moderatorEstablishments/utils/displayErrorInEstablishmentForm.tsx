import { AddEstablishmentErrorResponseData } from '@/domain/ModeratorEstablishments';

export const displayErrorInEstablishmentForm = (
  key: keyof AddEstablishmentErrorResponseData,
  errors: AddEstablishmentErrorResponseData
) => {
  return (
    errors[key] && (
      <p className="error-message pt-2" style={{ color: 'red' }}>
        {errors[key]}
      </p>
    )
  );
};
