import './DowloadLink.css';

interface DownloadLinkProps {
  fileName: string;
  fileWeigth: string;
  fileType: string;
  fileUrl: string;
}

export const DownloadLink = (props: DownloadLinkProps) => {
  return (
    <a
      className="fr-link--download fr-link fr-link--download__font-size"
      download="true"
      href={props.fileUrl}
    >
      <span className="fr-link--download__font-size">{props.fileName}</span>
      <br />
      <span className="fr-link__detail fr-link__detail--decoration">
        {props.fileType} – {props.fileWeigth} ko
      </span>
    </a>
  );
};
