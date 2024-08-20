import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ValidationPage from './ValidationPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ValidationPage', () => {
  it('renders the success message', () => {
    // GIVEN
    render(
      <BrowserRouter>
        <ValidationPage />
      </BrowserRouter>
    );
    // THEN
    expect(
      screen.getByText("Votre demande d'adhésion a bien été reçue")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Elle sera traitée dans les meilleurs délais par notre équipe de modérateurs.'
      )
    ).toBeInTheDocument();
  });
});
