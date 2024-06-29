import PropTypes from 'prop-types'
import './LoadingButton.scss'

const LoadingButton = ({ text, isLoading, onClick, className }) => {
    return (
        <button id="loading-button" disabled={isLoading} onClick={onClick} className={className}>
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                text
            )}
        </button>
    );
};

LoadingButton.propTypes = {
    text: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default LoadingButton;