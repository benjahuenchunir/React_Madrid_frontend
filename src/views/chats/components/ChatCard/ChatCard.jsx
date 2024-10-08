import PropTypes from 'prop-types';
import './ChatCard.scss';

const ChatCard = ({ profilePic, contactName, lastMessage, onClick }) => {
    return (
        <div id="chat-card" onClick={onClick}>
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <div className="chat-info">
                <div className="chat-info-top">
                    <h2 className="contact-name">{contactName}</h2>
                    {lastMessage && <p className="last-message-time">
                        {
                            (() => {
                                const messageDate = new Date(lastMessage.time);
                                const today = new Date();
                                if (messageDate.toDateString() === today.toDateString()) {
                                    return messageDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
                                } else {
                                    return messageDate.toLocaleDateString('es-ES', { weekday: 'short' });
                                }
                            })()
                        }
                    </p>}
                </div>
                {lastMessage && <p className="last-message">{lastMessage.message}</p>}
            </div>
        </div>
    );
};

ChatCard.propTypes = {
    profilePic: PropTypes.string.isRequired,
    contactName: PropTypes.string.isRequired,
    lastMessage: PropTypes.shape({
        time: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
};

export default ChatCard;