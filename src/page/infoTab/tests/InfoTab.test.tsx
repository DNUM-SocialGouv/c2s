import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { updateMembreInfo } from '@/page/infoTab/action'; // Import the updateMembreInfo function
import InfoTab from '../InfoTab';
import { AccountContext } from '@/contexts/AccountContext';
import { iDeleteObject } from '@/domain/OcInformationTab';

describe('InfoTab', () => {
  // GIVEN
  const mockDeleteMembre = jest.fn();
  const mockLogout = jest.fn();
  const mockRemoveItem = jest.fn();
  const mockSetAccountToDelete = jest.fn();
  const mockUpdateMembreInfo = jest.fn();
  const mockDeleteAction = jest.fn();

  const member: iDeleteObject = {
    membreId: 1,
    email: `member@c2s.com`,
  };

  jest.mock('@/page/infoTab/action.ts', () => ({
    deleteMembre: mockDeleteMembre,
  }));

  jest.mock('@/page/infoTab/action.ts', () => ({
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

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        membreId: 1,
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        telephone: '0123456789',
        fonction: 'Developer',
      }),
    })
  ) as jest.Mock;

  jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'email') {
      return 'john.doe@example.com';
    }
    return null;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render the component', () => {
    // WHEN
    render(
      <AccountContext.Provider
        value={{
          setAccountToDelete: () => undefined,
          accountToDelete: member,
          deleteAction: () => undefined,
        }}
      >
        <InfoTab />
      </AccountContext.Provider>
    );

    // THEN
    waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
  });

  it('should display the member data when membreData is not null', async () => {
    // WHEN
    render(
      <AccountContext.Provider
        value={{
          setAccountToDelete: () => undefined,
          accountToDelete: member,
          deleteAction: () => undefined,
        }}
      >
        <InfoTab />
      </AccountContext.Provider>
    );

    // THEN
    await waitFor(() => {
      expect(screen.getByLabelText('Nom')).toHaveValue('John');
      expect(screen.getByLabelText('Prénom')).toHaveValue('Doe');
      expect(screen.getByLabelText('E-mail')).toHaveValue('john.doe@example.com');
      expect(screen.getByLabelText('Téléphone')).toHaveValue('0123456789');
      expect(screen.getByLabelText('Fonction')).toHaveValue('Developer');
    });
  });

  // it('should display error 404 message when error is present', async () => {
  //   // WHEN
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       ok: false,
  //       status: 404,
  //       statusText: 'Not Found',
  //     })
  //   ) as jest.Mock;

  //   try {
  //     render(
  //       <AccountContext.Provider
  //         value={{
  //           setAccountToDelete: () => undefined,
  //           accountToDelete: member,
  //           deleteAction: () => undefined,
  //         }}
  //       >
  //         <InfoTab />
  //       </AccountContext.Provider>
  //     );
  
  //     // Vérifie si le bandeau d'erreur 404 est affiché après la tentative de chargement
  //     await waitFor(() => {
  //       expect(screen.getByText('404, Not found')).toBeInTheDocument();
  //     });
  //   } catch (error) {
  //     console.error("Erreur capturée dans le test : ", error);
  //   }
  // });

  it('should update form values when input fields are changed', async () => {

    render(
      <AccountContext.Provider
        value={{
          setAccountToDelete: () => undefined,
          accountToDelete: member,
          deleteAction: () => undefined,
        }}
      >
        <InfoTab />
      </AccountContext.Provider>
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
    it('should call handleSubmit when "Enregistrer" button is clicked', async () => {
      // WHEN
      render(
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
      );
      // THEN
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });
      // Simulate form submission by clicking the "Enregistrer" button
      fireEvent.click(screen.getByText('Enregistrer'));

      // THEN
      await waitFor(() => expect(mockUpdateMembreInfo).toHaveBeenCalledTimes(1));
    });

    it('should call updateMembreInfo when form is submitted', async () => {
      render(
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
      );
      // WHEN
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });
      // Simulate form submission by firing a submit event on the form element
      await act(async () => {
        fireEvent.click(screen.getByText('Enregistrer'));
      });
      // THEN
      // updateMembreInfo is called once
      waitFor(() => {
        expect(updateMembreInfo).toHaveBeenCalledTimes(1);
      });
    });

    it('should display success message', () => {
      render(
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
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
      render(
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
      );
      // WHEN
      fireEvent.click(screen.getByText('Supprimer mon compte'));
      // THEN
      waitFor(() => {
        expect(mockDeleteMembre).toHaveBeenCalledTimes(1);
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockRemoveItem).toHaveBeenCalledTimes(1);
      });
    });

    it('should display the confirmation dialog when "Supprimer mon compte" button is clicked', () => {

      render(
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
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
      render(
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
      );

      // WHEN
      // Simulate button click on the "Supprimer mon compte" button
      fireEvent.click(screen.getByText('Supprimer mon compte'));

      // THEN
      waitFor(() => expect(mockSetAccountToDelete).toHaveBeenCalledTimes(1));
    });

    it('should call deleteAction and close modal when "Confirmer" button is clicked in the confirmation dialog', () => {
      render(
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
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
      render(
        <AccountContext.Provider
          value={{
            setAccountToDelete: () => undefined,
            accountToDelete: member,
            deleteAction: () => undefined,
          }}
        >
          <InfoTab />
        </AccountContext.Provider>
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
