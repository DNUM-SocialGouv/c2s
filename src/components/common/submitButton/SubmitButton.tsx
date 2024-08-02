import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';
import LoopIcon from '@mui/icons-material/Loop';
import './SubmitButton.css';
interface SubmitButtonProps {
  isLoading?: boolean;
  isLoadingSubmit: boolean;
  buttonLabel: string;
  classname?: string;
  btnClassname?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  buttonLabel,
  isLoading,
  isLoadingSubmit,
  classname = '',
  btnClassname = '',
}) => {
  return (
    <div className={`form-group ${classname}`}>
      <button
        className={`fr-btn ${btnClassname}`}
        type="submit"
        disabled={isLoading || isLoadingSubmit}
      >
        {isLoading || isLoadingSubmit ? (
          <>
            <span>Chargement...</span>
            <LoopIcon className="animate-spin" style={{ fontSize: '24px' }} />
          </>
        ) : (
          <>
            <span>{buttonLabel}</span>
            <ArrowForwardIcon className="text-white text-2xl ml-2" />
          </>
        )}
      </button>
    </div>
  );
};
export default SubmitButton;
