import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReadOnlyCheckboxGroup from './ReadOnlyCheckboxGroup.tsx';

describe('ReadOnlyCheckboxGroup', () => {
  const options = [
    { id: 'option1', label: 'Option 1', checked: true },
    { id: 'option2', label: 'Option 2', checked: false },
    { id: 'option3', label: 'Option 3', checked: true },
  ];

  it('should render the legend when provided', () => {
    // GIVEN
    const legend = 'Checkbox Group';

    // WHEN
    render(
      <ReadOnlyCheckboxGroup
        legend={legend}
        name="checkboxGroup"
        options={options}
      />
    );

    // THEN
    expect(screen.getByText(legend)).toBeInTheDocument();
  });

  it('should not render the legend when not provided', () => {
    // WHEN
    render(<ReadOnlyCheckboxGroup name="checkboxGroup" options={options} />);

    // THEN
    expect(screen.queryByTestId('legend')).not.toBeInTheDocument();
  });

  it('should render the correct number of checkboxes', () => {
    // WHEN
    render(<ReadOnlyCheckboxGroup name="checkboxGroup" options={options} />);

    // THEN
    expect(screen.getAllByRole('checkbox')).toHaveLength(options.length);
  });

  it('should render the correct labels for checkboxes', () => {
    // WHEN
    render(<ReadOnlyCheckboxGroup name="checkboxGroup" options={options} />);

    // THEN
    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('should render the checkboxes with correct checked state', () => {
    // WHEN
    render(<ReadOnlyCheckboxGroup name="checkboxGroup" options={options} />);

    // THEN
    options.forEach((option) => {
      const checkbox = screen.getByLabelText(option.label) as HTMLInputElement;
      expect(checkbox.checked).toBe(option.checked);
    });
  });
});
