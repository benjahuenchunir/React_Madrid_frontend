import './ChatDetails.scss';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isSameDay } from './utils';
import { shouldDisplayUser } from './utils';
import { useFetchChat } from './api';
import MessageOptionsMenu from './MessageOptionsMenu';
import FileDisplay from './FileDisplay';


const current_user_id = 1; // TODO use actual user id

const ChatDetails = ({ chat, onBack }) => {
    const [messages, addMessage] = useFetchChat(chat);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [respondingTo, setRespondingTo] = useState(null)
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const messageInputRef = useRef(null);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    function addMessageToChat() {
        const text = messageInputRef.current.value;
        if (!text && selectedFiles.length === 0) return;
        addMessage(current_user_id, chat.id, text, messageInputRef, selectedFiles, setSelectedFiles, respondingTo, setRespondingTo);
    }

    const handleFileChange = (e) => {
        setSelectedFiles([...e.target.files]);
        e.target.value = null;
    };

    const handleMessageOptionClicked = (option, messageId) => {
        switch (option) {
            case 'Responder':
                setRespondingTo(messageId);
                break;
            case 'Reenviar':
                console.log('Reenviar');
                break;
            case 'Fijar':
                console.log('Fijar');
                break;
            default:
                break;
        }
    };

    if (chat === null) {
        return <div className='chat-details-container'>
            <div className='no-chat-selected'>
                <div>
                    <h1>Detalles del chat</h1>
                    <p>Selecciona un chat para ver los detalles</p>
                </div>
                <img src="/ground_ship.svg" alt="Ship on ground" className='background-ship' />
            </div>
        </div>;
    }


    return (
        <div className='chat-details-container'>
            <div className="chat-info-container">
                <button onClick={onBack} className='back-button mobile-only'>&larr;</button>
                <img src={chat.imageUrl} alt="Profile" className="profile-pic" />
                <h2>{chat.name}</h2>
            </div>
            <div className="chat-container" ref={chatContainerRef}>
                {messages.map((msg, index) => (
                    <React.Fragment key={msg.id}>
                        {index === 0 || !isSameDay(new Date(messages[index - 1].time), new Date(msg.time)) ? (
                            <div key={`day-tag-${index}`} className="day-tag">
                                {new Date(msg.time).toLocaleDateString()}
                            </div>
                        ) : null}
                        <div className="message-container">
                            {shouldDisplayUser(chat, msg, messages[index - 1], current_user_id) ? (
                                <img src={msg.user.profilePictureUrl} alt="User" className="profile-picture" />
                            ) : (
                                !chat.isDm && <div className="profile-picture-placeholder"></div>
                            )}
                            <div className={`message ${msg.user.id === current_user_id ? 'sent' : 'received'}`}>
                                {shouldDisplayUser(chat, msg, messages[index - 1], current_user_id) && <div className="user-name">{msg.user.name}</div>}
                                
                                {msg.files.map((sentFile, index) => {
                                    return (
                                        <FileDisplay key={index} containerClass="message-file-display" file={sentFile} />
                                    );
                                })}
                                {msg.message && <p className='message-text'>{msg.message}</p>}
                                <span className="message-time">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                                <MessageOptionsMenu onOptionClick={(option, messageId) => handleMessageOptionClicked(option, messageId)} messageId={msg.id} />
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className="selected-files-container">
                {selectedFiles.map((file, index) => (
                    <FileDisplay key={index} containerClass="file-display" file={file} onRemove={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))} />
                ))}
            </div>
            <div className="input-container">
                {respondingTo && (
                    <div className="responding-to">
                        {messages.filter(msg => msg.id === respondingTo).map((msg, index) => (
                            <div className='responding-to-content' key={index}>
                                <div>
                                    <p className='sender-name'>{msg.user.id === current_user_id ? 'Yo' : msg.user.name}</p>
                                    {msg.message && <p className='message-preview'>{msg.message}</p>}
                                </div>
                                {msg.files.map((file, index) => (
                                    <FileDisplay key={index} containerClass="file-preview" file={file} />
                                ))}
                            </div>
                        ))}
                        <button className="cancel-reply" onClick={() => setRespondingTo(null)} />
                    </div>
                )}
                <div className={`input-wrapper ${respondingTo ? 'straight-top' : ''}`}>
                    {chat.canSendMessage ? (
                        <>
                            <input type="file" ref={fileInputRef} className='hidden' onChange={handleFileChange} multiple />
                            <button className="emoji-button"></button>
                            <input type="text" ref={messageInputRef} placeholder="Escribe un mensaje..." className="message-input" onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    addMessageToChat();
                                }
                            }} />
                            <button className="file-button" onClick={() => fileInputRef.current && fileInputRef.current.click()}></button>
                        </>
                    ) : (
                        <p className="no-permissions-message">No tienes permisos para escribir en este chat</p>
                    )}
                </div>
            </div>
        </div>
    );
};

ChatDetails.propTypes = {
    chat: PropTypes.shape({
        id: PropTypes.number,
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        canSendMessage: PropTypes.bool,
        isDm: PropTypes.bool,
    }),
    onBack: PropTypes.func,
};

export default ChatDetails;