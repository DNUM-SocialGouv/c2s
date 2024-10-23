export const isEmailValid = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isPhoneValid = (phone: string): boolean => {
  return /^(\d{4}|(([+\d]{3,5}|0)[\d]{9}))$/.test(phone);
};

export const pointAcceuilNumero = (
  currentPage: number,
  pageSize: number,
  index: number
) => {
  return pageSize * currentPage + index + 1;
};
