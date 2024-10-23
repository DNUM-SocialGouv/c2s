import './Input.css';
import { useFormContext } from 'react-hook-form';

interface CheckboxOption {
  id: string;
  label: string;
  checked?: boolean;
}

interface CheckboxGroupProps {
  legend: string;
  name: string;
  options: CheckboxOption[];
}

export const CheckboxGroup = ({
  legend,
  name,
  options,
}: CheckboxGroupProps) => {
  const { register, formState } = useFormContext();
  const message = formState.errors[name]?.message;

  return (
    <fieldset
      className="fr-fieldset"
      aria-labelledby={`${name}-legend ${name}-messages`}
    >
      {legend && (
        <legend
          className="fr-fieldset__legend--regular fr-fieldset__legend fr-fieldset__legend--400"
          id={`${name}-legend`}
        >
          {legend}
        </legend>
      )}
      {options.map((option) => (
        <div key={option.id} className="fr-fieldset__element">
          <div className="fr-checkbox-group">
            <input
              type="checkbox"
              id={option.id}
              checked={option.checked}
              value={option.id}
              aria-describedby={`${option.id}-messages`}
              {...register(name)}
            />
            <label className="fr-label" htmlFor={option.id}>
              {option.label}
            </label>
            <div
              className="fr-messages-group"
              id={`${option.id}-messages`}
              aria-live="assertive"
            ></div>
          </div>
        </div>
      ))}
      {formState!.errors && message && (
        <p className="error-message pt-2" style={{ color: 'red' }}>
          {message!.toString()}
        </p>
      )}
    </fieldset>
  );
};
