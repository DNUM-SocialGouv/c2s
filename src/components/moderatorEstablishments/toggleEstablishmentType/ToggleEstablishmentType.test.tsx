import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToggleEstablishmentType } from './ToggleEstablishmentType';

describe('ToggleEstablishmentType', () => {
  const establishmentType = 'oc';
  const updateEstablishmentType = jest.fn();

  beforeEach(() => {
    render(
      <ToggleEstablishmentType
        establishmentType={establishmentType}
        updateEstablishmentType={updateEstablishmentType}
      />
    );
  });

  it('should render the component with the correct establishment type', () => {
    expect(
      screen.getByLabelText('Organisme complémentaire')
    ).toBeInTheDocument();
    expect(screen.getByLabelText(`Point d'accueil`)).toBeInTheDocument();
  });

  it('should call the updateEstablishmentType function when an option is selected', () => {
    // WHEN
    const radioOption = screen.getByLabelText(`Point d'accueil`);
    fireEvent.change(radioOption, { target: { value: 'pa' } });
    // THEN
    waitFor(() => expect(updateEstablishmentType).toHaveBeenCalledWith('pa'));
  });

  it('should have the correct option selected based on the establishmentType prop', () => {
    // GIVEN
    const ocRadioOption = screen.getByLabelText('Organisme complémentaire');
    const paRadioOption = screen.getByLabelText(`Point d'accueil`);
    // THEN
    expect(ocRadioOption).toBeChecked();
    expect(paRadioOption).not.toBeChecked();
  });
});
