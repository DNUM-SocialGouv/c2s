import '@testing-library/jest-dom';
import { LoginContext } from '@/contexts/LoginContext';
import { ModeratorHistory } from './ModeratorHistory';
import { render, screen } from '@testing-library/react';

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

    it('should show the history table', async () => {
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Section')).toBeInTheDocument();
      expect(screen.getByText('Utilisateur')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });
});
