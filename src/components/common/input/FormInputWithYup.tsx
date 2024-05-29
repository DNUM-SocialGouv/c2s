import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  inputType?: string | undefined;
  isDisabled?: boolean;
}

export const FormInputWithYup: React.FC<FormInputProps> = ({
  label,
  name,
  inputType,
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
