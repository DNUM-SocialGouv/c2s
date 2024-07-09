import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormInputProps {
  label: string;
  hint?: string;
  name: string;
  inputType?: string | undefined;
  isDisabled?: boolean;
  classes?: string;
}

export const FormInputWithYup: React.FC<FormInputProps> = ({
  label,
  hint,
  name,
  inputType,
  isDisabled,
  classes,
}) => {
  const { register, formState } = useFormContext();
  const message = formState.errors[`${name}`]?.message;
  return (
    <div className={`form-group ${classes}`}>
      <label className="fr-label" htmlFor={name}>
        {label}
        {hint && <span className="fr-hint-text">{hint}</span>}
      </label>
      <input
        className="fr-input"
        type={inputType ? inputType : 'text'}
        id={name}
        disabled={isDisabled === true}
        {...register(name)}
      />
      {formState!.errors && message && (
        <p className="error-message pt-2" style={{ color: 'red' }}>
          {message!.toString()}
        </p>
      )}
    </div>
  );
};
