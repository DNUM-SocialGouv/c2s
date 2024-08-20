interface InformationMessageProps {
  message: string;
}
export const InformationMessage: React.FC<InformationMessageProps> = ({
  message,
}) => {
  return (
    <div className="fr-alert fr-alert--info">
      <h4 className="fr-alert__title">Information : </h4>
      <p>{message}</p>
    </div>
  );
};
