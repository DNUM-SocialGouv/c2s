interface RadioGroupProps {
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  selectedValue,
  onChange,
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
            name="groupe"
            checked={selectedValue === option.value}
            value={option.value}
            onChange={onChange}
            disabled={isDisabled === true}
          />
          <label className="fr-label" htmlFor={`radio-${option.value}`}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};
export default RadioGroup;
