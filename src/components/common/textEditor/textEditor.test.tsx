import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TextEditor } from './TextEditor';
import { axiosInstance } from '@/RequestInterceptor';

describe('TextEditor', () => {
  it('should render the editor', () => {
    // GIVEN
    const groupe = 'sample-group';

    // WHEN
    render(<TextEditor groupe={groupe} />);

    // THEN
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should update the value when typing in the editor', () => {
    // GIVEN
    const groupe = 'sample-group';
    render(<TextEditor groupe={groupe} />);
    const editor = screen.getByRole('textbox');

    // WHEN
    fireEvent.change(editor, { target: { value: 'Sample text' } });

    // THEN
    expect(editor).toHaveValue('Sample text');
  });

  it('should call the API when submitting the form', async () => {
    // GIVEN
    const groupe = 'sample-group';
    render(<TextEditor groupe={groupe} />);
    const editor = screen.getByRole('textbox');
    const submitButton = screen.getByText('Enregistrer');

    // Mock the axiosInstance.post method
    jest.spyOn(window.axiosInstance, 'post').mockResolvedValueOnce({
      data: { contenu: 'Sample response' },
    });

    // WHEN
    fireEvent.change(editor, { target: { value: 'Sample text' } });
    fireEvent.click(submitButton);

    // THEN
    await waitFor(() => {
      expect(window.axiosInstance.post).toHaveBeenCalledWith(
        '/moderateur/messages',
        expect.any(String),
        { withCredentials: true }
      );
      expect(editor).toHaveValue('Sample response');
    });
  });

  it('should display an error message when the API call fails', async () => {
    // GIVEN
    const groupe = 'sample-group';
    render(<TextEditor groupe={groupe} />);
    const editor = screen.getByRole('textbox');
    const submitButton = screen.getByText('Enregistrer');

    // Mock the axiosInstance.post method to simulate an error
    jest.spyOn(window.axiosInstance, 'post').mockRejectedValueOnce({
      response: { status: 500 },
    });

    // WHEN
    fireEvent.change(editor, { target: { value: 'Sample text' } });
    fireEvent.click(submitButton);

    // THEN
    await waitFor(() => {
      expect(
        screen.getByText('Vous avez depassé le nombre de caractères authorisés')
      ).toBeInTheDocument();
      expect(editor).toHaveValue('Sample text');
    });
  });
});
