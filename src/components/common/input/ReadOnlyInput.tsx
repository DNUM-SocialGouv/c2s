interface ReadOnlyInputProps {
  label: string;
  hint?: string;
  id: string;
  name: string;
  value: string;
}

export const ReadOnlyInput = ({
  label,
  hint,
  id,
  name,
  value,
}: ReadOnlyInputProps) => {
  return (
    <div className="fr-input-group w-full">
      <label className="fr-label" htmlFor={id}>
        {label}
        {hint && <span className="fr-hint-text">{hint}</span>}
      </label>
      <input
        className="fr-input"
        type="text"
        id={id}
        name={name}
        value={value}
        disabled
        aria-readonly="true"
      />
    </div>
  );
};
