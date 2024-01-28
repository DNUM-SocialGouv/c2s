import { FieldApi } from "@tanstack/react-form";
import { InputHTMLAttributes, ReactNode } from "react";
import { FieldInfo } from "../FieldInfo/FieldInfo";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    field: FieldApi<any, any, any, any>
    label: string;
    required?: boolean;
    hint?: string;
    valid?: string | string[];
    disabled?: boolean;
    icon?: ReactNode;
    type?: string;
}



const FormInput: React.FC<InputProps> = ({
                                             label,
                                             required=true,
                                             hint,
                                             valid,
                                             disabled,
                                             icon,
                                             type = 'text',
                                             field,
                                             ...inputProps
                                         }) => {

    return (
        <div className={`fr-input-group ${disabled ? ' fr-input-group--disabled' : ''} ${field.state.meta.touchedErrors && field.state.meta.touchedErrors.length>0 ? "fr-input-group--error" : valid ? "fr-input-group--valid" : ''}`}>
            <label className="fr-label" htmlFor={field.name}>
                {label}
                {required && <span className="text-red-500"> *</span>}
                {hint && <span className="fr-hint-text">{hint}</span>}
            </label>

            <div className={`fr-input-wrap${icon ? ' fr-icon-' + icon : ''}`}>
                {icon && <div className="fr-icon">{icon}</div>}

                <input
                    className={`fr-input${field.state.meta.touchedErrors ? ' fr-input--error' : valid ? ' fr-input--valid' : ''}`}
                    aria-describedby={field.state.meta.touchedErrors ? `${field.name}-messages` : undefined}
                    id={field.name}
                    name={field.name}
                    type={type}
                    disabled={disabled}
                    {...inputProps}
                />
            </div>

            <FieldInfo.Error field={field}/>
            <FieldInfo.Valid field={field} show={valid} />
        </div>
    );
};

export default FormInput;
