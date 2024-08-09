import { validatePassword } from '../PasswordValidation.helper';

describe('validatePassword', () => {
  it('should return false for an invalid password', () => {
    // GIVEN
    const password = 'Abc123@$';

    // WHEN
    const result = validatePassword(password);

    // THEN
    expect(result).toBe(false);
  });

  it('should return false for an invalid password', () => {
    // GIVEN
    const password = 'invalidpassword';

    // WHEN
    const result = validatePassword(password);

    // THEN
    expect(result).toBe(false);
  });

  it('should return false for a password with less than 12 characters', () => {
    // GIVEN
    const password = 'Abc123@$';

    // WHEN
    const result = validatePassword(password.substring(0, 11));

    // THEN
    expect(result).toBe(false);
  });

  it('should return false for a password without a lowercase letter', () => {
    // GIVEN
    const password = 'ABC123@$';

    // WHEN
    const result = validatePassword(password);

    // THEN
    expect(result).toBe(false);
  });

  it('should return false for a password without an uppercase letter', () => {
    // GIVEN
    const password = 'abc123@$';

    // WHEN
    const result = validatePassword(password);

    // THEN
    expect(result).toBe(false);
  });

  it('should return false for a password without a digit', () => {
    // GIVEN
    const password = 'Abcdef@$';

    // WHEN
    const result = validatePassword(password);

    // THEN
    expect(result).toBe(false);
  });

  it('should return false for a password without a special character', () => {
    // GIVEN
    const password = 'Abc12345';

    // WHEN
    const result = validatePassword(password);

    // THEN
    expect(result).toBe(false);
  });

  it('should return true for a valid password', () => {
    // GIVEN
    const password = 'Abc12345@SAT';

    // WHEN
    const result = validatePassword(password);

    // THEN
    expect(result).toBe(true);
  });

  it('should return false for a password with not allowed special character', () => {
    // GIVEN
    const password = 'Abc12345=SAT';

    // WHEN
    const result = validatePassword(password);

    // THEN
    expect(result).toBe(false);
  });
});
