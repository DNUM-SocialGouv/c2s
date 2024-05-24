import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ModeratorContent } from '../ModeratorContent';
import { axiosInstance } from '@/RequestInterceptor';
import MockAdapter from 'axios-mock-adapter';
import { apiResponse } from './moderatorContent.fixture';

describe('ModeratorContent', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mock.onGet('/moderateur/message/oc').reply(200, {
      oc: apiResponse,
    });
  });

  it('should render tab header', () => {
    // GIVEN
    render(<ModeratorContent />);
    // THEN
    expect(screen.getByText(`Gestion des contenus`)).toBeInTheDocument();
  });

  it('should render caisse text editor header', () => {
    // GIVEN
    render(<ModeratorContent />);
    // THEN
    expect(
      screen.getByText(`Bloc éditorial - Caisses d’assurance Maladie`)
    ).toBeInTheDocument();
  });

  it('should render oc text editor header', () => {
    // GIVEN
    render(<ModeratorContent />);
    // THEN
    expect(
      screen.getByText(`Bloc éditorial - Organismes complémentaires`)
    ).toBeInTheDocument();
  });
});
