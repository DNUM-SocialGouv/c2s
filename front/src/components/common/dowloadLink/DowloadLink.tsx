import './DowloadLink.css';

export interface DownloadLinkProps {
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileWeight: string | number;
}

const truncateFileName = (fileName: string, maxLength: number) => {
  if (fileName.length <= maxLength) {
    return fileName;
  } else {
    return fileName.slice(0, maxLength) + '...';
  }
};

const formatFileName = (fileName: string, maxLength: number = 20): string => {
  let decodedFileName;
  try {
    decodedFileName = decodeURIComponent(fileName).replace(/\+/g, ' ');
  } catch (error) {
    console.error('Decoding failed:', error);
    decodedFileName = fileName.replace(/\+/g, ' ');
  }
  return truncateFileName(decodedFileName, maxLength);
};

export const DownloadLink = (props: DownloadLinkProps) => {
  return (
    <a
      className="fr-link--download fr-link fr-link--download__font-size"
      download="true"
      href={props.fileUrl}
    >
      <span className="fr-link--download__font-size">
        {formatFileName(props.fileName) || ''}
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
