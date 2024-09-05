import { schema } from './EstbalishmentInformationsValidationSchema';

describe('InformationTabValidationSchema', () => {
  it('should validate the schema with valid data', async () => {
    const validData = {
      societe: 'Sample Company',
      adresse: '123 Main St',
      ville: 'Sample City',
      codePostal: '12345',
      siren: '123456789',
      emailEntreprise: 'sample@example.com',
      telephone: '0612345678',
      siteWeb: 'https://example.com',
      pointAccueil: true,
    };

    await expect(schema.validate(validData)).resolves.toBe(validData);
  });

  it('should throw an error for missing required fields', async () => {
    const invalidData = {
      societe: '',
      adresse: '',
      ville: '',
      codePostal: '',
      siren: '',
      emailEntreprise: '',
      telephone: '',
      siteWeb: '',
      pointAccueil: false,
    };

    await expect(schema.validate(invalidData)).rejects.toThrow();
  });

  it('should throw an error for exceeding maximum length', async () => {
    const invalidData = {
      societe:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.',
      adresse:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.',
      ville:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.',
      codePostal: '123456',
      siren: '1234567890',
      emailEntreprise: 'sample@example.com'.repeat(10),
      telephone: '0612345678',
      siteWeb: 'https://example.com'.repeat(10),
      pointAccueil: true,
    };

    await expect(schema.validate(invalidData)).rejects.toThrow();
  });
});
