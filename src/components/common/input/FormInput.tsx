import React from 'react';
import { FieldError, UseFormRegister, FieldValues } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldError;
  isDisabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  register,
  errors,
  isDisabled,
}) => {
  return (
    <div className="form-group">
      <label className="fr-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="fr-input"
        type="text"
        id={name}
        {...register(name)}
        disabled={isDisabled === true}
      />
      {errors && <p className="error-message pt-2">{errors.message}</p>}
    </div>
  );
};

export default FormInput;
