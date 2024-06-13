import PropTypes from 'prop-types';
import FileDisplay from './FileDisplay';

const OtherMessageDisplay = ({ messages, otherMessageId, current_user_id, containerClass, onCancelCliked }) => {
    const handleClick = () => {
        const message = messages.find(msg => msg.id === otherMessageId);
        if (message) {
            message.ref.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    const msg = messages.find(msg => msg.id === otherMessageId);

    return (
        otherMessageId && (
            <div className={containerClass} onClick={handleClick}>
                <div className='responding-to-content'>
                    <div className='message-preview-parent'>
                        <p className='sender-name'>{msg && msg.user.id === current_user_id ? 'Yo' : msg ? msg.user.name : ''}</p>
                        <p className='message-preview'>{msg ? msg.message : 'El mensaje fue eliminado'}</p>
                    </div>
                    {msg && msg.files.map((file, index) => (
                        <FileDisplay key={index} containerClass="file-preview" file={file} />
                    ))}
                </div>
                {onCancelCliked && <button className="cancel-reply" onClick={onCancelCliked} />}
            </div>
        )
    );
};

OtherMessageDisplay.propTypes = {
    messages: PropTypes.array.isRequired,
    otherMessageId: PropTypes.number,
    current_user_id: PropTypes.number.isRequired,
    containerClass: PropTypes.string,
    onCancelCliked: PropTypes.func,
};

export default OtherMessageDisplay;