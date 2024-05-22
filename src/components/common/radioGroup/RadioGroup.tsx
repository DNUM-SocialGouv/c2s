import React from 'react';
import { UseFormRegister, FieldError, FieldValues } from 'react-hook-form';

interface RadioGroupProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldError;
  isDisabled?: boolean;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  register,
  errors,
  isDisabled,
  options,
}) => {
  return (
    <div className="form-group">
      {options.map((option) => (
        <div key={option.value} className="fr-radio-group">
          <input
            type="radio"
            id={`radio-${option.value}`}
            value={option.value}
            {...register(name)}
            disabled={isDisabled === true}
          />
          <label className="fr-label" htmlFor={`radio-${option.value}`}>
            {option.label}
          </label>
        </div>
      ))}
      {errors && <p className="error-message pt-2">{errors.message}</p>}
    </div>
  );
};

export default RadioGroup;
