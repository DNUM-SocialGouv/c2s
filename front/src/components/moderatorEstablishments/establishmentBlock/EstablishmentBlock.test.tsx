import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { EstablishmentBlock } from './EstablishmentBlock.tsx';
import { Establishment } from '../../../domain/ModeratorEstablishments.ts';
import { ModeratorEstablishmentsProvider } from '../../../contexts/ModeratorEstablishmentsContext.tsx';

expect.extend(toHaveNoViolations);

const establishment: Establishment = {
  id: 1,
  locSiren: '309244648',
  dateCrea: 'Sep 2, 2012',
  dateMaj: 'Apr 7, 2023',
  nom: 'ENTRENOUS Mutuelle',
  email: 'contact@mapetiteentreprise.fr',
  telephone: '0123456789',
  adresse: '27 allée Albert Sylvestre',
  codePostal: '73000',
  ville: 'CHAMBERY',
  siteWeb: 'www.mutuelle-entrenous.fr',
  groupe: 'ORGANISME_COMPLEMENTAIRE',
  ocAddedtoLPA: false,
  pointAccueilCount: 7,
  membres: [
    {
      id: 1,
      prenom: 'John',
      nom: 'Doe',
      types: ['GESTION', 'STATISTIQUES'],
    },
    {
      id: 2,
      prenom: 'Jane',
      nom: 'Doe',
      types: ['GESTION'],
    },
  ],
};

const fetchEstablishments = () => {};

describe('EstablishmentBlock', () => {
  const setup = () =>
    render(
      <ModeratorEstablishmentsProvider>
        <EstablishmentBlock
          establishment={establishment}
          fetchEstablishments={fetchEstablishments}
        />
      </ModeratorEstablishmentsProvider>
    );

  it('should render without accessibility violations', async () => {
    const { container } = setup();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render the establishment name', () => {
    setup();
    expect(screen.getByText('ENTRENOUS Mutuelle')).toBeInTheDocument();
  });

  it('should display group information correctly', () => {
    setup();
    expect(
      screen.getByText(/Organisme complémentaire • SIREN 309244648/i)
    ).toBeInTheDocument();
  });

  it('should display members information correctly', () => {
    setup();
    expect(screen.getByText(/Gestion, Statistiques:/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Gestion:/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  });

  it('should display contact information correctly', () => {
    setup();
    expect(
      screen.getByText('contact@mapetiteentreprise.fr')
    ).toBeInTheDocument();
    expect(screen.getByText('0123456789')).toBeInTheDocument();
    expect(screen.getByText(/27 allée Albert Sylvestre/i)).toBeInTheDocument();
    expect(screen.getByText(/73000/i)).toBeInTheDocument();
    expect(screen.getByText(/Chambery/i)).toBeInTheDocument();
  });

  it('should display the website link correctly', () => {
    setup();
    expect(screen.getByText('www.mutuelle-entrenous.fr')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'www.mutuelle-entrenous.fr' })
    ).toHaveAttribute('href', '//www.mutuelle-entrenous.fr');
  });
});
