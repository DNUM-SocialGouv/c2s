import { render, screen } from '@testing-library/react';
import {
  OcWelcomePageContext,
  OcWelcomePageProvider,
} from './OcWelcomeContext';
import '@testing-library/jest-dom';
import { ocWelcomeAPIResponse } from '@/utils/tests/ocWelcome.fixtures';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';
import { OcAccueil } from '@/components/ocAccueil/OcAccueil';

describe('OcWelcomePageProvider', () => {
  it('should render children', () => {
    // GIVEN
    render(
      <OcWelcomePageProvider>
        {[<div key="1">Child Component</div>]}
      </OcWelcomePageProvider>
    );
    // THEN
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should provide message and links values', () => {
    // WHEN
    render(
      <OcWelcomePageContext.Provider
        value={{
          message: ocWelcomeMessageMapper(ocWelcomeAPIResponse.messageAccueil),
          setMessage: () => undefined,
          links: ocWelcomeAPIResponse.ressourceFiles,
          setLinks: () => undefined,
        }}
      >
        {[
          <div key="1">
            <OcAccueil />
          </div>,
        ]}
      </OcWelcomePageContext.Provider>
    );

    // THEN
    expect(screen.getByText(/Bienvenu OC 2/)).toBeInTheDocument();
    expect(screen.getByText('Test_fichier_1')).toBeInTheDocument();
    expect(screen.getByText('Test_fichier_1')).toBeInTheDocument();
  });
});
