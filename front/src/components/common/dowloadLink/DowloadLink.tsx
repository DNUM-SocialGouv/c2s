import './DowloadLink.css';

export interface DownloadLinkProps {
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileWeight: string | number;
  deleteFile?: () => void;
}

const truncateFileName = (fileName: string, maxLength: number) => {
  if (fileName.length <= maxLength) {
    return fileName;
  } else {
    return fileName.slice(0, maxLength) + '...';
  }
};

const formatFileName = (fileName: string, maxLength: number = 55): string => {
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
    <div>
      {props.fileName && (
        <a
          className="fr-link--download fr-link fr-link--download__font-size fr-link--no-bg"
          download="true"
          href={props.fileUrl}
        >
          <span className="fr-link--download__font-size">
            {formatFileName(props.fileName)}
          </span>
          <span
            className="fr-icon-download-line fr-icon--sm ml-2 inline-block"
            aria-hidden="true"
          ></span>
        </a>
      )}
      <p className="flex items-center">
        <span className="fr-link__detail fr-link__detail--decoration block">
          {props.fileType} – {props.fileWeight} ko
        </span>
        {props.deleteFile && (
          <button
            type="button"
            className="block ml-5 underline delete-file cursor-pointer"
            onClick={props.deleteFile}
          >
            Supprimer
          </button>
        )}
      </p>
    </div>
  );
};
