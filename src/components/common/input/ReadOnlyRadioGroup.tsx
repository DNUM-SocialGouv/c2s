import './Input.css';
interface RadioOption {
  id: string;
  label: string;
  checked: boolean;
}

interface ReadOnlyRadioGroupProps {
  legend: string;
  name: string;
  options: RadioOption[];
}

export const ReadOnlyRadioGroup = ({
  legend,
  name,
  options,
}: ReadOnlyRadioGroupProps) => {
  return (
    <fieldset
      className="fr-fieldset w-full"
      aria-labelledby={`${name}-legend ${name}-messages`}
    >
      <legend
        className="fr-fieldset__legend--regular fr-fieldset__legend fr-fieldset__legend--400"
        id={`${name}-legend`}
      >
        {legend}
      </legend>
      {options.map((option) => (
        <div key={option.id} className="fr-fieldset__element">
          <div className="fr-radio-group">
            <input
              disabled
              type="radio"
              id={option.id}
              name={name}
              checked={option.checked}
              readOnly
            />
            <label className="fr-label" htmlFor={option.id}>
              {option.label}
            </label>
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
