import AutorenewIcon from '@mui/icons-material/Autorenew';
import './Loader.css';

export const Loader = () => {
  return (
    <div className="loader__wrapper" role="alert" data-testid="loader">
      <AutorenewIcon
        className="animate-spin"
        fontSize="inherit"
        style={{ fontSize: '8rem' }}
      />
    </div>
  );
};
