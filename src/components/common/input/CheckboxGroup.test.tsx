import React, { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { CheckboxGroup } from './CheckboxGroup';

const options = [
  { id: '1', label: 'Thématique 1' },
  { id: '2', label: 'Thématique 2' },
  { id: '3', label: 'Thématique 3' },
];

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CheckboxGroup', () => {
  it('should render the checkbox group with options', () => {
    render(
      <Wrapper>
        <CheckboxGroup name="test" options={options} legend={'test'} />
      </Wrapper>
    );
    // THEN
    options.forEach((option) => {
      const checkbox = screen.getByLabelText(option.label) as HTMLInputElement;
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toBe(false);
    });
  });

  it('should update the checked state when checkbox is clicked', () => {
    render(
      <Wrapper>
        <CheckboxGroup name="test" options={options} legend={'test'} />
      </Wrapper>
    );

    const checkbox = screen.getByLabelText('Thématique 1') as HTMLInputElement;
    // THEN
    expect(checkbox.checked).toBe(false);

    userEvent.click(checkbox);
    waitFor(() => expect(checkbox.checked).toBe(true));
  });
});
