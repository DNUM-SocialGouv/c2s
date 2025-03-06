import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { TextEditor } from './TextEditor';
import { axiosInstance } from '../../../RequestInterceptor';

jest.mock('../../../RequestInterceptor', () => ({
  axiosInstance: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('TextEditor Component', () => {
  const mockGroupe = 'test-group';
  const mockContent = 'Test content';

  beforeEach(() => {
    jest.clearAllMocks();
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: { contenu: mockContent },
    });

    jest.spyOn(console, 'error').mockImplementation((message) => {
      if (message.includes('findDOMNode is deprecated')) {
        return;
      }
      console.error(message);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the TextEditor component', async () => {
    render(<TextEditor groupe={mockGroupe} />);

    await waitFor(() => {
      expect(
        screen.getByText('Nombre de caractères restants: 243')
      ).toBeInTheDocument();
    });
  });

  it('should fetch and display initial content', async () => {
    render(<TextEditor groupe={mockGroupe} />);

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith(
        `/moderateur/messages/${mockGroupe}`,
        { withCredentials: true }
      );
      expect(screen.getByText(mockContent)).toBeInTheDocument();
    });
  });
});
