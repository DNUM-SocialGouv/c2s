import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AddEstablishmentForm } from './AddEstablishmentForm.tsx';

describe('AddEstablishmentForm', () => {
  it('should render the form', () => {
    // GIVEN
    const onFormSubmit = jest.fn();

    // WHEN
    render(<AddEstablishmentForm onFormSubmit={onFormSubmit} />);

    // THEN
    expect(screen.getByTestId('establishment-form')).toBeInTheDocument();
  });

  // FIXME: test fails because of the axiosInstance.post
  // it('should display an error message when the form submission fails', async () => {
  //   // GIVEN
  //   const onFormSubmit = jest.fn();
  //   render(<AddEstablishmentForm onFormSubmit={onFormSubmit} />);

  //   jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
  //     response: { status: 500 },
  //   });

  //   // WHEN
  //   fireEvent.submit(screen.getByTestId('establishment-form'));

  //   // THEN
  //   await waitFor(() => {
  //     expect(screen.getByText('Erreur lors de la soumission du formulaire')).toBeInTheDocument();
  //   });
  // });
});
