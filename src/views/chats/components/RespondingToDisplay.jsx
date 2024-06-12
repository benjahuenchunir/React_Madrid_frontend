import PropTypes from 'prop-types';
import FileDisplay from './FileDisplay';

const RespondingToDisplay = ({ messages, respondingTo, current_user_id, containerClass, onCancelCliked }) => {
    const handleClick = () => {
        const message = messages.find(msg => msg.id === respondingTo);
        message.ref.current.scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        respondingTo && (
            <div className={containerClass} onClick={handleClick}>
                {messages.filter(msg => msg.id === respondingTo).map((msg, index) => (
                    <div className='responding-to-content' key={index}>
                        <div className='message-preview-parent'>
                            <p className='sender-name'>{msg.user.id === current_user_id ? 'Yo' : msg.user.name}</p>
                            {msg.message && <p className='message-preview'>{msg.message}</p>}
                        </div>
                        {msg.files.map((file, index) => (
                            <FileDisplay key={index} containerClass="file-preview" file={file} />
                        ))}
                    </div>
                ))}
                {onCancelCliked && <button className="cancel-reply" onClick={onCancelCliked} />}
            </div>
        )
    );
};

RespondingToDisplay.propTypes = {
    messages: PropTypes.array.isRequired,
    respondingTo: PropTypes.number,
    current_user_id: PropTypes.number.isRequired,
    containerClass: PropTypes.string,
    onCancelCliked: PropTypes.func,
};

export default RespondingToDisplay;