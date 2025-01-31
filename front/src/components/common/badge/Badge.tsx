interface BadgeProps {
  title?: string;
  variant?: 'success' | 'error' | 'info' | 'warning' | 'new';
  icon?: boolean;
}

export const Badge = ({
  title,
  variant = 'info',
  icon = false,
}: BadgeProps) => {
  return (
    <p
      className={`fr-badge fr-badge--${variant} ${icon ? '' : 'fr-badge--no-icon'}`}
    >
      {title}
    </p>
  );
};
