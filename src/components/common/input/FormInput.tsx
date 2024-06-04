interface FormInputProps {
  label: string;
  name: string;
  value: string;
  isDisabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  isError = false,
  errorMessage = '',
  isDisabled,
}) => {
  return (
    <div className="form-group">
      <label className="fr-label" htmlFor={name}>
        {label}
      </label>
      <input
        className={`fr-input ${isError ? 'fr-input--error' : ''}`}
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled === true}
      />
      {isError && (
        <div id={`${name}-desc`} className="fr-error-text">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FormInput;
