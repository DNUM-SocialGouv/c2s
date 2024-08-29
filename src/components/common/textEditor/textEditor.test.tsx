import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TextEditor } from './TextEditor';
import { axiosInstance } from '@/RequestInterceptor';
import MockAdapter from 'axios-mock-adapter';

const moderatorMessageFixture = {
  id: 0,
  contenu: 'string',
  groupe: 'CAISSE',
  dateCrea: '2024-08-29T10:35:53.810Z',
  dateMaj: '2024-08-29T10:35:53.810Z',
};

beforeAll(async () => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
  mock.onGet('/moderateur/messages/OC').reply(200, {
    data: moderatorMessageFixture,
  });
});

describe('TextEditor', () => {
  it('should render the editor', () => {
    // GIVEN
    const groupe = 'OC';

    // WHEN
    render(<TextEditor groupe={groupe} />);

    // THEN
    waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  it('should update the value when typing in the editor', () => {
    // GIVEN
    const groupe = 'OC';
    render(<TextEditor groupe={groupe} />);
    let editor: Node | Window;

    waitFor(() => {
      editor = screen.getByRole('textbox');
    });

    // WHEN
    waitFor(() => {
      fireEvent.change(editor, { target: { value: 'mon message' } });
    });

    // THEN
    waitFor(() => {
      expect(editor).toHaveValue('mon message');
    });
  });

  it('should call the API when submitting the form', async () => {
    // GIVEN
    const groupe = 'OC';
    render(<TextEditor groupe={groupe} />);
    let editor: Node | Window;

    waitFor(() => {
      editor = screen.getByRole('textbox');
    });

    const submitButton = screen.getByText('Enregistrer');

    jest.spyOn(axiosInstance, 'post').mockResolvedValueOnce({
      data: { contenu: 'mon message' },
    });

    // WHEN
    waitFor(() => {
      fireEvent.change(editor, { target: { value: 'mon message' } });
    });

    fireEvent.click(submitButton);

    // THEN
    waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/moderateur/messages',
        expect.any(String),
        { withCredentials: true }
      );
      expect(editor).toHaveValue('mon message');
    });
  });

  it('should display an error message when the API call fails', async () => {
    // GIVEN
    const groupe = 'OC';
    render(<TextEditor groupe={groupe} />);
    let editor: Node | Window;

    waitFor(() => {
      editor = screen.getByRole('textbox');
    });

    const submitButton = screen.getByText('Enregistrer');

    jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
      response: { status: 500 },
    });

    // WHEN
    waitFor(() => {
      fireEvent.change(editor, { target: { value: 'mon message' } });
    });

    fireEvent.click(submitButton);

    // THEN
    waitFor(() => {
      expect(
        screen.getByText('Vous avez depassé le nombre de caractères authorisés')
      ).toBeInTheDocument();
      expect(editor).toHaveValue('mon message');
    });
  });
});
