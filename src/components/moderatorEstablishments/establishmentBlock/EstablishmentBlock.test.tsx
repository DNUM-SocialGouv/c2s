import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { EstablishmentBlock } from './EstablishmentBlock';
import { Establishment } from '@/domain/ModeratorEstablishments';
import { MODERATOR_ESTABLISHMENTS, COMMON } from '@/wording';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('EstablishmentBlock', () => {
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
  };

  it('should render the establishment details', () => {
    render(<EstablishmentBlock establishment={establishment} />);

    expect(screen.getByText(establishment.nom)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${establishment.groupe} • ${COMMON.siren} ${establishment.locSiren}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(MODERATOR_ESTABLISHMENTS.addContact)
    ).toBeInTheDocument();
    expect(screen.getByText('Caroline Solaar')).toBeInTheDocument();
    expect(screen.getByText('Lionel Dupont')).toBeInTheDocument();
    expect(screen.getByText('Karine Dupuis')).toBeInTheDocument();
    expect(screen.getByText(establishment.adresse)).toBeInTheDocument();
    expect(screen.getByText(establishment.email ?? '')).toBeInTheDocument();
    expect(screen.getByText(establishment.telephone ?? '')).toBeInTheDocument();
    expect(screen.getByText(establishment.siteWeb)).toBeInTheDocument();
  });

  it('should render the Accordion components and their content', () => {
    render(<EstablishmentBlock establishment={establishment} />);

    expect(
      screen.getByText(MODERATOR_ESTABLISHMENTS.establishmentInformation)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        MODERATOR_ESTABLISHMENTS.establishmentsNumber(
          establishment.pointAccueilCount
        )
      )
    ).toBeInTheDocument();
  });

  it('should toggle Accordion content when clicked', async () => {
    render(<EstablishmentBlock establishment={establishment} />);

    const establishmentInfoAccordion = screen.getByText(
      MODERATOR_ESTABLISHMENTS.establishmentInformation
    );
    const paTableAccordion = screen.getByText(
      MODERATOR_ESTABLISHMENTS.establishmentsNumber(
        establishment.pointAccueilCount
      )
    );

    fireEvent.click(establishmentInfoAccordion);
    expect(screen.getByTestId('establishment-form')).toBeInTheDocument();

    fireEvent.click(paTableAccordion);
    await waitFor(() => {
      expect(screen.getByTestId('associated-pa-table')).toBeInTheDocument();
    });
  });

  it('should not render email, telephone, or website links if not provided', () => {
    const establishmentWithoutContactInfo = {
      ...establishment,
      email: null,
      telephone: null,
      siteWeb: '',
    };

    render(
      <EstablishmentBlock establishment={establishmentWithoutContactInfo} />
    );

    expect(
      screen.queryByText('contact@mapetiteentreprise.fr')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('0123456789')).not.toBeInTheDocument();
    expect(
      screen.queryByText('www.mutuelle-entrenous.fr')
    ).not.toBeInTheDocument();
  });
});
