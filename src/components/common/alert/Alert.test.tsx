import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Alert } from './Alert';

expect.extend(toHaveNoViolations);

describe('Alert', () => {
  it('should render without violations', async () => {
    // WHEN
    const { container } = render(
      <Alert label="Info" description="This is an info alert" type="info" />
    );

    // THEN
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render the alert with the correct label and description', () => {
    // WHEN
    render(
      <Alert
        label="Success"
        description="This is a success alert"
        type="success"
      />
    );

    // THEN
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('This is a success alert')).toBeInTheDocument();
  });

  it('should apply the correct class based on the type prop', () => {
    // WHEN
    render(
      <Alert label="Error" description="This is an error alert" type="error" />
    );

    // THEN
    expect(screen.getByText('Error').closest('div')).toHaveClass(
      'fr-alert--error'
    );
  });

  it('should not render the label if it is not provided', () => {
    // WHEN
    render(<Alert description="No label alert" type="info" />);

    // THEN
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText('No label alert')).toBeInTheDocument();
  });

  it('should render with default type if no type is provided', () => {
    // WHEN
    render(
      <Alert label="Default Info" description="This should be an info alert" />
    );

    // THEN
    expect(screen.getByText('Default Info').closest('div')).toHaveClass(
      'fr-alert--info'
    );
  });
});
