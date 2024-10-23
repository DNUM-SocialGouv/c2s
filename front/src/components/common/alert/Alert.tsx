interface AlertPros {
  label?: string;
  description?: string;
  type?: 'info' | 'error' | 'success';
  onClose?: () => void;
}

export const Alert = ({
  label,
  description,
  type = 'info',
  onClose,
}: AlertPros) => {
  const alertClassName = `fr-alert fr-alert--${type}`;

  return (
    <div className={alertClassName}>
      {label && <h3 className="fr-alert__title">{label}</h3>}
      {description && <p>{description}</p>}
      {onClose && (
        <button
          className="fr-btn--close fr-btn"
          title="Masquer le message"
          onClick={onClose}
        >
          Masquer le message
        </button>
      )}
    </div>
  );
};
