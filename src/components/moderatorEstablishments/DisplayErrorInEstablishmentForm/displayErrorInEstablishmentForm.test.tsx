import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { displayErrorInEstablishmentForm } from './displayErrorInEstablishmentForm';
import { AddEstablishmentErrorResponseData } from '@/domain/ModeratorEstablishments';

const MockErrorComponent = ({
  keys,
  errors,
}: {
  keys: string[];
  errors: AddEstablishmentErrorResponseData;
}) => <div>{displayErrorInEstablishmentForm(keys, errors)}</div>;

describe('displayErrorInEstablishmentForm', () => {
  it('should return null when no keys are provided', () => {
    const { container } = render(<MockErrorComponent keys={[]} errors={{}} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('should return null when errors object is empty', () => {
    const { container } = render(
      <MockErrorComponent keys={['societe']} errors={{}} />
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('should render a single error message when one key matches', () => {
    const errors: AddEstablishmentErrorResponseData = {
      societe: 'Societe is required',
    };
    const { getByText } = render(
      <MockErrorComponent keys={['societe']} errors={errors} />
    );
    expect(getByText('Societe is required')).toBeInTheDocument();
  });

  it('should render multiple error messages when multiple keys match', () => {
    const errors: AddEstablishmentErrorResponseData = {
      societe: 'Societe is required',
      ville: 'Ville is required',
    };
    const { getByText } = render(
      <MockErrorComponent keys={['societe', 'ville']} errors={errors} />
    );
    expect(getByText('Societe is required')).toBeInTheDocument();
    expect(getByText('Ville is required')).toBeInTheDocument();
  });

  it('should not render a message for keys without corresponding errors', () => {
    const errors: AddEstablishmentErrorResponseData = {
      societe: 'Societe is required',
    };
    const { queryByText } = render(
      <MockErrorComponent keys={['ville']} errors={errors} />
    );
    expect(queryByText('Societe is required')).not.toBeInTheDocument();
    expect(queryByText('Ville is required')).not.toBeInTheDocument();
  });

  it('should render nothing when the keys do not match any errors', () => {
    const errors: AddEstablishmentErrorResponseData = {
      societe: 'Societe is required',
    };
    const { container } = render(
      <MockErrorComponent keys={['nonExistentKey']} errors={errors} />
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
