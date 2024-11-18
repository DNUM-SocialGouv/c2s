import AutorenewIcon from '@mui/icons-material/Autorenew';
import './Loader.css';

interface LoaderPros {
  additionalClassName?: string;
}

export const Loader = ({ additionalClassName }: LoaderPros) => {
  let alertClassName = `loader__wrapper`;
  if (additionalClassName && additionalClassName.length > 0) {
    alertClassName += ` ${additionalClassName}`;
  }
  return (
    <div className={alertClassName} role="alert">
      <AutorenewIcon
        className="animate-spin"
        fontSize="inherit"
        style={{ fontSize: '16rem' }}
      />
    </div>
  );
};
