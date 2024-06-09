import './ChatDetails.scss';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const current_user_id = 1; // TODO use actual user id

const ChatDetails = ({ chat, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [sentFiles, setSentFiles] = useState([]);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const messageInputRef = useRef(null);

    useEffect(() => {
        if (!chat) return;
        fetch(import.meta.env.VITE_BACKEND_URL + '/chats/' + chat.id)
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Error:', error));
    }, [chat]);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    function isSameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    function addMessage() {
        const text = messageInputRef.current.value;
        if (!text && !selectedFile) return;
        const newMessage = {
            id: messages.length + 1,
            message: text,
            time: new Date(),
            user: {
                id: current_user_id,
                name: 'Yo'
            }
        };
        setMessages([...messages, newMessage]);

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

    function shouldDisplayUser(message, prevMessage) {
        if (chat.isDm) return false;
        if (message.user.id === current_user_id) return false;
        if (prevMessage && prevMessage.user.id === message.user.id) return false;
        return true;
    }

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
                        <div className={`message ${msg.user.id === current_user_id ? 'sent' : 'received'}`}>
                            {shouldDisplayUser(msg, messages[index - 1]) && <div className="user-name">{msg.user.name}</div>}
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
                <button className="send-button" onClick={() => addMessage()}>Enviar</button>
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