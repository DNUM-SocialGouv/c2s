import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import { AddRessourceForm } from './AddRessourceForm';
import { axiosInstance } from '@/RequestInterceptor';
import { moderatorThematiques } from '@/utils/tests/moderatorRessources.fixtures';

const mockAxios = new MockAdapter(axiosInstance, { delayResponse: 2000 });

describe('AddRessourceForm', () => {
  beforeAll(async () => {
    mockAxios.onGet('/moderateur/thematique').reply(200, {
      data: moderatorThematiques,
    });
  });

  it('should render the form with the correct elements', () => {
    render(<AddRessourceForm />);

    const formTitle = screen.getByText('Ajouter une nouvelle ressource');
    expect(formTitle).toBeInTheDocument();

    const selectLabel = screen.getByLabelText('Thématique de la ressource');
    expect(selectLabel).toBeInTheDocument();

    const selectElement = screen.getByRole('combobox', {
      name: 'Thématique de la ressource',
    });
    expect(selectElement).toBeInTheDocument();

    const fileLabel = screen.getByLabelText('Ajouter des fichiers');
    expect(fileLabel).toBeInTheDocument();

    const fileInput = screen.getByLabelText(
      'Ajouter des fichiers'
    ) as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput.type).toBe('file');

    const saveButton = screen.getByRole('button', { name: 'Enregistrer' });
    expect(saveButton).toBeInTheDocument();
  });

  it('should fetch thematiques on component mount', async () => {
    // GIVEN
    mockAxios.onGet('/moderateur/thematique').reply(200, {
      data: moderatorThematiques,
    });

    render(<AddRessourceForm />);

    // THEN
    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe('/moderateur/thematiques');
    });

    const selectElement = screen.getByRole('combobox', {
      name: 'Thématique de la ressource',
    });
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.children.length).toBe(moderatorThematiques.length + 1);

    moderatorThematiques.forEach((thematique) => {
      const optionElement = screen.getByRole('option', {
        name: thematique.titre,
      });
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('should update file state when file input value changes', () => {
    render(<AddRessourceForm />);

    const fileInput = screen.getByLabelText(
      'Ajouter des fichiers'
    ) as HTMLInputElement;
    // WHEN
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    userEvent.upload(fileInput, file);
    // THEN
    expect(fileInput.files).toHaveLength(1);
  });

  it('should handle file upload successfully', async () => {
    // GIVEN
    const thematiqueId = 1;
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    // WHEN
    mockAxios
      .onPost(`/moderateur/fichiers?ressourceThematiqueId=${thematiqueId}`)
      .reply(200);

    render(<AddRessourceForm />);

    const selectElement = screen.getByRole('combobox', {
      name: 'Thématique de la ressource',
    });

    userEvent.selectOptions(selectElement, thematiqueId.toString());

    const fileInput = screen.getByLabelText(
      'Ajouter des fichiers'
    ) as HTMLInputElement;

    userEvent.upload(fileInput, file);

    const saveButton = screen.getByRole('button', { name: 'Enregistrer' });
    userEvent.click(saveButton);
    // THEN
    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0].url).toBe(
        `/moderateur/fichiers?ressourceThematiqueId=${thematiqueId}`
      );
      expect(mockAxios.history.post[0].data).toEqual(formData);
    });
  });

  it('should handle file upload error', async () => {
    // GIVEN
    const thematiqueId = 1;
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    // WHEN
    mockAxios
      .onPost(`/moderateur/fichiers?ressourceThematiqueId=${thematiqueId}`)
      .reply(500);

    render(<AddRessourceForm />);

    const selectElement = screen.getByRole('combobox', {
      name: 'Thématique de la ressource',
    });

    userEvent.selectOptions(selectElement, thematiqueId.toString());

    const fileInput = screen.getByLabelText(
      'Ajouter des fichiers'
    ) as HTMLInputElement;

    userEvent.upload(fileInput, file);

    const saveButton = screen.getByRole('button', { name: 'Enregistrer' });
    userEvent.click(saveButton);

    // THEN
    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0].url).toBe(
        `/moderateur/fichiers?ressourceThematiqueId=${thematiqueId}`
      );
      expect(mockAxios.history.post[0].data).toEqual(formData);
    });

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent(
      "Une erreur est survenue lors de l'enregistrement de la ressource."
    );
  });
});
