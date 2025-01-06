import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CheckboxWithYup } from './CheckboxWithYup.tsx';
import { FormProvider, useForm, useController } from 'react-hook-form';
import React from 'react';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useController: jest.fn(),
}));

const renderWithForm = (Component: React.ReactNode) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(<Wrapper>{Component}</Wrapper>);
};

describe('CheckboxWithYup', () => {
  beforeEach(() => {
    (useController as jest.Mock).mockReturnValue({
      field: {
        value: false,
        onChange: jest.fn(),
        onBlur: jest.fn(),
        name: 'checkbox',
        ref: jest.fn(),
      },
      fieldState: {
        error: undefined,
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the checkbox with the label correctly', () => {
    // GIVEN
    const name = 'acceptTerms';
    const label = 'Accept terms and conditions';

    // WHEN
    renderWithForm(<CheckboxWithYup name={name} label={label} />);

    // THEN
    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('should display an error message if there is an error', () => {
    // GIVEN
    const name = 'acceptTerms';
    const label = 'Accept terms and conditions';
    (useController as jest.Mock).mockReturnValue({
      field: {
        value: false,
        onChange: jest.fn(),
        onBlur: jest.fn(),
        name: name,
        ref: jest.fn(),
      },
      fieldState: {
        error: { message: 'This field is required' },
      },
    });

    // WHEN
    renderWithForm(<CheckboxWithYup name={name} label={label} />);

    // THEN
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should allow checking and unchecking the checkbox', async () => {
    // GIVEN
    const name = 'acceptTerms';
    const label = 'Accept terms and conditions';
    const mockOnChange = jest.fn();
    (useController as jest.Mock).mockReturnValue({
      field: {
        value: false,
        onChange: mockOnChange,
        onBlur: jest.fn(),
        name: name,
        ref: jest.fn(),
      },
      fieldState: {
        error: undefined,
      },
    });

    renderWithForm(<CheckboxWithYup name={name} label={label} />);

    const checkbox = screen.getByLabelText(label);

    // WHEN
    fireEvent.click(checkbox);

    // THEN
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  it('should add custom classes when provided', () => {
    // GIVEN
    const name = 'acceptTerms';
    const label = 'Accept terms and conditions';
    const classes = 'custom-class';

    // WHEN
    renderWithForm(
      <CheckboxWithYup name={name} label={label} classes={classes} />
    );

    // THEN
    const container = screen.getByText(label).parentElement?.parentElement;
    expect(container).toHaveClass(classes);
  });
});
