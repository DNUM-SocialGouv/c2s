import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { EtablissementTabHeader } from './EtablissementTabHeader.tsx';

import { axe, toHaveNoViolations } from 'jest-axe';
import { OcEtablissementsContext } from '@/contexts/ocEtablissementsTab/OcEtablissementsContext.tsx';

expect.extend(toHaveNoViolations);

describe('EtablissementTabHeader', () => {
  const SiegeData = {
    nom: 'Test Company',
    locSiren: '775659923',
    email: 'test@example.com',
    siteWeb: 'https://example.com',
    adresse: '123 Test Street',
    groupe: 'oc',
    telephone: '1234567890',
    ocAddedtoLPA: true,
    dateMaj: '31 décembre 2021',
    totalPAitems: 0,
  };

  const filters = {
    searchQuery: '',
    region: '',
    department: '',
  };

  it('should render component wihtout violation', async () => {
    // GIVEN
    const { container } = render(
      <OcEtablissementsContext.Provider
        value={{
          count: 0,
          setCount: () => {},
          siegeData: SiegeData,
          setSiegeData: () => {},
          pointsAccueilData: [],
          setPointsAccueilData: () => {},
          filters: filters,
          setFilters: () => {},
          isPAListLoading: false,
          setIsPAListLoading: () => {},
        }}
      >
        <EtablissementTabHeader />
      </OcEtablissementsContext.Provider>
    );

    const results = await axe(container);

    // THEN
    expect(results).toHaveNoViolations();
  });

  it('should render the component correctly', () => {
    // WHEN
    render(
      <OcEtablissementsContext.Provider
        value={{
          count: 0,
          setCount: () => {},
          siegeData: SiegeData,
          setSiegeData: () => {},
          pointsAccueilData: [],
          setPointsAccueilData: () => {},
          filters: filters,
          setFilters: () => {},
          isPAListLoading: false,
          setIsPAListLoading: () => {},
        }}
      >
        <EtablissementTabHeader />
      </OcEtablissementsContext.Provider>
    );

    // THEN
    expect(screen.getByText('Mes établissements')).toBeInTheDocument();
    expect(
      screen.getByText(/Mise à jour le 31 décembre 2021/)
    ).toBeInTheDocument();
  });
});
