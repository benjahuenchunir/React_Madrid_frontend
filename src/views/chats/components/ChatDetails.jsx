import React from 'react';
import './ChatDetails.css';
import { useEffect, useRef, useState } from 'react';

const listA = [
    { text: 'Holaaaa?', date: new Date('2021-01-01T10:00:00Z') },
    { text: 'Holaaaa?', date: new Date('2021-01-01T10:00:00Z') },
    { text: 'Holaaaa?', date: new Date('2021-01-01T10:00:00Z') },
    { text: 'Holaaaa?', date: new Date('2021-01-01T10:00:00Z') },

    { text: 'Hola, cómo estas?', date: new Date('2022-01-01T10:00:00Z') },
    { text: 'Oye, terminaste la tarea de discretas?', date: new Date('2022-01-01T10:05:00Z') },
];

const listB = [
    { text: 'Hola, muy bien, gracias!', date: new Date('2022-01-01T10:02:00Z') },
    { text: 'Ni entendí el enunciado', date: new Date('2022-01-01T10:07:00Z') },
];

function createSampleChat() {
    const messages = [...listA.map(msg => ({ ...msg, received: true })), ...listB.map(msg => ({ ...msg, received: false }))]
    messages.sort((a, b) => a.date - b.date);
    return messages;
}

const ChatDetails = ({ chat, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const messageInputRef = useRef(null);

    useEffect(() => {
        setMessages(createSampleChat());
    }
        , [chat]);

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
        if (!text) return;
        const newMessage = {
            text,
            date: new Date(),
            received: false,
        };
        setMessages([...messages, newMessage]);
        messageInputRef.current.value = '';
        setSelectedFile(null);
    }

    if (chat === null) {
        return <div className='no-chat-selected'>
            <h1>Detalles del chat</h1>
            <p>Selecciona un chat para ver los detalles</p>
        </div>;
    }

    return (
        <div className='chat-details-container'>
            <div className="chat-info-container">
                <button onClick={onBack} className='mobile-only'>Back</button>
                <img src={chat.picture.large} alt="Profile" className="profile-pic" />
                <h2>{chat.name.first + " " + chat.name.last}</h2>
            </div>
            <div className="chat-container" ref={chatContainerRef}>
                {messages.map((msg, index) => (
                    <>
                        {index === 0 || !isSameDay(messages[index - 1].date, msg.date) ? (
                            <div key={index} className="day-tag">
                                {msg.date.toLocaleDateString()}
                            </div>
                        ) : null}
                        <div key={index} className={`message ${msg.received ? 'received' : 'sent'}`}>
                            <p>{msg.text}</p>
                            <span className="message-time">{msg.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>                        </div>
                    </>
                ))}
            </div>
            {selectedFile && (
                <div className="file-display">
                    <img src="src/assets/file_icon.svg" alt="Archivo" className='file-icon' />
                    <div className="file-info">
                        <div className="file-name">{selectedFile.name}</div>
                        <div className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</div>
                    </div>
                    <button className="remove-file" onClick={() => setSelectedFile(null)} />
                </div>
            )}            <div className="input-container">
                <button className="file-button" onClick={() => fileInputRef.current && fileInputRef.current.click()}></button>
                <input type="file" ref={fileInputRef} className='hidden' onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                    e.target.value = null;
                }} />                <input type="text" ref={messageInputRef} placeholder="Escribe un mensaje..." className="message-input" />
                <button className="send-button" onClick={() => addMessage()}>Enviar</button>
            </div>
        </div>
    );
};

export default ChatDetails;