import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './Header.tsx';

describe('Header', () => {
  it('should render the header with the correct title', () => {
    // GIVEN
    const isAuthenticated = true;
    const userName = 'John Doe';
    const onClick = jest.fn();

    // WHEN
    render(
      <Header
        isAuthenticated={isAuthenticated}
        userName={userName}
        onClick={onClick}
      />
    );

    // THEN
    expect(screen.getByText(/Ministère/)).toBeInTheDocument();
    expect(screen.getByText(/des solidarités/)).toBeInTheDocument();
    expect(screen.getByText(/et de la santé/)).toBeInTheDocument();
    expect(
      screen.getByText(/Complémentaire santé solidaire/)
    ).toBeInTheDocument();
  });

  it('should render the logout button when authenticated', () => {
    // GIVEN
    const isAuthenticated = true;
    const userName = 'John Doe';
    const onClick = jest.fn();

    // WHEN
    render(
      <Header
        isAuthenticated={isAuthenticated}
        userName={userName}
        onClick={onClick}
      />
    );

    // THEN
    expect(screen.getByText(/Déconnexion/)).toBeInTheDocument();
  });

  it('should not render the logout button when not authenticated', () => {
    // GIVEN
    const isAuthenticated = false;
    const userName = 'John Doe';
    const onClick = jest.fn();

    // WHEN
    render(
      <Header
        isAuthenticated={isAuthenticated}
        userName={userName}
        onClick={onClick}
      />
    );

    // THEN
    expect(screen.queryByText(/Déconnexion/)).not.toBeInTheDocument();
  });
});
