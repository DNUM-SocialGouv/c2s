// UserInformations.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { UserInformations } from './UserInformations.tsx';
import { User } from '../../../domain/ModerateurUsers.ts';
import { COMMON } from '../../../wording.ts';

expect.extend(toHaveNoViolations);

const user: User = {
  locSiren: '123456789',
  dateMaj: '2023-01-01',
  nom: 'John Doe',
  email: 'johndoe@example.com',
  telephone: '1234567890',
  adresse: '123 Main St',
  codePostal: '12345',
  ville: 'Anytown',
  groupe: 'Group A',
  siteWeb: 'https://example.com',
  ocAddedtoLPA: true,
  prenom: 'John',
  societe: 'Example Inc.',
  fonction: 'Manager',
  adresseOrganisation: '27 allée Albert Sylvestre',
  codePostalOrganisation: '73000',
  villeOrganisation: 'CHAMBERY',
  sirenOrganisation: '987654321',
  emailOrganisation: 'contact@example.com',
  siteWebOrganisation: 'https://orgexample.com',
  typeOrganisation: 'ORGANISME_COMPLEMENTAIRE',
  telephoneOrganisation: '0987654321',
  pointAccueil: true,
};

describe('UserInformations', () => {
  const setup = () => {
    render(<UserInformations id="test-id" user={user} />);
  };

  it('should render the component without accessibility violations', async () => {
    setup();

    const form = screen.getByRole('form');
    expect(await axe(form)).toHaveNoViolations();
  });

  it('should render all ReadOnlyInput and ReadOnlyRadioGroup components with correct values', () => {
    setup();

    expect(screen.getByLabelText('Société')).toHaveValue(user.societe);
    expect(screen.getByLabelText('Adresse')).toHaveValue(
      '27 allée Albert Sylvestre 73000 Chambery'
    );
    expect(screen.getByLabelText("E-mail de l'organisation")).toHaveValue(
      user.emailOrganisation
    );
    expect(screen.getByLabelText("Téléphone de l'organisation")).toHaveValue(
      user.telephoneOrganisation
    );
    expect(screen.getByLabelText('Site web')).toHaveValue(
      user.siteWebOrganisation
    );

    const ocRadio = screen.getByLabelText(COMMON.oc);
    const caisseRadio = screen.getByLabelText(COMMON.caisse);
    expect(ocRadio).toBeChecked();
    expect(caisseRadio).not.toBeChecked();
  });
});
