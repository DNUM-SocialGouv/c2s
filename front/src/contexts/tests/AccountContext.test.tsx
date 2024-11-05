import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AccountContext } from '../AccountContext.tsx';
import { iDeleteObject } from '../../domain/OcInformationTab.ts';

describe('AccountContext', () => {
  // GIVEN
  const mockDispatch = jest.fn();
  const mockDeleteMembre = jest.fn();
  const mockLogout = jest.fn();
  const mockRemoveItem = jest.fn();

  const member: iDeleteObject = {
    membreId: 1,
    email: `member@c2s.com`,
  };

  jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
  }));

  jest.mock('../../page/infoTab/action.ts', () => ({
    deleteMembre: mockDeleteMembre,
  }));

  jest.mock('@react-keycloak/web', () => ({
    useKeycloak: () => ({
      keycloak: {
        logout: mockLogout,
      },
    }),
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the children', () => {
    // WHEN
    render(
      <AccountContext.Provider
        value={{
          setAccountToDelete: () => undefined,
          accountToDelete: member,
          deleteAction: () => undefined,
        }}
      >
        <div>Child Component</div>
      </AccountContext.Provider>
    );

    // THEN
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should set accountToDelete when calling setAccountToDelete', () => {
    // WHEN
    let context: {
      setAccountToDelete: React.Dispatch<iDeleteObject | null>;
      accountToDelete: iDeleteObject | null;
      deleteAction: () => void;
    } | null = {
      setAccountToDelete: () => undefined,
      accountToDelete: null,
      deleteAction: () => undefined,
    };
    render(
      <AccountContext.Provider
        value={{
          setAccountToDelete: () => undefined,
          accountToDelete: null,
          deleteAction: () => undefined,
        }}
      >
        <AccountContext.Consumer>
          {(ctx) => {
            context = ctx;
            return (
              <button onClick={() => context?.setAccountToDelete(member)}>
                Set Account To Delete
              </button>
            );
          }}
        </AccountContext.Consumer>
      </AccountContext.Provider>
    );

    fireEvent.click(screen.getByText('Set Account To Delete'));

    // THEN
    expect(screen.getByText('Set Account To Delete')).toBeInTheDocument();
    expect(screen.getByText('Set Account To Delete').textContent).toEqual(
      'Set Account To Delete'
    );
    waitFor(() => {
      expect(context?.accountToDelete).toEqual(member);
    });
  });

  it('should call deleteAction when calling deleteAction', () => {
    // WHEN
    render(
      <AccountContext.Provider
        value={{
          setAccountToDelete: () => undefined,
          accountToDelete: null,
          deleteAction: () => undefined,
        }}
      >
        <AccountContext.Consumer>
          {(context) => (
            <button onClick={context?.deleteAction}>Delete Account</button>
          )}
        </AccountContext.Consumer>
      </AccountContext.Provider>
    );

    fireEvent.click(screen.getByText('Delete Account'));

    // THEN
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDeleteMembre).toHaveBeenCalledTimes(1);
      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    });
  });
});
