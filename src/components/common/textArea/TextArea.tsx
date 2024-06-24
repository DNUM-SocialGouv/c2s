import { useFormContext } from 'react-hook-form';
import './TextArea.css';

interface FormTextAreaProps {
  label: string;
  name: string;
  isDisabled?: boolean;
}

export const TextArea: React.FC<FormTextAreaProps> = ({
  label,
  name,
  isDisabled,
}) => {
  const { register, formState } = useFormContext();
  const message = formState.errors[`${name}`]?.message;
  return (
    <div className="form__input">
      <label htmlFor={name} className="form__label form_textarea_label--margin">
        {label}
      </label>
      <textarea
        id={name}
        className="form__textarea form_textarea--style fr-input"
        disabled={isDisabled === true}
        {...register(name)}
      />
      {formState!.errors && message && (
        <p className="error-message pt-2" style={{ color: 'red' }}>
          {message!.toString()}
        </p>
      )}
    </div>
  );
};
