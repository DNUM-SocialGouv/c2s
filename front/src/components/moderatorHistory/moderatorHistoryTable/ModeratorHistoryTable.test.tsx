import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ModeratorHistoryTable } from './ModeratorHistoryTable.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import MockAdapter from 'axios-mock-adapter';
import { mockApiResponse } from './ModeratorHistoryTable.fixture.ts';

let mock: MockAdapter;

beforeAll(() => {
  mock = new MockAdapter(axiosInstance, { delayResponse: 200 });

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

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

describe('ModeratorHistoryTable', () => {
  it('should render the table with the correct data', async () => {
    mock
      .onGet('/moderateur/operations/search?page=0&size=10')
      .reply(200, mockApiResponse);

    render(<ModeratorHistoryTable />);

    await waitFor(() => {
      expect(screen.getAllByText('18/09/2024 - 13h36')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Test Modérateur')[0]).toBeInTheDocument();
      expect(
        screen.getAllByText('Moderation etablissements')[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(
          "Modification de l'OC [MCRN - MUTUELLE CHEMINOTS NANTES]"
        )[0]
      ).toBeInTheDocument();
    });
  });

  it('should display pagination when there are multiple pages', async () => {
    mock
      .onGet('/moderateur/operations/search?page=0&size=10')
      .reply(200, { list: mockApiResponse.list, count: 25 });

    render(<ModeratorHistoryTable />);

    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  it('should not display pagination when there is only one page', async () => {
    mock
      .onGet('/moderateur/operations/search?page=0&size=10')
      .reply(200, { list: mockApiResponse.list.slice(0, 5), count: 5 });

    render(<ModeratorHistoryTable />);

    await waitFor(() => {
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });
});
