import { schema } from '../InformationTabValidationSchema.ts';

describe('InformationTabValidationSchema', () => {
  it('should validate the schema with valid data', async () => {
    const validData = {
      nom: 'John',
      prenom: 'Doe',
      telephone: '0612345678',
      fonction: 'Developer',
      nouveauMdp: 'Password123!',
      confirmMdp: 'Password123!',
    };

    await expect(schema.validate(validData)).resolves.toBe(validData);
  });

  it('should throw an error for missing required fields', async () => {
    const invalidData = {
      nom: '',
      prenom: '',
      telephone: '',
      fonction: '',
      nouveauMdp: '',
      confirmMdp: '',
    };

    await expect(schema.validate(invalidData)).rejects.toThrow();
  });

  it('should throw an error for invalid phone number', async () => {
    const invalidData = {
      nom: 'John',
      prenom: 'Doe',
      telephone: '1234567890',
      fonction: 'Developer',
      nouveauMdp: 'Password123!',
      confirmMdp: 'Password123!',
    };

    await expect(schema.validate(invalidData)).rejects.toThrow();
  });

  it('should throw an error for invalid password', async () => {
    const invalidData = {
      nom: 'John',
      prenom: 'Doe',
      telephone: '0612345678',
      fonction: 'Developer',
      nouveauMdp: 'password',
      confirmMdp: 'password',
    };

    await expect(schema.validate(invalidData)).rejects.toThrow();
  });

  it('should throw an error for mismatched passwords', async () => {
    const invalidData = {
      nom: 'John',
      prenom: 'Doe',
      telephone: '0612345678',
      fonction: 'Developer',
      nouveauMdp: 'Password123!',
      confirmMdp: 'DifferentPassword123!',
    };

    await expect(schema.validate(invalidData)).rejects.toThrow();
  });
});
