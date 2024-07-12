import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { EstablishmentInformations } from './EstbalishmentInformations';
import { Establishment } from '@/domain/ModeratorEstablishments';

expect.extend(toHaveNoViolations);

const establishment: Establishment = {
  id: 33,
  locSiren: '405390238',
  dateCrea: 'Sep 2, 2012',
  dateMaj: 'Dec 31, 2021',
  nom: 'Mutuelles de France Loire-Forez',
  email: 'test@gmail.com',
  telephone: '0562470220',
  adresse: '44 rue de la Chaux',
  codePostal: '42130',
  ville: 'BOEN',
  siteWeb: '',
  groupe: 'ORGANISME_COMPLEMENTAIRE',
  pointAccueilCount: 2,
};

describe('EstablishmentInformations', () => {
  const setup = () => {
    render(
      <EstablishmentInformations
        establishment={establishment}
        onFormReset={() => {}}
        onEstablishmentUpdated={() => {}}
      />
    );
  };

  it('should render the component without accessibility violations', async () => {
    setup();

    const form = screen.getByTestId('establishment-form');
    expect(await axe(form)).toHaveNoViolations();
  });

  it('should render all FormInputWithYup and RadioGroupWithYup components with correct values', () => {
    setup();

    expect(screen.getByLabelText('Société')).toHaveValue(establishment.nom);
    expect(screen.getByLabelText('Adresse')).toHaveValue(establishment.adresse);
    expect(screen.getByLabelText('Siren')).toHaveValue(establishment.locSiren);
    expect(screen.getByLabelText("Email de l'organisation")).toHaveValue(
      establishment.email
    );
    expect(screen.getByLabelText("Téléphone de l'organisation")).toHaveValue(
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
