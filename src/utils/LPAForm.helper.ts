export const isEmailValid = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isPhoneValid = (phone: string): boolean => {
  return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(phone);
};

export const pointAcceuilNumero = (
  currentPage: number,
  pageSize: number,
  index: number
) => {
  return pageSize * currentPage + index + 1;
};
