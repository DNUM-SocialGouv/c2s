import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { EstablishmentInformations } from './EstbalishmentInformations.tsx';
import { Establishment } from '../../../domain/ModeratorEstablishments.ts';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
// FIXME: waitFor
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
mock.onGet('/moderateur/etablissements/update').reply(200, {
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
  const setup = () => {
    render(
      <EstablishmentInformations
        establishment={establishment}
        onFormReset={() => {}}
        onEstablishmentUpdated={() => {}}
        onEstablishmentDeleted={() => {}}
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

    // const ocRadio = screen.getByLabelText('Organisme complémentaire');
    // const caisseRadio = screen.getByLabelText("Caisse d'assurance maladie");
    // expect(ocRadio).toBeChecked();
    // expect(caisseRadio).not.toBeChecked();
  });

  it('should call onFormReset when the submit button is clicked', async () => {
    const onFormReset = jest.fn();
    setup();

    const submitButton = screen.getByText('Enregistrer');
    // WHEN
    fireEvent.click(submitButton);
    // THEN
    await waitFor(() => {
      expect(onFormReset).toHaveBeenCalled();
    });
  });

  it('should call onEstablishmentUpdated when the form is submitted', async () => {
    const onEstablishmentUpdated = jest.fn();
    setup();

    const submitButton = screen.getByText('Enregistrer');
    // WHEN
    fireEvent.click(submitButton);
    // THEN
    await waitFor(() => expect(onEstablishmentUpdated).toHaveBeenCalled());
  });

  it('should call onEstablishmentDeleted when the delete button is clicked', async () => {
    const onEstablishmentDeleted = jest.fn();
    setup();

    const deleteButton = screen.getByText('Supprimer');
    // WHEN
    fireEvent.click(deleteButton);
    // THEN
    await waitFor(() => expect(onEstablishmentDeleted).toHaveBeenCalled());
  });
});
