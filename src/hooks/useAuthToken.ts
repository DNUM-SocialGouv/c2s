import { useState, useEffect } from 'react';

export const useAuthToken = (token: string | undefined) => {
  const [isLogged, setIsLogged] = useState(false);
  const [tokenIsSent, setTokenIsSent] = useState(false);

  useEffect(() => {
    const sendMyToken = async (token: string) => {
      let result: boolean | null = null;

      try {
        const response = await fetch('/api/public/login', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          credentials: 'include',
          body: token,
        });

        if (response.ok) {
          result = true;
          setIsLogged(true);
        } else {
          result = false;
        }
      } catch (error) {
        result = false;
      } finally {
        setTokenIsSent(true);
      }

      return result;
    };

    if (token) {
      sendMyToken(token);
    }
  }, [token]);

  return { isLogged, tokenIsSent };
};
