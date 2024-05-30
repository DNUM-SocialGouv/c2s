import React from 'react';

interface HoneypotProps {
  honeypotName: string;
  onHoneypotChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Honeypot: React.FC<HoneypotProps> = ({
  honeypotName,
  onHoneypotChange,
}) => {
  return (
    <div style={{ display: 'none' }}>
      <label htmlFor={honeypotName} aria-hidden="true">
        Do not fill this out if you are a human
      </label>
      <input
        type="text"
        id={honeypotName}
        name={honeypotName}
        tabIndex={-1}
        autoComplete="off"
        onChange={onHoneypotChange}
        aria-hidden="true"
      />
    </div>
  );
};
