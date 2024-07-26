import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ocWelcomeFixture } from '@/utils/tests/ocWelcome.fixtures';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';
import { OcAccueil } from '@/components/ocAccueil/OcAccueil';
import {
  OcWelcomePageProvider,
  OcWelcomePageContext,
} from '../OcWelcomeContext';
import { OcLoginContext } from '../OCLoginContext';

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
      <OcLoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <OcWelcomePageContext.Provider
          value={{
            message: ocWelcomeMessageMapper(ocWelcomeFixture.messageAccueil),
            setMessage: () => undefined,
            links: ocWelcomeFixture.ressourceFiles,
            setLinks: () => undefined,
          }}
        >
          {[
            <div key="1">
              <OcAccueil />
            </div>,
          ]}
        </OcWelcomePageContext.Provider>
      </OcLoginContext.Provider>
    );

    // THEN
    expect(screen.getByText(/Bienvenu OC 2/)).toBeInTheDocument();
    expect(screen.getByText('Test_fichier_1')).toBeInTheDocument();
    expect(screen.getByText('Test_fichier_1')).toBeInTheDocument();
  });
});
