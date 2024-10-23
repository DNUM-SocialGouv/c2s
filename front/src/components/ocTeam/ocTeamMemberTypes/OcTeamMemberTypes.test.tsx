import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import MockAdapter from 'axios-mock-adapter';
import { OcTeamMemberTypes } from './OcTeamMemberTypes.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { OC_TEAM } from '../../../wording.ts';

expect.extend(toHaveNoViolations);

const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });

describe('OcTeamMemberTypes', () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    mock.reset();
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  const defaultProps = {
    memberTypes: ['GESTION'],
    memberEmail: 'test@example.com',
  };

  const setup = (props = defaultProps) => {
    return render(<OcTeamMemberTypes {...props} />);
  };

  it('should render the component without accessibility violations', async () => {
    const { container } = setup();
    const form = container.querySelector('form');
    expect(await axe(form!)).toHaveNoViolations();
  });

  it('should render checkboxes with correct labels and values', () => {
    setup();

    expect(screen.getByLabelText(OC_TEAM.typeGestion)).toBeInTheDocument();
    expect(screen.getByLabelText(OC_TEAM.typeStatistiques)).toBeInTheDocument();
    expect(screen.getByLabelText(OC_TEAM.typeDeclaration)).toBeInTheDocument();
  });

  it('should allow selecting and deselecting checkboxes', async () => {
    setup();

    const gestionCheckbox = screen.getByLabelText(OC_TEAM.typeGestion);
    const statsCheckbox = screen.getByLabelText(OC_TEAM.typeStatistiques);

    fireEvent.click(statsCheckbox);
    expect(statsCheckbox).toBeChecked();

    fireEvent.click(gestionCheckbox);
    expect(gestionCheckbox).not.toBeChecked();
  });

  it('should show validation error if form is submitted without email', async () => {
    setup({ memberTypes: [], memberEmail: '' });

    const submitButton = screen.getByRole('button', {
      name: OC_TEAM.saveTypes,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(OC_TEAM.changeTypesErrorMail)
      ).toBeInTheDocument();
    });
  });

  it('should call the API and show success message when form submission is successful', async () => {
    mock
      .onPut('/oc/equipes?email=test%40example.com&types=GESTION')
      .reply(200, true);

    setup();

    const submitButton = screen.getByRole('button', {
      name: OC_TEAM.saveTypes,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(OC_TEAM.changeTypesSuccess)).toBeInTheDocument();
    });
  });

  it('should call the API and show error message when form submission fails', async () => {
    mock.onPut('/oc/equipes?email=test%40example.com&types=GESTION').reply(500);

    setup();

    const submitButton = screen.getByRole('button', {
      name: OC_TEAM.saveTypes,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(OC_TEAM.changeTypesError)).toBeInTheDocument();
    });
  });

  it('should reset the form state and error on unmount', () => {
    const { unmount } = setup();

    unmount();

    expect(
      screen.queryByText(OC_TEAM.changeTypesError)
    ).not.toBeInTheDocument();
  });
});
