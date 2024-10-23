import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useId } from 'react';

interface CheckboxProps {
  name: string;
  label: string;
  isDisabled?: boolean;
  classes?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  isDisabled,
  classes,
}) => {
  const id = useId();
  const { register, formState } = useFormContext();
  const message = formState.errors[`${name}`]?.message;

  return (
    <div className={`form-group ${classes}`} data-testid="checkbox">
      <div className="fr-checkbox-group">
        <input
          type="checkbox"
          id={`checkbox-${id}-${name}`}
          {...register(name)}
          disabled={isDisabled === true}
        />
        <label className="fr-label" htmlFor={`checkbox-${id}-${name}`}>
          {label}
        </label>
      </div>
      {formState!.errors && message && (
        <p className="error-message pt-2">{message!.toString()}</p>
      )}
    </div>
  );
};
