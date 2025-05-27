import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { EstablishmentInformations } from './EstbalishmentInformations.tsx';
import { Establishment } from '../../../domain/ModeratorEstablishments.ts';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import {
  ModeratorEstablishmentsContext,
  ModeratorEstablishmentContextType,
} from '../../../contexts/ModeratorEstablishmentsContext.tsx';

const mockValue: ModeratorEstablishmentContextType = {
  establishements: [],
  setEstablishements: jest.fn(),
  searchTerm: '',
  setSearchTerm: jest.fn(),
  establishmentType: 'ORGANISME_COMPLEMENTAIRE',
  setEstablishmentType: jest.fn(),
  region: '',
  setRegion: jest.fn(),
  departement: '',
  setDepartement: jest.fn(),
  activeOC: 0,
  setActiveOC: jest.fn(),
  pointsAccueilCount: 0,
  setPointsAccueilCount: jest.fn(),
  closeModal: jest.fn(),
  openModal: jest.fn(),
  isModalOpen: false,
  setIsModalOpen: jest.fn(),
  goToNextModalStep: jest.fn(),
  currentEstablishmentSiren: null,
  setCurrentEstablishmentSiren: jest.fn(),
  modalStep: 1,
  userSocieteData: null,
  setUserSocieteData: jest.fn(),
};

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

const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
mock.onPut('/moderateur/etablissements/update').reply(200, {
  data: {
    societe: 'Mutuelles de France Loire-Forez',
    ville: 'BOEN',
    codePostal: '42130',
    adresse: '44 rue de la Chaux',
    siren: '405390238',
    emailEntreprise: 'test@gmail.com',
    siteWeb: '',
    telephone: '0562470220',
    pointAccueil: false,
    groupe: 'ORGANISME_COMPLEMENTAIRE',
  },
});

describe('EstablishmentInformations', () => {
  const onEstablishmentUpdated = jest.fn();
  const onFormReset = jest.fn();
  const onEstablishmentDeleted = jest.fn();
  const mockOpenModal = jest.fn();

  const setup = () => {
    render(
      <ModeratorEstablishmentsContext.Provider
        value={{
          ...mockValue,
          openModal: mockOpenModal,
        }}
      >
        <EstablishmentInformations
          establishment={establishment}
          onFormReset={onFormReset}
          onEstablishmentUpdated={onEstablishmentUpdated}
          onEstablishmentDeleted={onEstablishmentDeleted}
        />
      </ModeratorEstablishmentsContext.Provider>
    );
  };

  it('should call openModal with the correct argument when Supprimer is clicked', () => {
    setup();
    const deleteButton = screen.getByRole('button', { name: /supprimer/i });

    fireEvent.click(deleteButton);

    expect(mockOpenModal).toHaveBeenCalledTimes(1);
    expect(mockOpenModal).toHaveBeenCalledWith(establishment.locSiren);
  });

  it('should render the component without accessibility violations', async () => {
    setup();

    const form = screen.getByTestId('establishment-form');
    expect(await axe(form)).toHaveNoViolations();
  });

  it('should render all FormInputWithYup and RadioGroupWithYup components with correct values', () => {
    setup();

    expect(screen.getByLabelText("Nom de l'organisme")).toHaveValue(
      establishment.nom
    );
    expect(screen.getByLabelText('Adresse du siège')).toHaveValue(
      establishment.adresse
    );
    expect(screen.getByLabelText('Siren')).toHaveValue(establishment.locSiren);
    expect(screen.getByLabelText("Email de l'organisme")).toHaveValue(
      establishment.email
    );
    expect(screen.getByLabelText("Téléphone de l'organisme")).toHaveValue(
      establishment.telephone
    );
    expect(screen.getByLabelText('Site Web')).toHaveValue(
      establishment.siteWeb
    );
  });

  it('should call onFormReset when the submit button is clicked', async () => {
    setup();

    const submitButton = screen.getByText('Enregistrer');
    // WHEN
    fireEvent.click(submitButton);
    // THEN
    await waitFor(() => {
      expect(onFormReset).toHaveBeenCalled();
    });
  });
});
