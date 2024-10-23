export const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;

export function validatePassword(password: string): boolean {
  return passwordRegEx.test(password) && password.length >= 12;
}
