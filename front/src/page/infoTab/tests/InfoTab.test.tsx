import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { updateMembreInfo } from '../action.ts'; // Import the updateMembreInfo function
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import InfoTab from '../InfoTab.tsx';
import { thunk } from 'redux-thunk';
import { AccountContext } from '../../../contexts/AccountContext.tsx';
import { iDeleteObject } from '../../../domain/OcInformationTab.ts';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('InfoTab', () => {
  // GIVEN
  const mockDispatch = jest.fn();
  const mockDeleteMembre = jest.fn();
  const mockLogout = jest.fn();
  const mockRemoveItem = jest.fn();
  const mockSetAccountToDelete = jest.fn();
  const mockUpdateMembreInfo = jest.fn();
  const mockDeleteAction = jest.fn();

  const member: iDeleteObject = {
    membreId: '1',
    email: `member@c2s.com`,
  };

  jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
  }));

  jest.mock('../action.ts', () => ({
    deleteMembre: mockDeleteMembre,
  }));

  jest.mock('../action.ts', () => ({
    ...jest.requireActual('@/page/infoTab/action.ts'),
    updateMembreInfo: jest.fn(),
  }));

  jest.mock('@react-keycloak/web', () => ({
    useKeycloak: () => ({
      keycloak: {
        logout: mockLogout,
      },
    }),
  }));

  const mockMembreData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    // GIVEN
    const store = mockStore({
      membreInfo: {
        membreData: mockMembreData,
        error: null,
      },
    });
    // WHEN
    render(
      <Provider store={store}>
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
      </Provider>
    );

    // THEN
    waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
  });

  it('should display the member data when membreData is not null', () => {
    // GIVEN
    const store = mockStore({
      membreInfo: {
        membreData: mockMembreData,
        error: null,
      },
    });
    // WHEN
    render(
      <Provider store={store}>
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
      </Provider>
    );

    // THEN
    waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
    });
  });

  it('should display error message when error is present', () => {
    // GIVEN
    const store = mockStore({
      membreInfo: {
        membreData: mockMembreData,
        error: 'An error occurred',
      },
    });

    // WHEN
    render(
      <Provider store={store}>
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
      </Provider>
    );
    // THEN
    expect(
      screen.getByText('Erreur: veuilliez réessayer ultérieurement')
    ).toBeInTheDocument();
  });

  it('should update form values when input fields are changed', async () => {
    // GIVEN
    const store = mockStore({
      membreInfo: {
        membreData: mockMembreData,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
      </Provider>
    );
    // WHEN
    // Simulate input field change
    waitFor(() =>
      fireEvent.change(screen.getByLabelText('telephone'), {
        target: { value: '0120242526' },
      })
    );
    // THEN
    waitFor(() =>
      expect(screen.getByLabelText('telephone')).toHaveValue('0120242526')
    );
  });

  describe('Submit', () => {
    it('should call handleSubmit when "Enregistrer" button is clicked', () => {
      // GIVEN
      const store = mockStore({
        membreInfo: {
          membreData: mockMembreData,
          error: null,
        },
      });
      // WHEN
      render(
        <Provider store={store}>
          <AccountContext.Provider
            value={{
              setAccountToDelete: () => undefined,
              accountToDelete: member,
              deleteAction: () => undefined,
            }}
          >
            <InfoTab />
          </AccountContext.Provider>
        </Provider>
      );
      // THEN
      // Simulate form submission by clicking the "Enregistrer" button
      fireEvent.click(screen.getByText('Enregistrer'));

      // THEN
      waitFor(() => expect(mockUpdateMembreInfo).toHaveBeenCalledTimes(1));
    });

    it('should call updateMembreInfo when form is submitted', () => {
      // GIVEN
      const store = mockStore({
        membreInfo: {
          membreData: mockMembreData,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <AccountContext.Provider
            value={{
              setAccountToDelete: () => undefined,
              accountToDelete: member,
              deleteAction: () => undefined,
            }}
          >
            <InfoTab />
          </AccountContext.Provider>
        </Provider>
      );
      // WHEN
      // Simulate form submission by firing a submit event on the form element
      fireEvent.click(screen.getByText('Enregistrer'));
      // THEN
      // updateMembreInfo is called once
      waitFor(() => {
        expect(updateMembreInfo).toHaveBeenCalledTimes(1);
      });
    });

    it('should display success message', () => {
      // GIVEN
      const store = mockStore({
        membreInfo: {
          membreData: mockMembreData,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <AccountContext.Provider
            value={{
              setAccountToDelete: () => undefined,
              accountToDelete: member,
              deleteAction: () => undefined,
            }}
          >
            <InfoTab />
          </AccountContext.Provider>
        </Provider>
      );
      // WHEN
      // Simulate form submission by firing a submit event on the form element
      fireEvent.click(screen.getByText('Enregistrer'));
      // THEN
      // updateMembreInfo is called once with the correct arguments
      waitFor(() => {
        expect(
          screen.getByText('Vos informations ont bien été mises à jour')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Delete', () => {
    it('should call useDeleteAccount when "Supprimer mon compte" button is clicked', () => {
      // GIVEN
      const store = mockStore({
        membreInfo: {
          membreData: mockMembreData,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <AccountContext.Provider
            value={{
              setAccountToDelete: () => undefined,
              accountToDelete: member,
              deleteAction: () => undefined,
            }}
          >
            <InfoTab />
          </AccountContext.Provider>
        </Provider>
      );
      // WHEN
      fireEvent.click(screen.getByText('Supprimer mon compte'));
      // THEN
      waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDeleteMembre).toHaveBeenCalledTimes(1);
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockRemoveItem).toHaveBeenCalledTimes(1);
      });
    });

    it('should display the confirmation dialog when "Supprimer mon compte" button is clicked', () => {
      // GIVEN
      const store = mockStore({
        membreInfo: {
          membreData: mockMembreData,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <AccountContext.Provider
            value={{
              setAccountToDelete: () => undefined,
              accountToDelete: member,
              deleteAction: () => undefined,
            }}
          >
            <InfoTab />
          </AccountContext.Provider>
        </Provider>
      );
      // WHEN
      fireEvent.click(screen.getByText('Supprimer mon compte'));

      // THEN
      waitFor(() =>
        expect(
          screen.getByText(
            /Vous êtes sur le point de supprimer votre compte de l'espace Partenaire/
          )
        ).toBeInTheDocument()
      );
    });

    it('should call setAccountToDelete and open modal when "Supprimer mon compte" button is clicked', () => {
      // GIVEN
      const store = mockStore({
        membreInfo: {
          membreData: mockMembreData,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <AccountContext.Provider
            value={{
              setAccountToDelete: () => undefined,
              accountToDelete: member,
              deleteAction: () => undefined,
            }}
          >
            <InfoTab />
          </AccountContext.Provider>
        </Provider>
      );

      // WHEN
      // Simulate button click on the "Supprimer mon compte" button
      fireEvent.click(screen.getByText('Supprimer mon compte'));

      // THEN
      waitFor(() => expect(mockSetAccountToDelete).toHaveBeenCalledTimes(1));
    });

    it('should call deleteAction and close modal when "Confirmer" button is clicked in the confirmation dialog', () => {
      // GIVEN
      const store = mockStore({
        membreInfo: {
          membreData: mockMembreData,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <AccountContext.Provider
            value={{
              setAccountToDelete: () => undefined,
              accountToDelete: member,
              deleteAction: () => undefined,
            }}
          >
            <InfoTab />
          </AccountContext.Provider>
        </Provider>
      );

      // WHEN

      // Simulate button click on the "Supprimer mon compte" button
      fireEvent.click(screen.getByText('Supprimer mon compte'));

      // Simulate button click on the "Confirmer" button in the confirmation dialog
      waitFor(() => fireEvent.click(screen.getByText('Confirmer')));

      // THEN
      waitFor(() => expect(mockDeleteAction).toHaveBeenCalledTimes(1));
    });

    it('should close the confirmation dialog when "Annuler" button is clicked in the confirmation dialog', () => {
      // GIVEN
      const store = mockStore({
        membreInfo: {
          membreData: mockMembreData,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <AccountContext.Provider
            value={{
              setAccountToDelete: () => undefined,
              accountToDelete: member,
              deleteAction: () => undefined,
            }}
          >
            <InfoTab />
          </AccountContext.Provider>
        </Provider>
      );

      // WHEN

      // Simulate button click on the "Supprimer mon compte" button to open the confirmation dialog
      fireEvent.click(screen.getByText('Supprimer mon compte'));
      // Simulate button click on the "Annuler" button in the confirmation dialog
      waitFor(() => fireEvent.click(screen.getByText('Annuler')));

      // THEN
      waitFor(() =>
        expect(
          screen.getByText(
            /Vous êtes sur le point de supprimer votre compte de l'espace Partenaire/
          )
        ).not.toBeInTheDocument()
      );
    });
  });
});
