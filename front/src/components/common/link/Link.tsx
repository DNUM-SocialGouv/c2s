import React from 'react';

interface LinkProps {
  label?: string;
  href?: string;
  icon?: string;
  target?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  children?: React.ReactNode;
}

export const Link = ({
  label,
  href,
  icon,
  iconPosition = 'right',
  className = '',
  onClick,
  target = '_self',
  children = '',
}: LinkProps) => {
  let linkClassName = 'fr-link';
  if (icon && !label) {
    linkClassName += ` ${icon}`;
  } else if (icon) {
    linkClassName += ` fr-link--icon-${iconPosition}`;
  }

  linkClassName += ` ${className}`;

  const content = (
    <>
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
      {children}
    </>
  );

  return href ? (
    <a href={href} className={linkClassName} onClick={onClick} target={target}>
      {content}
    </a>
  ) : (
    <button className={`${linkClassName} underline`} onClick={onClick}>
      {content}
    </button>
  );
};
