import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ModeratorAccueilMetrics } from './ModeratorAccueilMetrics';
import { ModeratorAccueilMetricsTypes } from '../../../domain/ModerateurAccueil';
import { ActiveTabProvider } from '../../../contexts/ActiveTabContext';
import { MODERATEUR_ACCUEIL } from '../../../wording';

describe('ModeratorAccueilMetrics', () => {
  const setup = (metrics: ModeratorAccueilMetricsTypes) => {
    return render(
      <ActiveTabProvider>
        <ModeratorAccueilMetrics metrics={metrics} />
      </ActiveTabProvider>
    );
  };

  it('should render the correct data for active users', () => {
    const metrics = {
      membresAModerer: [],
      membresActifCount: 10,
      organisationsActifCount: 19,
      pointAccueilActifCount: 5,
    };

    setup(metrics);

    expect(
      screen.getByText(MODERATEUR_ACCUEIL.countActiveUsers(10))
    ).toBeInTheDocument();
  });

  it('should render the correct data for active organisations', () => {
    const metrics = {
      membresAModerer: [],
      membresActifCount: 10,
      organisationsActifCount: 19,
      pointAccueilActifCount: 5,
    };

    setup(metrics);

    expect(
      screen.getByText(MODERATEUR_ACCUEIL.countActiveOrganisations(19))
    ).toBeInTheDocument();
  });

  it("should render the correct data for points d'accueil", () => {
    const metrics = {
      membresAModerer: [],
      membresActifCount: 0,
      organisationsActifCount: 0,
      pointAccueilActifCount: 8,
    };

    setup(metrics);

    expect(
      screen.getByText(MODERATEUR_ACCUEIL.countActiveEstablishments(8))
    ).toBeInTheDocument();
  });
});
