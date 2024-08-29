import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { AddEstablishmentForm } from './AddEstablishmentForm';
import { axiosInstance } from '@/RequestInterceptor';

describe('AddEstablishmentForm', () => {
  it('should render the form', () => {
    // GIVEN
    const onFormSubmit = jest.fn();

    // WHEN
    render(<AddEstablishmentForm onFormSubmit={onFormSubmit} />);

    // THEN
    expect(screen.getByTestId('establishment-form')).toBeInTheDocument();
  });

  it('should call onFormSubmit when the form is submitted', async () => {
    // GIVEN
    const onFormSubmit = jest.fn();
    render(<AddEstablishmentForm onFormSubmit={onFormSubmit} />);

    // WHEN
    screen.getByTestId('establishment-form').onsubmit;

    // THEN
    waitFor(() => {
      expect(onFormSubmit).toHaveBeenCalled();
    });
  });

  it('should display an error message when the form submission fails', async () => {
    // GIVEN
    const onFormSubmit = jest.fn();
    render(<AddEstablishmentForm onFormSubmit={onFormSubmit} />);

    jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
      response: { status: 500 },
    });

    // WHEN
    screen.getByTestId('establishment-form').onsubmit;
    // FIXME: est-ce qu'il y a un message d'erreur afficher lors d'un 500 ?
    // THEN
    waitFor(() => {
      expect(screen.getByText('')).toBeInTheDocument();
    });
  });
});
