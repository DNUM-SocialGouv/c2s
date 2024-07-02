import React from 'react';
import { useFormContext } from 'react-hook-form';

interface RadioGroupWithYupProps {
  name: string;
  isDisabled?: boolean;
  options: Array<{
    value: string;
    label: string;
  }>;
  classes?: string;
}

export const RadioGroupWithYup: React.FC<RadioGroupWithYupProps> = ({
  name,
  isDisabled,
  options,
  classes,
}) => {
  const { register, formState } = useFormContext();
  const message = formState.errors[`${name}`]?.message;
  return (
    <div className={`form-group ${classes}`}>
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
      {formState!.errors && message && (
        <p className="error-message pt-2">{message!.toString()}</p>
      )}
    </div>
  );
};
