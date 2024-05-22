import { useState } from 'react';

export const useHoneypot = (honeypotName: string) => {
  const [honeypotValue, setHoneypotValue] = useState('');

  const handleHoneypotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === honeypotName) {
      setHoneypotValue(event.target.value);
    }
  };

  const resetHoneypot = () => {
    setHoneypotValue('');
  };

  return {
    honeypotValue,
    handleHoneypotChange,
    resetHoneypot,
  };
};
