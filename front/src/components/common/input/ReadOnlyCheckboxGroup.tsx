import './Input.css';
interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}

interface ReadOnlyCheckboxGroupProps {
  legend?: string;
  name: string;
  options: CheckboxOption[];
}

export const ReadOnlyCheckboxGroup = ({
  legend,
  name,
  options,
}: ReadOnlyCheckboxGroupProps) => {
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
              disabled
              type="checkbox"
              id={option.id}
              name={name}
              checked={option.checked}
              readOnly
              aria-describedby={`${option.id}-messages`}
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
      <div
        className="fr-messages-group"
        id={`${name}-messages`}
        aria-live="assertive"
      ></div>
    </fieldset>
  );
};

export default ReadOnlyCheckboxGroup;
