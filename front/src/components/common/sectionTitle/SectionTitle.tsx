// TODO: à vérifier, c'est plus un H2
type SectionTitleProps = {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export const SectionTitle = ({
  title,
  level = 3,
  className = '',
}: SectionTitleProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  const headingClassName = `mb-5 mt-3 text-[24px] ${className}`;
  return <HeadingTag className={headingClassName}>{title}</HeadingTag>;
};
