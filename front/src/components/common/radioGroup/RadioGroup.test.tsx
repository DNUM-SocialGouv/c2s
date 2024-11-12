import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RadioGroup from './RadioGroup.tsx';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('RadioGroup', () => {
  it('should render radio options correctly', () => {
    // GIVEN
    const selectedValue = 'option2';
    const onChange = jest.fn();

    render(
      <RadioGroup
        selectedValue={selectedValue}
        onChange={onChange}
        options={options}
      />
    );
    // THEN
    options.forEach((option) => {
      const radioInput = screen.getByLabelText(option.label);
      expect(radioInput).toBeInTheDocument();
      expect(radioInput).toHaveAttribute('type', 'radio');
      expect(radioInput).toHaveAttribute('name', 'groupe');
      expect(radioInput).toHaveAttribute('value', option.value);
    });
  });

  it('should call onChange when a radio option is selected', async () => {
    // GIVEN
    const selectedValue = 'option1';
    const onChange = jest.fn();

    render(
      <RadioGroup
        selectedValue={selectedValue}
        onChange={onChange}
        options={options}
      />
    );

    const radioInput = screen.getByLabelText('Option 2');
    // WHEN
    fireEvent.click(radioInput);
    // THEN
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  it('should disable radio options when isDisabled is true', () => {
    // GIVEN
    const selectedValue = 'option1';
    const onChange = jest.fn();

    render(
      <RadioGroup
        selectedValue={selectedValue}
        onChange={onChange}
        options={options}
        isDisabled={true}
      />
    );
    // THEN
    options.forEach((option) => {
      const radioInput = screen.getByLabelText(option.label);
      expect(radioInput).toBeDisabled();
    });
  });
});
