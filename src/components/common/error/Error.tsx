interface ErrorMessageProps {
  message: string;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="fr-alert fr-alert--error fr-alert--sm bg-white">
      <p>{message}</p>
    </div>
  );
};
