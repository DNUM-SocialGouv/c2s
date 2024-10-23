import '@testing-library/jest-dom';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { ModeratorHistory } from './ModeratorHistory.tsx';
import { render, screen, waitFor } from '@testing-library/react';

describe('ModeratorHistory', () => {
  describe('ModeratorHistory when front is logged', () => {
    beforeEach(() => {
      render(
        <LoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <ModeratorHistory />
        </LoginContext.Provider>
      );
    });
    it('should render the component', async () => {
      expect(screen.getByText('Historique des actions')).toBeInTheDocument();
    });
  });

  describe('ModeratorHistory when front is logged', () => {
    beforeEach(() => {
      render(
        <LoginContext.Provider
          value={{
            isLogged: false,
            setIsLogged: () => undefined,
          }}
        >
          <ModeratorHistory />
        </LoginContext.Provider>
      );
    });
    it('should render loader', async () => {
      // THEN
      waitFor(() => expect(screen.getByRole('alert')).toBeVisible());
    });
  });
});
