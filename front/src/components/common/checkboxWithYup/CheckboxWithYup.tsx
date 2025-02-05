import { useId } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface CheckboxWithYupProps {
  name: string;
  label: string;
  classes?: string;
}

export const CheckboxWithYup = ({
  name,
  label,
  classes,
}: CheckboxWithYupProps) => {
  const { control } = useFormContext();
  const id = useId();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className={`checkbox-with-yup mt-0 ${classes}`}>
      <div className="fr-checkbox-group">
        <input
          type="checkbox"
          id={`checkbox-${id}`}
          {...field}
          checked={!!field.value}
          className="mr-2"
        />
        <label className="flex items-center" htmlFor={`checkbox-${id}`}>
          {label}
        </label>
      </div>

      {error && <p className="error-message pt-2 mb-0">{error.message}</p>}
    </div>
  );
};
