import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import RequestResetPasswordPage from '@/page/requestResetPasswordPage/RequestResetPasswordPage.tsx';
import { FETCH_RESET_PASSWORD_REQUEST } from '@/page/requestResetPasswordPage/Contants.ts';

const middlewares = [thunk];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockStore = configureStore(middlewares);
describe('Request Reset Passwword Page', () => {
  it('When I click on reset button FETCH_RESET_PASSWORD_REQUEST action will be dispatched', async () => {
    const store = mockStore({
      requestResetPasswordState: {
        email: '',
        sentRequestSuccess: false,
        isLoading: false,
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RequestResetPasswordPage />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.change(screen.getByLabelText('Identifiant ou e-mail'), {
      target: { value: 'test@example.com' },
    });

    const submitButton = screen.getByText('Réinitialiser votre mot de passe');

    await fireEvent.click(submitButton);
    // Assertions to check if your actions were dispatched
    await waitFor(() =>
      expect(store.getActions()[0].type).toBe(FETCH_RESET_PASSWORD_REQUEST)
    );
  });

  it("When FETCH_RESET_PASSWORD_REQUEST dispatched the submit button doesn't show up", async () => {
    const store = mockStore({
      requestResetPasswordState: {
        email: 'test@example.com',
        sentRequestSuccess: false,
        isLoading: true,
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RequestResetPasswordPage />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.queryByText('Réinitialiser votre mot de passe')
    ).not.toBeInTheDocument();
  });
  it('When reset button is clicked, confirmation  message and back button showed up ', async () => {
    const store = mockStore({
      requestResetPasswordState: {
        email: 'test@example.com',
        sentRequestSuccess: true,
        isLoading: false,
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RequestResetPasswordPage />
        </MemoryRouter>
      </Provider>
    );
    const successMessage = screen.queryByText(
      /Si cet identifiant correspond bien à un compte, un e-mail vous a été envoyé pour vous permettre de réinitialiser votre mot de passe./i
    )?.parentNode;

    expect(successMessage).toHaveClass('fr-alert fr-alert--success');
    expect(
      screen.queryByText('Réinitialiser votre mot de passe')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Retour à la connexion' })
    ).toBeInTheDocument();
  });
  it('When there is error, error message is displayed ', async () => {
    const store = mockStore({
      requestResetPasswordState: {
        email: null,
        sentRequestSuccess: false,
        isLoading: false,
        error: 'error',
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RequestResetPasswordPage />
        </MemoryRouter>
      </Provider>
    );
    const errorMessage = screen.queryByText(
      /Erreur : Veuillez réassyer ultérieurement/i
    )?.parentNode;
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('fr-alert fr-alert--error fr-alert--sm');
  });
});
