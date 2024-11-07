import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AddEstablishmentForm } from './AddEstablishmentForm.tsx';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../RequestInterceptor.tsx';

describe('AddEstablishmentForm', () => {
  it('should render the form', () => {
    // GIVEN
    const onFormSubmit = jest.fn();

    // WHEN
    render(<AddEstablishmentForm onFormSubmit={onFormSubmit} />);

    // THEN
    expect(screen.getByTestId('establishment-form')).toBeInTheDocument();
  });

  it('should display errors message when the form contain errors', async () => {
    // GIVEN
    const onFormSubmit = jest.fn();
    render(<AddEstablishmentForm onFormSubmit={onFormSubmit} />);

    // WHEN
    fireEvent.submit(screen.getByTestId('establishment-form'));

    // THEN
    await waitFor(() => {
      expect(screen.getByText('*La ville est requise')).toBeInTheDocument();
      expect(
        screen.getByText('*Le code postal est requis')
      ).toBeInTheDocument();
      expect(screen.getByText(`*L'adresse est requise`)).toBeInTheDocument();
      expect(screen.getByText(`*L'email est requis`)).toBeInTheDocument();
      expect(
        screen.getByText(`*Le numéro SIREN est requis`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`*Le nom de l'établissement est requis`)
      ).toBeInTheDocument();
    });
  });

  it('should not display errors when form is correctly filled', async () => {
    // GIVEN
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    const values = {
      nom: 'C2S',
      adresse: '2 rue Floréam',
      adresse2: '',
      adresse3: '',
      ville: 'Ma ville',
      codePostal: '93100',
      cedex: '',
      siren: '7756777',
      email: 'c2s@c2s.com',
      telephone: '0102030405',
    };
    mock.onPost('/moderateur/etablissements/update', values).reply(500);
    const onFormSubmit = jest.fn();
    render(<AddEstablishmentForm onFormSubmit={onFormSubmit} />);

    // WHEN
    fireEvent.change(screen.getByLabelText(`Nom de l'établissement *`), {
      target: { value: 'C2S' },
    });
    fireEvent.change(screen.getByLabelText('Adresse *'), {
      target: { value: '2 rue Floréam' },
    });
    fireEvent.change(screen.getByLabelText('Ville *'), {
      target: { value: 'Ma ville' },
    });
    fireEvent.change(screen.getByLabelText('Code postal *'), {
      target: { value: '93100' },
    });
    fireEvent.change(screen.getByLabelText(/Siren/), {
      target: { value: '7756777' },
    });
    fireEvent.change(screen.getByLabelText(`E-mail de l'organisation *`), {
      target: { value: 'c2s@c2s.com' },
    });
    fireEvent.change(screen.getByLabelText(`Téléphone de l'organisation`), {
      target: { value: '0102030405' },
    });

    await waitFor(() => {
      fireEvent.submit(screen.getByTestId('establishment-form'));
    });

    // THEN
    await waitFor(() => {
      expect(
        screen.queryByText('*La ville est requise')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('*Le code postal est requis')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`*L'adresse est requise`)
      ).not.toBeInTheDocument();
      expect(screen.queryByText(`*L'email est requis`)).not.toBeInTheDocument();
      expect(
        screen.queryByText(`*Le numéro SIREN est requis`)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`*Le nom de l'établissement est requis`)
      ).not.toBeInTheDocument();
    });
  });
});
