interface AlertPros {
  label?: string;
  description?: string;
  type?: 'info' | 'error' | 'success';
}

export const Alert = ({ label, description, type = 'info' }: AlertPros) => {
  let alertClassName = `fr-alert fr-alert--${type}`;

  return (
    <div className={alertClassName}>
      {label && <h3 className="fr-alert__title">{label}</h3>}
      {description && <p>{description}</p>}
    </div>
  );
};
