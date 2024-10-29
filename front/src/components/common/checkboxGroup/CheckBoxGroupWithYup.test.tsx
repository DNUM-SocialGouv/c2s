import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CheckboxGroupWithYup } from './CheckBoxGroupWithYup.tsx';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import React from 'react';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: jest.fn(),
}));

const renderWithForm = (Component: React.ReactNode) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(<Wrapper>{Component}</Wrapper>);
};

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('CheckboxGroupWithYup', () => {
  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: jest.fn(),
      setValue: jest.fn(),
      watch: jest.fn().mockReturnValue([]),
      formState: { errors: {} },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render checkbox options correctly', () => {
    // GIVEN
    renderWithForm(
      <CheckboxGroupWithYup name="checkboxGroup" options={options} />
    );

    // THEN
    options.forEach((option) => {
      const checkboxInput = screen.getByLabelText(option.label);
      expect(checkboxInput).toBeInTheDocument();
      expect(checkboxInput).toHaveAttribute('type', 'checkbox');
      expect(checkboxInput).toHaveAttribute('value', option.value);
    });
  });

  it('should allow selecting multiple checkboxes', async () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: jest.fn(),
      setValue: jest.fn(),
      watch: jest.fn().mockReturnValue(['option1', 'option2']),
      formState: { errors: {} },
    });
  
    // GIVEN
    renderWithForm(
      <CheckboxGroupWithYup name="checkboxGroup" options={options} />
    );
  
    const checkbox1 = screen.getByLabelText('Option 1');
    const checkbox2 = screen.getByLabelText('Option 2');
  
    // WHEN
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
  
    // THEN
    await waitFor(() => {
      expect(checkbox1).toBeChecked();
      expect(checkbox2).toBeChecked();
    });
  });

  it('should allow deselecting checkboxes', async () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: jest.fn(),
      setValue: jest.fn(),
      watch: jest.fn().mockReturnValue([]),
      formState: { errors: {} },
    });

    // GIVEN
    renderWithForm(
      <CheckboxGroupWithYup name="checkboxGroup" options={options} />
    );

    const checkbox1 = screen.getByLabelText('Option 1');

    // WHEN
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox1);

    // THEN
    await waitFor(() => {
      expect(checkbox1).not.toBeChecked();
    });
  });

  it('should disable checkboxes when "disabled" is set to true', () => {
    const disabledOptions = [
      { value: 'option1', label: 'Option 1', disabled: true },
      { value: 'option2', label: 'Option 2', disabled: true },
    ];

    renderWithForm(
      <CheckboxGroupWithYup name="checkboxGroup" options={disabledOptions} />
    );

    disabledOptions.forEach((option) => {
      const checkboxInput = screen.getByLabelText(option.label);
      expect(checkboxInput).toBeDisabled();
    });
  });
});
