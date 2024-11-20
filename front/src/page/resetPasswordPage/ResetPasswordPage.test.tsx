import { Provider } from 'react-redux';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import ResetPasswordPage from './ResetPasswordPage.tsx';
import {
  FETCH_RESET_PASSWORD,
  FETCH_RESET_PASSWORD_ERROR,
} from './Contants.ts';
import { thunk } from 'redux-thunk';

describe('<ResetPasswordPage />', () => {
  // Création d'un store Redux mocké
  const middlewares = [thunk];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    resetPasswordState: {
      error: null,
      resetPasswordSuccess: false,
      isLoading: false,
    },
  });
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResetPasswordPage />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByText(/Définition du mot de passe/i)).toBeInTheDocument();
  });

  it('allows entering passwords', () => {
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(
      screen.getByLabelText('Confirmation du nouveau mot de passe'),
      { target: { value: 'Password123!' } }
    );
    expect(screen.getByTestId('password')).toHaveValue('Password123!');
    expect(
      screen.getByLabelText('Confirmation du nouveau mot de passe')
    ).toHaveValue('Password123!');
  });

  it('clears error and dispatches submitConfirmPassword action on form submission when passwords match', async () => {
    // Simuler la saisie des mots de passe
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(
      screen.getByLabelText(/Confirmation du nouveau mot de passe/i),
      { target: { value: 'Password123!' } }
    );

    const submit = screen.getByText('Enregistrer ce mot de passe');
    // Simuler la soumission du formulaire
    fireEvent.click(submit);
    await waitFor(() => {
      expect(store.getActions()[0].type).toBe(FETCH_RESET_PASSWORD_ERROR); //clears error in store
      expect(store.getActions()[1].type).toBe(FETCH_RESET_PASSWORD);
    });
  });

  describe('display error and success', () => {
    it('should displays an error message when there is an error', () => {
      const errorMessage = 'An error occurred.';
      const store = mockStore({
        resetPasswordState: {
          error: errorMessage,
          resetPasswordSuccess: false,
          isLoading: false,
        },
      });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ResetPasswordPage />
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should displays a success message when the password is reset successfully', () => {
      (
        store.getState() as {
          resetPasswordState: { resetPasswordSuccess: boolean };
        }
      ).resetPasswordState.resetPasswordSuccess = true;
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ResetPasswordPage />
          </MemoryRouter>
        </Provider>
      );

      expect(
        screen.getByText(/Votre nouveau mot de passe a bien été enregistré/i)
      ).toBeInTheDocument();
    });
  });
});
