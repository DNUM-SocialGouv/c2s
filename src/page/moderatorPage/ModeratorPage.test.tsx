import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { ModeratorPage } from './ModeratorPage';
import { axiosInstance } from '@/RequestInterceptor';
import { apiResponse } from '@/components/moderatorContent/tests/moderatorContent.fixture';
import MockAdapter from 'axios-mock-adapter';
import fetchMock from 'jest-fetch-mock';

fetchMock.dontMock();

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

describe('ModeratorPage', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mock.onGet('/moderateur/message/oc').reply(200, {
      users: apiResponse,
    });
  });

  it('should render 7 tabs with their titles', () => {
    // Given
    render(<ModeratorPage />);
    // When
    const tabList = screen.getAllByRole('presentation');
    // Then
    expect(tabList.length).toEqual(7);
  });

  it('should navigate to Accueil tab when button is clicked', async () => {
    // Given
    await act(async () => {
      render(<ModeratorPage />);
    });

    // When
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]); // Accueil est present dans le fil d'ariane

    // Then
    const tabTitle = await waitFor(() =>
      screen.getByText('Cet onglet est en cours de développement')
    );
    expect(tabTitle).toBeInTheDocument();
  });
});
