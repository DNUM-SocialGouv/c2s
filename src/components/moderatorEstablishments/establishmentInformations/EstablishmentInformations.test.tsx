import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { EstablishmentInformations } from './EstbalishmentInformations';
import { Establishment } from '@/domain/ModeratorEstablishments';

expect.extend(toHaveNoViolations);

const establishment: Establishment = {
  nom: 'Example Establishment',
  adresse: '123 Main St',
  locSiren: '123456789',
  organisationType: 'ORGANISME_COMPLEMENTAIRE',
  email: 'contact@example.com',
  telephone: '+33123456789',
  siteWeb: 'https://example.com',
};

describe('EstablishmentInformations', () => {
  const setup = () => {
    render(<EstablishmentInformations establishment={establishment} />);
  };

  it('should render the component without accessibility violations', async () => {
    setup();

    const form = screen.getByTestId('establishment-form');
    expect(await axe(form)).toHaveNoViolations();
  });

  it('should render all FormInputWithYup and RadioGroupWithYup components with correct values', () => {
    setup();

    expect(screen.getByLabelText('Nom')).toHaveValue(establishment.nom);
    expect(screen.getByLabelText('Adresse')).toHaveValue(establishment.adresse);
    expect(screen.getByLabelText('Siren')).toHaveValue(establishment.locSiren);
    expect(screen.getByLabelText('Email')).toHaveValue(establishment.email);
    expect(screen.getByLabelText('Téléphone')).toHaveValue(
      establishment.telephone
    );
    expect(screen.getByLabelText('Site Web')).toHaveValue(
      establishment.siteWeb
    );

    const ocRadio = screen.getByLabelText('Organisme complémentaire');
    const caisseRadio = screen.getByLabelText("Caisse d'assurance maladie");
    expect(ocRadio).toBeChecked();
    expect(caisseRadio).not.toBeChecked();
  });
});
