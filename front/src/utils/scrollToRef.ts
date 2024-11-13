import { RefObject } from 'react';

export const scrollToRef = (ref: RefObject<HTMLElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};
