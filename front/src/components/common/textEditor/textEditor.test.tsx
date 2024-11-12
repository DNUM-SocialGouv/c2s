/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TextEditor } from './TextEditor.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import MockAdapter from 'axios-mock-adapter';

jest.mock('@tinymce/tinymce-react', () => ({
  Editor: ({
    onEditorChange,
  }: {
    onEditorChange: (value: string, editor: any) => void;
  }) => {
    const mockEditor = {
      getContent: jest.fn(() => '<p>mon message</p>'),
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-redundant-roles
      <textarea
        role="textbox"
        onChange={(e) => onEditorChange(e.target.value, mockEditor)}
      />
    );
  },
}));

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
  it('should render the editor', async () => {
    const groupe = 'OC';
    render(<TextEditor groupe={groupe} />);

    const textarea = await screen.findByRole('textbox');
    expect(textarea).toBeVisible();
  });

  it('should display the moderator message after submiting form', async () => {
    // GIVEN
    const groupe = 'OC';
    render(<TextEditor groupe={groupe} />);

    const textarea = await screen.findByRole('textbox');
    expect(textarea).toBeVisible();
    const submitButton = screen.getByText('Enregistrer');

    // WHEN
    fireEvent.change(textarea, { target: { value: 'mon message mis à jour' } });
    fireEvent.click(submitButton);

    // THEN
    await waitFor(() => {
      expect(textarea).toHaveValue('mon message mis à jour');
    });
  });

  it('should call the API when submitting the form', async () => {
    // GIVEN
    const groupe = 'OC';
    render(<TextEditor groupe={groupe} />);
    const textarea = await screen.findByRole('textbox');
    expect(textarea).toBeVisible();

    const submitButton = screen.getByText('Enregistrer');

    jest.spyOn(axiosInstance, 'post').mockResolvedValueOnce({
      data: { contenu: 'mon message' },
    });

    // WHEN
    await waitFor(() => {
      fireEvent.change(textarea, { target: { value: 'mon message' } });
    });

    fireEvent.click(submitButton);

    // THEN
    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/moderateur/messages',
        expect.any(String),
        { withCredentials: true }
      );
      expect(textarea).toHaveValue('mon message');
    });
  });

  it('should display an error message when the API call fails', async () => {
    // GIVEN
    const groupe = 'OC';
    render(<TextEditor groupe={groupe} />);
    const textarea = await screen.findByRole('textbox');
    expect(textarea).toBeVisible();

    const submitButton = screen.getByText('Enregistrer');

    jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
      response: { status: 500 },
    });

    // WHEN
    await waitFor(() => {
      fireEvent.change(textarea, { target: { value: 'mon message' } });
    });

    fireEvent.click(submitButton);

    // THEN
    await waitFor(() => {
      expect(
        screen.getByText('Vous avez depassé le nombre de caractères authorisés')
      ).toBeInTheDocument();
      expect(textarea).toHaveValue('mon message');
    });
  });
});
