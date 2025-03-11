import { useFormContext } from 'react-hook-form';
import './TextArea.css';

interface FormTextAreaProps {
  label: string;
  name: string;
  isDisabled?: boolean;
  rows?: number;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<FormTextAreaProps> = ({
  label,
  name,
  isDisabled,
  rows,
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
        className="form__textarea form_textarea--style fr-input cursor-auto"
        disabled={isDisabled === true}
        rows={rows}
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
