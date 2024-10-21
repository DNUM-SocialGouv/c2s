import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import { AddRessourceForm } from './AddRessourceForm';
import { axiosInstance } from '@/RequestInterceptor';
import { moderatorThematiques } from '@/utils/tests/moderatorRessources.fixtures';

describe('AddRessourceForm', () => {
  it('should render the form with the correct elements', () => {
    const mockAxios = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mockAxios.onGet('/moderateur/thematique').reply(200, {
      data: moderatorThematiques,
    });
    render(
      <AddRessourceForm
        onClickCancel={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    const formTitle = screen.getByText('Ajouter une nouvelle ressource');
    expect(formTitle).toBeInTheDocument();

    const selectLabel = screen.getByLabelText('Thématique de la ressource');
    expect(selectLabel).toBeInTheDocument();

    const selectElement = screen.getByRole('combobox', {
      name: 'Thématique de la ressource',
    });
    expect(selectElement).toBeInTheDocument();

    const fileLabel = screen.getByLabelText(/Ajouter des fichiers/);
    expect(fileLabel).toBeInTheDocument();

    const fileInput = screen.getByLabelText(
      /Ajouter des fichiers/
    ) as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput.type).toBe('file');

    const saveButton = screen.getByRole('button', { name: 'Confirmer' });
    expect(saveButton).toBeInTheDocument();
  });

  it('should fetch thematiques on component mount', async () => {
    // GIVEN
    const mockAxios = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mockAxios.onGet('/moderateur/thematique').reply(200, {
      data: moderatorThematiques,
    });

    render(
      <AddRessourceForm
        onClickCancel={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    // THEN
    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe('/moderateur/thematiques');
    });

    const selectElement = screen.getByRole('combobox', {
      name: 'Thématique de la ressource',
    });
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.children.length).toBe(1);
  });

  it('should update file state when file input value changes', async () => {
    // GIVEN
    render(
      <AddRessourceForm
        onClickCancel={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    const fileInput = screen.getByLabelText(
      /Ajouter des fichiers/
    ) as HTMLInputElement;

    // WHEN
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    userEvent.upload(fileInput, file);

    // THEN
    await waitFor(() => {
      expect(fileInput.files).toHaveLength(1);
      expect(fileInput.files![0]).toBe(file);
    });
  });

  it('should call onClickCancel when cancel button is clicked', async () => {
    // GIVEN
    const onClickCancel = jest.fn();
    render(<AddRessourceForm onClickCancel={onClickCancel} />);

    // WHEN
    const cancelButton = screen.getByRole('button', { name: 'Annuler' });
    userEvent.click(cancelButton);

    // THEN
    await waitFor(() => {
      expect(onClickCancel).toHaveBeenCalled();
    });
  });
});
