import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MessageOptionsMenu = ({ onOptionClick, messageId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();
    const buttonRef = useRef();

    const options = [
        { label: 'Responder', onClick: () => onOptionClick('Responder', messageId) },
        { label: 'Reenviar', onClick: () => onOptionClick('Reenviar', messageId) },
        { label: 'Fijar', onClick: () => onOptionClick('Fijar', messageId) },
    ];

    const handleOptionClick = (option) => {
        setIsOpen(false);
        option.onClick();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current === event.target) {
                return;
            }

            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mouseup', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <button ref={buttonRef} className="message-options-button" onClick={() => setIsOpen(!isOpen)}>&#x25BC;</button>
            {isOpen && (
                <div ref={menuRef} className="message-options-menu">
                    {options.map((option, index) => (
                        <button key={index} onClick={() => handleOptionClick(option)}>
                            {option.label}
                        </button>
                    ))}
                </div>)}
        </>
    );
};

MessageOptionsMenu.propTypes = {
    onOptionClick: PropTypes.func.isRequired,
    messageId: PropTypes.string.isRequired,
};

export default MessageOptionsMenu;