import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddModeratorForm } from '../addModeratorForm/AddMorderatorForm.tsx';
import { axiosInstance } from '../../../RequestInterceptor';
import { MODERATOR_MODERATORS } from '../../../wording';
import React from 'react';

jest.mock('../../../RequestInterceptor', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

describe('AddModeratorForm', () => {
  let formRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    formRef = React.createRef<HTMLDivElement>();
  });

  it('renders the form with required fields', () => {
    render(<AddModeratorForm targetRef={formRef} />);

    expect(screen.getByLabelText('Nom *')).toBeInTheDocument();
    expect(screen.getByLabelText('Prénom *')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail *')).toBeInTheDocument();
    expect(screen.getByLabelText('Téléphone *')).toBeInTheDocument();
    expect(screen.getByLabelText('Fonction *')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: MODERATOR_MODERATORS.addNewModeratorBtn,
      })
    ).toBeInTheDocument();
  });

  it('shows success alert when the form is submitted successfully', async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValueOnce({});

    render(<AddModeratorForm targetRef={formRef} />);

    fireEvent.change(screen.getByLabelText('Nom *'), {
      target: { value: 'Clerc' },
    });
    fireEvent.change(screen.getByLabelText('Prénom *'), {
      target: { value: 'Louis' },
    });
    fireEvent.change(screen.getByLabelText('E-mail *'), {
      target: { value: 'louisclerc@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Téléphone *'), {
      target: { value: '0123456789' },
    });
    fireEvent.change(screen.getByLabelText('Fonction *'), {
      target: { value: 'Gestion' },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: MODERATOR_MODERATORS.addNewModeratorBtn,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(MODERATOR_MODERATORS.emailConfirmation)
      ).toBeInTheDocument();
    });
  });

  it('shows an error alert when the form submission fails', async () => {
    const errorResponse = {
      response: {
        data: {
          message: "Une erreur s'est produite lors de l'envoi de la requête",
        },
      },
    };
    (axiosInstance.post as jest.Mock).mockRejectedValueOnce(errorResponse);

    render(<AddModeratorForm targetRef={formRef} />);

    fireEvent.change(screen.getByLabelText('Nom *'), {
      target: { value: 'Feller' },
    });
    fireEvent.change(screen.getByLabelText('Prénom *'), {
      target: { value: 'Vincent' },
    });
    fireEvent.change(screen.getByLabelText('E-mail *'), {
      target: { value: 'vincentfeller@test.com' },
    });
    fireEvent.change(screen.getByLabelText('Téléphone *'), {
      target: { value: '0123456789' },
    });
    fireEvent.change(screen.getByLabelText('Fonction *'), {
      target: { value: 'Gestionnaire' },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: MODERATOR_MODERATORS.addNewModeratorBtn,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "Une erreur s'est produite lors de l'envoi de la requête"
        )
      ).toBeInTheDocument();
    });
  });
});
