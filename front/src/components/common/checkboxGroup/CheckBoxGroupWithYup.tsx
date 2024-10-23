import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useId } from 'react';
import './checkBoxGroupWithYup.css';

interface CheckboxGroupWithYupProps {
  name: string;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  classes?: string;
}

export const CheckboxGroupWithYup: React.FC<CheckboxGroupWithYupProps> = ({
  name,
  options,
  classes = '',
}) => {
  const { register, setValue, watch, formState } = useFormContext();
  const id = useId();
  const message = formState.errors[name]?.message;

  const selectedValues = watch(name) || [];

  const handleCheckboxChange = (value: string) => {
    let updatedValues;
    if (selectedValues.includes(value)) {
      updatedValues = selectedValues.filter((val: string) => val !== value);
    } else {
      updatedValues = [...selectedValues, value];
    }
    setValue(name, updatedValues);
  };

  return (
    <>
      <div className={`form-group checkbox-group-with-yup ${classes}`}>
        {options.map((option) => (
          <div key={option.value} className="fr-checkbox-group">
            <input
              type="checkbox"
              id={`checkbox-${id}-${option.value}`}
              value={option.value}
              {...register(name)}
              onChange={() => handleCheckboxChange(option.value)}
              checked={selectedValues.includes(option.value)}
              disabled={option.disabled}
            />
            <label
              className="fr-label fr-label--inline-block"
              htmlFor={`checkbox-${id}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {formState.errors && message && (
        <p className="error-message pt-2 mb-0">{message.toString()}</p>
      )}
    </>
  );
};
