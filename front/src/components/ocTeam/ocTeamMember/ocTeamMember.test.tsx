import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { OcTeamMember } from './ocTeamMember.tsx';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { Member } from '../../../domain/OcTeam.ts';
import { OC_TEAM } from '../../../wording.ts';
import { useOcTeam } from '../../../hooks/useOcTeam.tsx';

expect.extend(toHaveNoViolations);

const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });

jest.mock('../../../hooks/useOcTeam.tsx', () => ({
  useOcTeam: jest.fn(),
}));

describe('OcTeamMember', () => {
  let mockMember: Member;
  let consoleErrorMock: jest.SpyInstance;
  let refetchMembersMock: jest.Mock;
  let showNotificationMock: jest.Mock;

  beforeEach(() => {
    mock.reset();
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Set up default mock data for the Member
    mockMember = {
      id: 1,
      nom: 'Martin',
      prenom: 'David',
      fonction: 'Dev',
      email: 'David.Martin@example.com',
      telephone: '123-456-7890',
      password: null,
      groupe: null,
      societe: 'Tech Corp',
      types: ['GESTION'],
    };

    refetchMembersMock = jest.fn();
    showNotificationMock = jest.fn();
    (useOcTeam as jest.Mock).mockReturnValue({
      refetchMembers: refetchMembersMock,
      showNotification: showNotificationMock,
    });
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  const setup = (member: Member) => {
    render(<OcTeamMember member={member} />);
  };

  it('should render the component without accessibility violations', async () => {
    setup(mockMember);
    const form = screen.getByRole('heading', {
      name: `${mockMember.prenom} ${mockMember.nom}`,
    });
    expect(await axe(form)).toHaveNoViolations();
  });

  it('should open and close the modal when delete button is clicked', async () => {
    setup(mockMember);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.getByText(OC_TEAM.deleteWarning)).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: /annuler/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText(OC_TEAM.deleteWarning)).not.toBeInTheDocument();
    });
  });

  it('should call API and show success notification when member is deleted', async () => {
    mock
      .onDelete(`/oc/equipes?email=${encodeURIComponent(mockMember.email)}`)
      .reply(200);

    setup(mockMember);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirmer/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(refetchMembersMock).toHaveBeenCalled();
      expect(showNotificationMock).toHaveBeenCalledWith(
        `Le membre ${mockMember.prenom} ${mockMember.nom} a bien été supprimé`
      );
    });
  });

  it('should show error message when deleting member fails', async () => {
    mock
      .onDelete(`/oc/equipes?email=${encodeURIComponent(mockMember.email)}`)
      .reply(500);

    setup(mockMember);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirmer/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Une erreur est survenue, l'utilisateur n'a pas été supprimé"
        )
      ).toBeInTheDocument();
    });
  });
});
