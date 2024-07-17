interface LinkProps {
  label?: string;
  href: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Link = ({
  label,
  href,
  icon,
  iconPosition = 'right',
  className = '',
}: LinkProps) => {
  let linkClassName = 'fr-link';
  if (icon && !label) {
    linkClassName += ` ${icon}`;
  } else if (icon) {
    linkClassName += ` fr-link--icon-${iconPosition}`;
  }

  linkClassName += ` ${className}`;

  return (
    <a href={href} className={linkClassName}>
      {icon && iconPosition === 'left' && (
        <span
          className={`fr-icon-${icon} mr-3 fr-icon--sm`}
          aria-hidden="true"
        ></span>
      )}
      {label && <span>{label}</span>}
      {icon && iconPosition === 'right' && (
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
    </a>
  );
};
