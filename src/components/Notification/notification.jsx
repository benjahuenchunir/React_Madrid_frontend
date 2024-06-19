import PropTypes from 'prop-types';
import './notification.scss';


const Notification = ({ message, type, onClose }) => {
    if (message === null) {
        return null;
    }

    let title;
    switch(type) {
        case 'success':
            title = 'Éxito';
            break;
        case 'warning':
            title = 'Advertencia';
            break;
        case 'error':
            title = 'Error';
            break;
        default:
            title = '';
    }

    return (
        <div id="notification-container">
            <div className={`notification ${type}`}>
                <div className="notification-text">
                    <h2>{title}</h2>
                    <p>{message}</p>
                </div>
                <div className="close-button-container">
                  <button id="close-button" className="remove-file" onClick={onClose}/>
                </div>
            </div>
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(['success', 'warning', 'error']),
    onClose: PropTypes.func,
};


export default Notification;