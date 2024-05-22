import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  isDisabled?: boolean;
}

export const FormInputWithYup: React.FC<FormInputProps> = ({
  label,
  name,
  isDisabled,
}) => {
  const { register, formState } = useFormContext();
  const message = formState.errors[`${name}`]?.message;
  return (
    <div className="form-group">
      <label className="fr-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="fr-input"
        type="text"
        id={name}
        disabled={isDisabled === true}
        {...register(name)}
      />
      {formState!.errors && message && (
        <p className="error-message pt-2">{message!.toString()}</p>
      )}
    </div>
  );
};
