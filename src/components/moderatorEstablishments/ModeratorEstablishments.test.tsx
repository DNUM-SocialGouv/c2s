import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ModeratorEstablishments } from './ModeratorEstablishments';
import fetchMock from 'jest-fetch-mock';

fetchMock.dontMock();

jest.mock('@react-keycloak/web', () => ({
  useKeycloak: () => ({
    initialized: true,
    keycloak: {
      authenticated: true,
      token: 'fake_token',
      loadUserProfile: () =>
        Promise.resolve({
          id: 'test-id',
          username: 'test-username',
          email: 'test-email',
          firstName: 'test-firstName',
          lastName: 'test-lastName',
        }),
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
      updateToken: jest.fn(),
    },
  }),
}));

describe('ModeratorEstablishments', () => {
  it('should render the component', () => {
    // WHEN
    render(<ModeratorEstablishments />);

    // THEN
    expect(screen.getByText('Moderator Establishments')).toBeInTheDocument();
  });

  it('should show the add establishment form when the button is clicked', () => {
    // GIVEN
    render(<ModeratorEstablishments />);
    const addButton = screen.getByText('Add Establishment');

    // WHEN
    fireEvent.click(addButton);

    // THEN
    expect(screen.getByText('Add New Establishment')).toBeInTheDocument();
  });

  it('should submit the form and display a success message', async () => {
    // GIVEN
    render(<ModeratorEstablishments />);
    const addButton = screen.getByText('Add Establishment');

    fireEvent.click(addButton);

    const establishmentNameInput = screen.getByLabelText('Establishment Name');
    const submitButton = screen.getByText('Submit');

    // WHEN
    fireEvent.change(establishmentNameInput, {
      target: { value: 'Test Establishment' },
    });
    fireEvent.click(submitButton);

    // THEN
    await waitFor(() => {
      expect(
        screen.getByText('Establishment created successfully')
      ).toBeInTheDocument();
    });
  });
});
