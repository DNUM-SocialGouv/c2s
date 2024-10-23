import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { OcHistoryTable } from './OcHistoryTable.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import MockAdapter from 'axios-mock-adapter';
import { mockApiResponse } from './OcHistoryTable.fixture.ts';

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

beforeAll(() => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
  mock
    .onGet('/partenaire/operations?page=0&size=10')
    .reply(200, mockApiResponse);
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('OcHistoryTable', () => {
  it('should render the table with the correct data', async () => {
    // GIVEN
    render(<OcHistoryTable />);

    // THEN
    await waitFor(() => {
      expect(screen.getAllByText('18/09/2024 - 13h36')[0]).toBeInTheDocument();
      expect(screen.getAllByText('c2s user oc')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Mes informations')[0]).toBeInTheDocument();
      expect(
        screen.getAllByText(
          "Modification de l'OC [MCRN - MUTUELLE CHEMINOTS NANTES]"
        )[0]
      ).toBeInTheDocument();
    });
  });

  it('should display pagination when there are multiple pages', async () => {
    // GIVEN
    render(<OcHistoryTable />);

    // THEN
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  it('should not display pagination when there is only one page', async () => {
    // GIVEN
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    mock
      .onGet('/partenaire/operations?page=0&size=10')
      .reply(200, { count: 5, list: mockApiResponse.list });

    render(<OcHistoryTable />);

    // THEN
    await waitFor(() => {
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });
  });
});
