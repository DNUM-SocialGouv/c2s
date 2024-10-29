import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { AssociatedPaTable } from './AssociatedPaTable.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import MockAdapter from 'axios-mock-adapter';

const establishmentId = 123;
const mockApiResponse = {
  count: 2,
  list: [
    {
      nom: 'PA 1',
      adresse1: 'Address 1',
      adresse2: 'Address 2',
      adresse3: 'Address 3',
      codePostal: '12345',
      ville: 'City 1',
      cedex: 'Cedex 1',
      email: 'pa1@example.com',
      telephone: '1234567890',
    },
    {
      nom: 'PA 2',
      adresse1: 'Address 4',
      adresse2: 'Address 5',
      adresse3: 'Address 6',
      codePostal: '67890',
      ville: 'City 2',
      cedex: 'Cedex 2',
      email: 'pa2@example.com',
      telephone: '9876543210',
    },
  ],
};



describe('AssociatedPaTable', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), 
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      }),
    });
  });
  
  let mock: MockAdapter;
  beforeEach(async () => {
    mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    mock
      .onGet(
        `/moderateur/etablissements/list?entrepriseId=${establishmentId}&page=0&size=10`
      )
      .reply(200, mockApiResponse);
  });

  afterEach(() => {
    mock.resetHandlers();
  });

  it('should render the table with the correct data', async () => {
    // GIVEN
    render(<AssociatedPaTable establishmentId={establishmentId} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByText('PA 1')).toBeInTheDocument();
      expect(screen.getByText('Address 1')).toBeInTheDocument();
      expect(screen.getByText('Address 2')).toBeInTheDocument();
      expect(screen.getByText('Address 3')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
      expect(screen.getByText('City 1')).toBeInTheDocument();
      expect(screen.getByText('Cedex 1')).toBeInTheDocument();
      expect(screen.getByText('pa1@example.com')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();

      expect(screen.getByText('PA 2')).toBeInTheDocument();
      expect(screen.getByText('Address 4')).toBeInTheDocument();
      expect(screen.getByText('Address 5')).toBeInTheDocument();
      expect(screen.getByText('Address 6')).toBeInTheDocument();
      expect(screen.getByText('67890')).toBeInTheDocument();
      expect(screen.getByText('City 2')).toBeInTheDocument();
      expect(screen.getByText('Cedex 2')).toBeInTheDocument();
      expect(screen.getByText('pa2@example.com')).toBeInTheDocument();
      expect(screen.getByText('9876543210')).toBeInTheDocument();
    });
  });

  it('should display pagination when there are multiple pages', async () => {
    // GIVEN
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    mock
      .onGet(
        `/moderateur/etablissements/list?entrepriseId=${establishmentId}&page=0&size=10`
      )
      .reply(200, { count: 15, list: mockApiResponse });
    
    render(<AssociatedPaTable establishmentId={establishmentId} />);
  
    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });

  it('should not display pagination when there is only one page', async () => {
    // GIVEN
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    mock
      .onGet(
        `/moderateur/etablissements/list?entrepriseId=${establishmentId}&page=0&size=10`
      )
      .reply(200, { count: 5, list: [] });

    render(<AssociatedPaTable establishmentId={establishmentId} />);

    // THEN
    await waitFor(() => {
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });
  });

  it('should handle error when fetching data', async () => {
    // GIVEN
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    mock
      .onGet(
        `/moderateur/etablissements/list?entrepriseId=${establishmentId}&page=0&size=10`
      )
      .reply(500);

    console.error = jest.fn();

    render(<AssociatedPaTable establishmentId={establishmentId} />);

    // THEN
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching data:',
        expect.any(Error)
      );
    });
  });
});
