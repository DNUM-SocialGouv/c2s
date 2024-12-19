import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ModeratorAccueil } from '../../components/moderatorAccueil/ModeratorAccueil';
import { LoginContext } from '../../contexts/LoginContext';
import { axiosInstance } from '../../RequestInterceptor';
import { MODERATEUR_ACCUEIL } from '../../wording';
import type { ModeratorAccueilMetricsTypes } from '../../domain/ModerateurAccueil';

jest.mock('../../RequestInterceptor', () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

describe('ModeratorAccueil', () => {
  const mockMetrics: ModeratorAccueilMetricsTypes = {
    membresAModerer: ['Laurent Duc', 'Marie Dupont'],
    membresActifCount: 5,
    organisationsActifCount: 3,
    pointAccueilActifCount: 2,
  };

  const renderComponent = (isLogged = false) =>
    render(
      <LoginContext.Provider
        value={{
          isLogged,
          setIsLogged: () => undefined,
        }}
      >
        <ModeratorAccueil />
      </LoginContext.Provider>
    );

  beforeEach(() => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockMetrics,
    });
  });

  it('should render the Loader while data is loading', () => {
    renderComponent();

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should display the correct title and badge in the Tuile component', async () => {
    renderComponent(true);

    await waitFor(() => {
      expect(
        screen.getByText(
          MODERATEUR_ACCUEIL.newMembersNumber(
            mockMetrics.membresAModerer.length
          )
        )
      ).toBeInTheDocument();
      expect(screen.getByText(MODERATEUR_ACCUEIL.badge)).toBeInTheDocument();
    });
  });

  it('should display the correct title when there are no members to moderate', async () => {
    const mockNoMembersMetrics: ModeratorAccueilMetricsTypes = {
      membresAModerer: [],
      membresActifCount: 5,
      organisationsActifCount: 3,
      pointAccueilActifCount: 2,
    };

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockNoMembersMetrics,
    });

    renderComponent(true);

    await waitFor(() => {
      expect(
        screen.getByText(MODERATEUR_ACCUEIL.newMembersNumber(0))
      ).toBeInTheDocument();
    });
  });
});
