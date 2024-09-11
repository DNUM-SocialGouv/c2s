import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormInputProps {
  label: string;
  hint?: string;
  name: string;
  inputType?: string;
  isDisabled?: boolean;
  classes?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  testId?: string;
}

export const FormInputWithYup: React.FC<FormInputProps> = ({
  label,
  hint,
  name,
  inputType = 'text',
  isDisabled = false,
  classes = '',
  testId = name,
  onKeyPress,
}) => {
  const { register, formState } = useFormContext();
  const message = formState.errors[name]?.message;

  return (
    <div className={`form-group ${classes}`}>
      <label className="fr-label" htmlFor={name}>
        {label}
        {hint && <span className="fr-hint-text">{hint}</span>}
      </label>
      <input
        onKeyDown={onKeyPress}
        className="fr-input"
        type={inputType}
        id={name}
        disabled={isDisabled}
        data-testid={testId}
        {...register(name)}
      />
      {formState.errors && message && (
        <p className="error-message pt-2" style={{ color: 'red' }}>
          {message.toString()}
        </p>
      )}
    </div>
  );
};
