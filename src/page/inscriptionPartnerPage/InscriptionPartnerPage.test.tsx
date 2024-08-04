import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InscriptionPartnerPage from './InscriptionPartnerPage.tsx';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
// import { FETCH_SUBMIT_REQUEST } from './Contants.ts';
// FIXME: test commenté car les appels API ne sont pas mockés
const middlewares = [thunk];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockStore = configureStore(middlewares);
describe('Inscription Page', () => {
  // todo: fix test (mock api calls)
  // it('Component renders and dispatches submitFormData action on form submit', async () => {
  //   const store = mockStore({
  //     inscription: {
  //       formData: {
  //         nom: '',
  //         prenom: '',
  //         email: '',
  //         telephone: '',
  //         societe: '',
  //         groupe: 'OC',
  //         siren: '',
  //         fonction: '',
  //         companyName: '',
  //       },
  //       companyInfo: '',
  //       isLoading: false,
  //       isClicked: false,
  //       isLoadingSubmit: false,
  //       error: null,
  //     },
  //   });

  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <InscriptionPartnerPage />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   // Fill in the form
  //   fireEvent.change(screen.getByLabelText('E-mail'), {
  //     target: { value: 'test@example.com' },
  //   });

  //   fireEvent.change(screen.getByLabelText('Nom'), {
  //     target: { value: 'Test' },
  //   });

  //   fireEvent.change(screen.getByLabelText('Prénom'), {
  //     target: { value: 'User' },
  //   });

  //   fireEvent.change(screen.getByLabelText('Téléphone'), {
  //     target: { value: '1234567890' },
  //   });

  //   fireEvent.change(screen.getByLabelText('Société'), {
  //     target: { value: 'Test Company' },
  //   });

  //   fireEvent.change(screen.getByLabelText("Fonction dans l'organisation"), {
  //     target: { value: 'Developer' },
  //   });

  //   // Select radio option for 'groupe'
  //   fireEvent.click(screen.getByLabelText("Organisme complémentaire"));

  //   // Wait for the 'Siren' input to be rendered and fill it
  //   await waitFor(() => {
  //     expect(screen.getByTestId('siren')).toBeInTheDocument();
  //   });

  //   fireEvent.change(screen.getByTestId('siren'), {
  //     target: { value: '123456789' },
  //   });

  //   // Check data agreement checkbox
  //   fireEvent.click(
  //     screen.getByLabelText(
  //       "En soumettant ce formulaire j'autorise la création d'un compte membre, la conservation de ces données pour contact éventuel, consultation et archivage par les administrateurs"
  //     )
  //   );

  //   // Submit the form
  //   const submitButton = screen.getByText("S'inscrire");
  //   fireEvent.click(submitButton);

  //   // Wait for the action to be dispatched and assert
  //   await waitFor(() => {
  //     const actions = store.getActions();
  //     expect(actions).toContainEqual(expect.objectContaining({ type: FETCH_SUBMIT_REQUEST }));
  //   });
  // });
  it('When "Caisse d\'assurance maladie" checked Input siren doesn\'t show up ', async () => {
    const store = mockStore({
      inscription: {
        formData: {
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          societe: '',
          groupe: 'CAISSE',
          siren: '',
          fonction: '',
          companyName: '',
        },
        companyInfo: '',
        isLoading: false,
        isClicked: false,
        isLoadingSubmit: false,
        error: null,
        errorsFromBackend: {},
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <InscriptionPartnerPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByLabelText('Siren')).not.toBeInTheDocument();
  });
  it("When component Loading submit button doesn't show up", async () => {
    const store = mockStore({
      inscription: {
        formData: {
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          societe: '',
          groupe: 'ORGANISME_COMPLEMENTAIRE',
          siren: '',
          fonction: '',
          companyName: '',
        },
        companyInfo: '',
        isLoading: false,
        isClicked: false,
        isLoadingSubmit: true,
        error: null,
        errorsFromBackend: {},
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <InscriptionPartnerPage />
        </MemoryRouter>
      </Provider>
    );

    // Assertions to check if your actions were dispatched
    expect(screen.queryByText("S'inscrire")).not.toBeInTheDocument();
    expect(screen.queryByText('Chargement...')).toBeInTheDocument();
  });
  it('When Siren entered, search company Name', async () => {
    const store = mockStore({
      inscription: {
        formData: {
          nom: 'Martin',
          prenom: '',
          email: '',
          telephone: '',
          societe: '',
          groupe: 'ORGANISME_COMPLEMENTAIRE',
          siren: '',
          fonction: '',
          companyName: '',
        },
        companyInfo: '',
        isLoading: true,
        isClicked: false,
        isLoadingSubmit: false,
        error: null,
        errorsFromBackend: {},
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <InscriptionPartnerPage />
        </MemoryRouter>
      </Provider>
    );

    // Assertions to check if your actions were dispatched
    expect(screen.queryByText("S'inscrire")).not.toBeInTheDocument();
    expect(screen.queryByText('Chargement...')).toBeInTheDocument();
  });
});
