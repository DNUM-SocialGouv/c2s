import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ModeratorPage } from './ModeratorPage.tsx';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import { apiResponse } from '../../components/moderatorContent/tests/moderatorContent.fixture.ts';
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
});
