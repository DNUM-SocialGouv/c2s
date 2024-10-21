interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ className = '' }) => {
  return (
    // FIXME: className is undefined
    <div className={`oc__separator--padding ${className}`}>
      <svg
        height="1"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100%" y2="0" stroke="#DDDDDD" />
      </svg>
    </div>
  );
};
