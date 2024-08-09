import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useId } from 'react';
import './RadioGroupWithYup.css';

interface RadioGroupWithYupProps {
  name: string;
  isDisabled?: boolean;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
    checked?: boolean;
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
  const id = useId();
  const message = formState.errors[`${name}`]?.message;
  return (
    <div className={`form-group ${classes}`}>
      {options.map((option) => (
        <div key={option.value} className="fr-radio-group">
          <input
            type="radio"
            id={`radio-${id}-${option.value}`}
            value={option.value}
            {...register(name)}
            disabled={isDisabled === true || option.disabled}
          />
          <label
            className="fr-label fr-label--inline-block"
            htmlFor={`radio-${id}-${option.value}`}
          >
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
