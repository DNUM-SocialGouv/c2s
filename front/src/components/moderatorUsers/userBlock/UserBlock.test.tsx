import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserBlock } from './UserBlock.tsx';
import { User } from '../../../domain/ModerateurUsers.ts';

describe('UserBlock', () => {
  const user: User = {
    locSiren: null,
    dateMaj: null,
    nom: '',
    email: '',
    telephone: '',
    adresse: null,
    codePostal: null,
    ville: null,
    groupe: null,
    siteWeb: null,
    ocAddedtoLPA: false,
    prenom: '',
    societe: 'My compagny',
    fonction: '',
    adresseOrganisation: null,
    codePostalOrganisation: null,
    villeOrganisation: null,
    sirenOrganisation: null,
    emailOrganisation: null,
    siteWebOrganisation: null,
    typeOrganisation: 'Type of My Compagny',
    telephoneOrganisation: null,
    pointAccueil: false,
  };

  it('should handle validation', async () => {
    // GIVEN
    const onDataUpdate = jest.fn();

    render(<UserBlock user={user} onDataUpdate={onDataUpdate} />);

    // WHEN
    fireEvent.click(screen.getByText(`Valider l'inscription`));

    // THEN
    expect(screen.getByText(`Valider l'inscription`)).toBeInTheDocument();
    expect(
      screen.getByText(/Vous êtes sur le point de valider /)
    ).toBeInTheDocument();
  });

  it('should handle refusal', async () => {
    // GIVEN
    const onDataUpdate = jest.fn();

    render(<UserBlock user={user} onDataUpdate={onDataUpdate} />);
    // WHEN
    fireEvent.click(screen.getByText(`Refuser l'inscription`));
    // THEN
    expect(screen.getByText(`Refuser l'inscription`)).toBeInTheDocument();
    expect(
      screen.getByText(/Vous êtes sur le point de refuser /)
    ).toBeInTheDocument();
  });
});
