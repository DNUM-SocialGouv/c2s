import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ocWelcomeFixture } from '../../utils/tests/ocWelcome.fixtures.ts';
import { ocWelcomeMessageMapper } from '../../utils/ocWelcomeMessage.mapper.ts';
import { OcAccueil } from '../../components/ocAccueil/OcAccueil.tsx';
import {
  OcWelcomePageProvider,
  OcWelcomePageContext,
} from '../OcWelcomeContext.tsx';
import { LoginContext } from '../LoginContext.tsx';

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
      <LoginContext.Provider
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
      </LoginContext.Provider>
    );

    // THEN
    expect(screen.getByText(/Bienvenu OC 2/)).toBeInTheDocument();
    expect(screen.getByText('Test_fichier_1')).toBeInTheDocument();
    expect(screen.getByText('Test_fichier_1')).toBeInTheDocument();
  });
});
