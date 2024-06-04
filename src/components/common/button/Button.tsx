import './Button.css';

interface ButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button = ({
  label,
  variant = 'primary',
  onClick,
  icon,
  iconPosition = 'left',
  className = '',
}: ButtonProps) => {
  let buttonClassName = 'fr-btn';
  if (variant === 'secondary') {
    buttonClassName += ' fr-btn--secondary';
  }
  if (icon && !label) {
    buttonClassName += ` ${icon}`;
  } else if (icon) {
    buttonClassName += ' fr-btn--icon-' + iconPosition;
  }

  buttonClassName += ` ${className}`;

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      title={!label ? icon : undefined}
    >
      {icon && iconPosition === 'left' && label && (
        <span
          className={`fr-icon-${icon} mr-3 fr-icon--sm`}
          aria-hidden="true"
        ></span>
      )}
      {label && <span>{label}</span>}
      {icon && iconPosition === 'right' && label && (
        <span
          className={`fr-icon-${icon} ml-3 fr-icon--sm`}
          aria-hidden="true"
        ></span>
      )}
      {icon && !label && (
        <span
          className={`fr-icon-${icon} fr-icon--sm`}
          aria-hidden="true"
        ></span>
      )}
    </button>
  );
};
