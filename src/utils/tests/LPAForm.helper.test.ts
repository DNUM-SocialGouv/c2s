import {
  isEmailValid,
  isPhoneValid,
  pointAcceuilNumero,
} from '../LPAForm.helper';

describe('isEmailValid', () => {
  it('should return true for a valid email', () => {
    // GIVEN
    const email = 'test@example.com';
    // WHEN
    const result = isEmailValid(email);
    // THEN
    expect(result).toBe(true);
  });

  it('should return false for an invalid email', () => {
    // GIVEN
    const email = 'invalid-email';
    // WHEN
    const result = isEmailValid(email);
    // THEN
    expect(result).toBe(false);
  });
});

describe('isPhoneValid', () => {
  it('should return true for a valid phone number', () => {
    // GIVEN
    const phone = '0123456789';
    // WHEN
    const result = isPhoneValid(phone);
    // THEN
    expect(result).toBe(true);
  });

  it('should return false for an invalid phone number', () => {
    // GIVEN
    const phone = 'invalid-phone';
    // WHEN
    const result = isPhoneValid(phone);
    // THEN
    expect(result).toBe(false);
  });
});

describe('pointAcceuilNumero', () => {
  it('should return a right numéro', () => {
    // GIVEN
    const pageSize = 10;
    const currentPage = 5;
    const index = 7;

    // WHEN
    const result = pointAcceuilNumero(currentPage, pageSize, index);

    // THEN
    expect(result).toEqual(58);
  });
});
