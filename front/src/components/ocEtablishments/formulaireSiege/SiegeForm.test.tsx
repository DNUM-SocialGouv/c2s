import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SiegeForm } from './SiegeForm.tsx';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('SiegeForm', () => {
  // const formDataOC = {
  //   nom: 'Test Company',
  //   locSiren: '123456789',
  //   email: 'test@example.com',
  //   siteWeb: 'https://example.com',
  //   adresse: '123 Test Street',
  //   groupe: 'oc',
  //   telephone: '1234567890',
  //   ocAddedtoLPA: true,
  //   dateMaj: '',
  //   totalPAitems: 0,
  // };

  const handleSubmitOC = jest.fn();

  it('should render component wihtout violation', async () => {
    // GIVEN
    const { container } = render(<SiegeForm />);

    // WHEN
    const results = await axe(container);

    // THEN
    expect(results).toHaveNoViolations();
  });

  it('should render the form inputs', () => {
    // GIVEN
    render(<SiegeForm />);
    // THEN
    expect(screen.getByLabelText(`Nom de l'organisme`)).toBeInTheDocument();
    expect(screen.getByLabelText('Siren')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Site web')).toBeInTheDocument();
    expect(screen.getByLabelText('Adresse')).toBeInTheDocument();
    expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Inclure le siège comme un point d'accueil`)
    ).toBeInTheDocument();
  });

  describe('should display error messages', () => {
    beforeEach(() => {
      render(<SiegeForm />);
    });

    it('should display Email error message', () => {
      // GIVEN
      const emailInput = screen.getByLabelText('E-mail');

      // WHEN
      fireEvent.change(emailInput, { target: { value: 'invalid' } });

      // THEN
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('should display Phone error message', () => {
      // GIVEN
      const phoneInput = screen.getByLabelText('Téléphone');

      // WHEN
      fireEvent.change(phoneInput, { target: { value: 'invalid' } });

      // THEN
      expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
    });

    it('should display Site Web error message', () => {
      // GIVEN
      const phoneInput = screen.getByLabelText('Site web');

      // WHEN
      fireEvent.change(phoneInput, { target: { value: 'invalid' } });

      // THEN
      expect(screen.getByText('Invalid web site')).toBeInTheDocument();
    });
  });

  it('should call handleSubmitOC when the form is submitted', () => {
    // GIVEN
    render(<SiegeForm />);
    const form = screen.getByTestId('siege-form');

    // WHEN
    fireEvent.submit(form);

    // THEN
    expect(handleSubmitOC).toHaveBeenCalled();
  });

  it('should display success message when the form is submitted', async () => {
    // GIVEN
    render(<SiegeForm />);
    const form = screen.getByTestId('siege-form');

    // WHEN
    await waitFor(() => {
      fireEvent.submit(form);
    });

    // THEN
    expect(screen.getByText('Le siège est mis à jour.')).toBeInTheDocument();
  });

  it('should display informationMessage', () => {
    // GIVEN
    render(<SiegeForm />);

    // WHEN
    const informationMessage = screen.getByText(
      /Ne pas cocher la case s’il existe déjà un point d’accueil/
    );

    // THEN
    expect(informationMessage).toBeInTheDocument();
  });
});
