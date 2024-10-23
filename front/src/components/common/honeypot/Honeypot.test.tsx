import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Honeypot } from './Honeypot.tsx';

describe('Honeypot', () => {
  it('renders correctly', () => {
    render(<Honeypot honeypotName="honeypot" onHoneypotChange={() => {}} />);
    const honeypotInput = screen.getByLabelText(
      /do not fill this out if you are a human/i
    );
    expect(honeypotInput).toBeInTheDocument();
    expect(honeypotInput).not.toBeVisible();
  });

  it('trigger onHoneypotChange properly', () => {
    const handleHoneypotChange = jest.fn();
    render(
      <Honeypot
        honeypotName="honeypot"
        onHoneypotChange={handleHoneypotChange}
      />
    );
    const honeypotInput = screen.getByLabelText(
      /do not fill this out if you are a human/i
    );
    fireEvent.change(honeypotInput, { target: { value: 'bot input' } });
    expect(handleHoneypotChange).toHaveBeenCalledTimes(1);
  });
});
