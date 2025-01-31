export const displayErrorFromBackend = (
  key: string,
  errors: string | Record<string, string> | null
) => {
  if (!errors || errors === null || typeof errors !== 'object') return null;

  return (
    errors[key] && (
      <p className="error-message pt-2 mb-0" style={{ color: 'red' }}>
        {errors[key]}
      </p>
    )
  );
};
