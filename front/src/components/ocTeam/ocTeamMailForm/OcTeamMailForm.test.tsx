import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { OcTeamMailForm } from './OcTeamMailForm.tsx';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { OC_TEAM } from '../../../wording.ts';
import { createRef } from 'react';

expect.extend(toHaveNoViolations);

const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });

describe('OcTeamMailForm', () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    mock.reset();
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  const setup = () => {
    const targetRef = createRef<HTMLDivElement>();
    render(<OcTeamMailForm targetRef={targetRef} />);
  };

  it('should render the component without accessibility violations', async () => {
    setup();
    const form = screen.getByTestId('oc-team-mail-form');
    expect(await axe(form)).toHaveNoViolations();
  });

  it('should show validation error if email is not provided', async () => {
    setup();

    const submitButton = screen.getByRole('button', {
      name: /envoyer une invitation/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("*L'email est requis")).toBeInTheDocument();
    });
  });

  it('should call API and show success message when email is valid', async () => {
    // Adjusting the mock to expect the email in the payload
    mock.onPost('/oc/equipes', { email: 'test@example.com' }).reply(200);

    setup();

    const emailInput = screen.getByLabelText(/e-mail \*/i);
    const submitButton = screen.getByRole('button', {
      name: /envoyer une invitation/i,
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(OC_TEAM.emailConfirmation)).toBeInTheDocument();
    });
  });

  it('should call API and show error message when API call fails', async () => {
    // Adjusting the mock to expect the payload and returning an error response
    mock.onPost('/oc/equipes', { email: 'test' }).reply(400, {
      message: 'Invalid email',
    });

    setup();

    const emailInput = screen.getByLabelText(/e-mail \*/i);
    const submitButton = screen.getByRole('button', {
      name: /envoyer une invitation/i,
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Une erreur s'est produite lors de l'envoi de l'email")
      ).toBeInTheDocument();
    });
  });

  it('should show "email is required" error message on invalid input', async () => {
    setup();

    const submitButton = screen.getByRole('button', {
      name: /envoyer une invitation/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("*L'email est requis")).toBeInTheDocument();
    });
  });

  it('should display a loading message while the form is submitting', async () => {
    // Adjusting the mock to expect the payload and simulate a delay
    mock.onPost('/oc/equipes', { email: 'test@example.com' }).reply(() => {
      return new Promise((resolve) => setTimeout(() => resolve([200]), 1000));
    });

    setup();

    fireEvent.input(screen.getByLabelText(/E-mail \*/), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(
      screen.getByRole('button', { name: /Envoyer une invitation/i })
    );

    expect(
      screen.getByText(/Veuillez patienter, l'envoi est en cours/i)
    ).toBeInTheDocument();
  });
});
