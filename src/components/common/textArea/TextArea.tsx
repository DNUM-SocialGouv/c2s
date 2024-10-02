import { useFormContext } from 'react-hook-form';
import './TextArea.css';

interface FormTextAreaProps {
  label: string;
  name: string;
  isDisabled?: boolean;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<FormTextAreaProps> = ({
  label,
  name,
  isDisabled,
  onKeyPress,
}) => {
  const { register, formState } = useFormContext();
  const message = formState.errors[`${name}`]?.message;
  return (
    <div className="form__input">
      <label htmlFor={name} className="form__label form_textarea_label--margin">
        {label}
      </label>
      <textarea
        onKeyUp={onKeyPress}
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
