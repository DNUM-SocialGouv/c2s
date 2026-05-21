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

const hasPercentEncoding = (value: string): boolean => /%[0-9A-Fa-f]{2}/.test(value);

export const formatFileName = (fileName: string): string => {
  let decodedFileName = fileName;
  try {
    if (hasPercentEncoding(fileName)) {
      // Keep literal '+' for raw names, but treat '+' as space for old x-www-form-urlencoded values.
      decodedFileName = decodeURIComponent(fileName.replace(/\+/g, '%20'));
    }
  } catch (error) {
    console.error('Decoding failed:', error);
  }
  return decodedFileName;
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
            {truncateFileName(formatFileName(props.fileName), 55)}
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
