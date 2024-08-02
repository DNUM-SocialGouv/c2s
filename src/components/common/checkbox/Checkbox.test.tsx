import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { Checkbox } from './Checkbox';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Checkbox', () => {
  const label = 'Accept Terms';
  const name = 'terms';

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('should render component wihtout violation', async () => {
    // WHEN
    render(
      <Wrapper>
        <Checkbox name={name} label={label} />
      </Wrapper>
    );
    // Then
    expect(await axe(screen.getByTestId('checkbox'))).toHaveNoViolations();
  });

  it('should render the checkbox with the correct label', () => {
    // WHEN
    render(
      <Wrapper>
        <Checkbox name={name} label={label} />
      </Wrapper>
    );

    // THEN
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('should call the onChange function when the checkbox is clicked', () => {
    // WHEN
    render(
      <Wrapper>
        <Checkbox name={name} label={label} />
      </Wrapper>
    );

    const checkboxElement = screen.getByLabelText(label);
    fireEvent.click(checkboxElement);

    // THEN
    expect(checkboxElement).toBeChecked();
  });

  it('should disable the checkbox when isDisabled is true', () => {
    // WHEN
    render(
      <Wrapper>
        <Checkbox name={name} label={label} isDisabled />
      </Wrapper>
    );

    const checkboxElement = screen.getByLabelText(label);

    // THEN
    expect(checkboxElement).toBeDisabled();
  });

  it('should render custom classes if provided', () => {
    // GIVEN
    const customClass = 'custom-class';

    // WHEN
    render(
      <Wrapper>
        <Checkbox name={name} label={label} classes={customClass} />
      </Wrapper>
    );

    const checkboxContainer =
      screen.getByLabelText(label).parentElement?.parentElement;

    // THEN
    expect(checkboxContainer).toHaveClass(customClass);
  });
});
