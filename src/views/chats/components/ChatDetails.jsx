import './ChatDetails.scss';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isSameDay } from './utils';
import { shouldDisplayUser } from './utils';
import { useFetchChat } from './api';

const current_user_id = 1; // TODO use actual user id

const ChatDetails = ({ chat, onBack }) => {
    const [messages, addMessage] = useFetchChat(chat);
    const [selectedFile, setSelectedFile] = useState(null);
    const [sentFiles, setSentFiles] = useState([]);
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
        if (!text && !selectedFile) return;
        addMessage(current_user_id, chat.id, text, messageInputRef);
        return 
        if (selectedFile) {
            const newSentFile = {
                file: selectedFile,
                messageId: newMessage.id
            };
            setSentFiles([...sentFiles, newSentFile]);
            setSelectedFile(null);
        }

        messageInputRef.current.value = '';
        setSelectedFile(null);
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        e.target.value = null;
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
                <button onClick={onBack} className='mobile-only'>Back</button>
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
                                {sentFiles.map((sentFile, index) => {
                                    if (sentFile.messageId === msg.id && msg.user.id === current_user_id) {
                                        return (
                                            <div key={index} className="message-file-display">
                                                <img src="/file_icon.svg" alt="Archivo" className='file-icon' />
                                                <div className="file-info">
                                                    <div className="file-name">{sentFile.file.name}</div>
                                                    <div className="file-size">{(sentFile.file.size / 1024).toFixed(2)} KB</div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                                {msg.message && <p className='message-text'>{msg.message}</p>}
                                <span className="message-time">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
            {selectedFile && (
                <div className="file-display">
                    <img src="/file_icon.svg" alt="Archivo" className='file-icon' />
                    <div className="file-info">
                        <div className="file-name">{selectedFile.name}</div>
                        <div className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</div>
                    </div>
                    <button className="remove-file" onClick={() => setSelectedFile(null)} />
                </div>
            )}            <div className="input-container">
                <button className="file-button" onClick={() => fileInputRef.current && fileInputRef.current.click()}></button>
                <input type="file" ref={fileInputRef} className='hidden' onChange={handleFileChange} />
                <input type="text" ref={messageInputRef} placeholder="Escribe un mensaje..." className="message-input" />
                <button className="send-button" onClick={() => addMessageToChat()}>Enviar</button>
            </div>
        </div>
    );
};

ChatDetails.propTypes = {
    chat: PropTypes.shape({
        id: PropTypes.number,
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        isDm: PropTypes.bool,
    }),
    onBack: PropTypes.func,
};

export default ChatDetails;