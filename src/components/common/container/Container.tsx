import React, { HTMLProps } from 'react';

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl'; // Define your desired max-width values
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'default',
  ...props
}) => {
  const maxWidthClass = {
    default: '',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-6xl',
  }[maxWidth];

  return (
    <div
      className={`fr-container fr-mb-5w fr-mb-xl-7w fr-mb-lg-7w fr-mb-md-7w mx-auto px-4 sm:px-6 max-w-lg lg:px-8 ${maxWidthClass}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
