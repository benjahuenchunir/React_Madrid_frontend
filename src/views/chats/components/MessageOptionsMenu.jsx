import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MessageOptionsMenu = ({ onOptionClick, idUser, message, canSendMessage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();
    const buttonRef = useRef();

    const allOptions = [
        { label: 'Responder', onClick: () => onOptionClick('Responder', message.id), needsSendMessage: true, hasToBeHisMessage: false },
        { label: 'Reenviar', onClick: () => onOptionClick('Reenviar', message.id), needsSendMessage: false, hasToBeHisMessage: false },
        { label: (message.pinned ? 'Desfijar' : 'Fijar'), onClick: () => onOptionClick(message.pinned ? 'Desfijar' : 'Fijar', message.id), needsSendMessage: true, hasToBeHisMessage: false }, // TODO maybe this needs to be admin only
        { label: 'Editar', onClick: () => onOptionClick('Editar', message.id), needsSendMessage: true, hasToBeHisMessage: true },
        { label: 'Eliminar', onClick: () => onOptionClick('Eliminar', message.id), needsSendMessage: true, hasToBeHisMessage: true }, // TODO this could also be a admin feature if its not his message
    ]; 

    const options = allOptions.filter(option => (!option.needsSendMessage || canSendMessage) && (!option.hasToBeHisMessage || message.idUser === idUser));

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
    idUser: PropTypes.number.isRequired,
    message: PropTypes.object.isRequired,
    canSendMessage: PropTypes.bool.isRequired,
};

export default MessageOptionsMenu;