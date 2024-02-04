interface FormInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange }) => {
    return (
        <div className="form-group">
            <label className="fr-label" htmlFor={name}>{label}</label>
            <input className="fr-input" type="text" id={name} name={name} value={value} onChange={onChange}/>
        </div>
    );
};

export default FormInput;
