import './DowloadLink.css';

export interface DownloadLinkProps {
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileWeight: string | number;
}

export const DownloadLink = (props: DownloadLinkProps) => {
  return (
    <a
      className="fr-link--download fr-link fr-link--download__font-size"
      download="true"
      href={props.fileUrl}
    >
      <span className="fr-link--download__font-size">
        {props.fileName || ''}
      </span>
      <span
        className="fr-icon-download-line fr-icon--sm ml-2"
        aria-hidden="true"
      ></span>
      <br />
      <span className="fr-link__detail fr-link__detail--decoration">
        {props.fileType} – {props.fileWeight} ko
      </span>
    </a>
  );
};
