import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from './FormInput';

describe('FormInput', () => {
  const label = 'Username';
  const name = 'username';
  const value = 'JohnDoe';
  const onChange = jest.fn();
  const errorMessage = 'Invalid username';

  it('should render the input field with the correct label and value', () => {
    // GIVEN
    const isDisabled = false;
    const isError = false;

    // WHEN
    render(
      <FormInput
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        isError={isError}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
      />
    );

    // THEN
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

  it('should render the input field with error message when isError is true', () => {
    // GIVEN
    const isDisabled = false;
    const isError = true;

    // WHEN
    render(
      <FormInput
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        isError={isError}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
      />
    );

    // THEN
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should call the onChange function when the input value changes', () => {
    // GIVEN
    const isDisabled = false;
    const isError = false;
    const newValue = 'JaneDoe';

    // WHEN
    render(
      <FormInput
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        isError={isError}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
      />
    );

    const inputElement = screen.getByLabelText(label);
    fireEvent.change(inputElement, { target: { value: newValue } });

    // THEN
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should disable the input field when isDisabled is true', () => {
    // GIVEN
    const isDisabled = true;
    const isError = false;

    // WHEN
    render(
      <FormInput
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        isError={isError}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
      />
    );

    const inputElement = screen.getByLabelText(label);

    // THEN
    expect(inputElement).toBeDisabled();
  });
});
