import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SiegeForm } from './SiegeForm';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('SiegeForm', () => {
  const formDataOC = {
    nom: 'Test Company',
    locSiren: '123456789',
    email: 'test@example.com',
    siteWeb: 'https://example.com',
    adresse: '123 Test Street',
    groupe: 'oc',
    telephone: '1234567890',
    ocAddedtoLPA: true,
    dateMaj: '',
    totalPAitems: 0,
  };

  const emailError = 'Invalid email';
  const phoneError = 'Invalid phone number';
  const siteWebError = 'Invalid phone number';
  const importantFieldsError = 'Ce champs est obligatoire';

  const handleInputChangeOC = jest.fn();
  const handleSubmitOC = jest.fn();

  it('should render component wihtout violation', async () => {
    // GIVEN
    const { container } = render(
      <SiegeForm
        formDataOC={formDataOC}
        emailError={emailError}
        phoneError={phoneError}
        siteWebError={siteWebError}
        importantFieldsError={importantFieldsError}
        handleInputChangeOC={handleInputChangeOC}
        handleSubmitOC={handleSubmitOC}
      />
    );

    // WHEN
    const results = await axe(container);

    // THEN
    expect(results).toHaveNoViolations();
  });

  beforeEach(() => {
    render(
      <SiegeForm
        formDataOC={formDataOC}
        emailError={emailError}
        phoneError={phoneError}
        siteWebError={siteWebError}
        importantFieldsError={importantFieldsError}
        handleInputChangeOC={handleInputChangeOC}
        handleSubmitOC={handleSubmitOC}
      />
    );
  });
  it('should render the form inputs', () => {
    expect(
      screen.getByLabelText('Dénomination de la société')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Siren')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Site web')).toBeInTheDocument();
    expect(screen.getByLabelText('Adresse')).toBeInTheDocument();
    expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Inclure le siège comme un point d'accueil`)
    ).toBeInTheDocument();
  });

  it('should display error messages', () => {
    // GIVEN
    const emailInput = screen.getByLabelText('E-mail');

    // WHEN
    fireEvent.change(emailInput, { target: { value: 'invalid' } });

    // THEN
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('should call handleSubmitOC when the form is submitted', () => {
    // GIVEN
    const form = screen.getByTestId('siege-form');

    // WHEN
    fireEvent.submit(form);

    // THEN
    expect(handleSubmitOC).toHaveBeenCalled();
  });
});
