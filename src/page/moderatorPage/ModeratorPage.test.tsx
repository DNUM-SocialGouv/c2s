import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ModeratorPage } from './ModeratorPage';
import { axiosInstance } from '@/RequestInterceptor';
import { apiResponse } from '@/components/moderatorContent/tests/moderatorContent.fixture';
import MockAdapter from 'axios-mock-adapter';

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

  it('should navigate to Accueil tab when button is cliked', async () => {
    // Given
    render(<ModeratorPage />);
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