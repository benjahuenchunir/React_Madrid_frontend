import React from 'react';
import './ChatDetails.css';

const ChatDetails = ({ chat, onBack }) => {
    if (chat === null) {
        return <div className='no-chat-selected'>
            <h1>Detalles del chat</h1>
            <p>Selecciona un chat para ver los detalles</p>
        </div>;
    }

    const listA = [
    { text: 'Hola, como estas?', date: new Date('2022-01-01T10:00:00Z') },
    { text: 'Muy bien, gracias!', date: new Date('2022-01-01T10:05:00Z') },
];

const listB = [
    { text: 'Hola, gusto en conocerte!', date: new Date('2022-01-01T10:02:00Z') },
    { text: 'Gusto en conocerte también!', date: new Date('2022-01-01T10:07:00Z') },
];

const messages = [...listA.map(msg => ({ ...msg, received: true })), ...listB.map(msg => ({ ...msg, received: false }))];

messages.sort((a, b) => a.date - b.date);

    return (
        <div className='chat-details-container'>
            <div className="chat-info-container">
                <button onClick={onBack} className='mobile-only'>Back</button>
                <img src={chat.picture.large} alt="Profile" className="profile-pic" />
                <h2>{chat.name.first + " " + chat.name.last}</h2>
            </div>
            <div className="chat-container">
                {messages.map((msg, index) => (
                        <p key={index} className={`message ${msg.received ? 'received' : 'sent'}`}>
                            {msg.text}
                        </p>
                    ))}
            </div>
            <div className="input-container">
                <input type="text" placeholder="Escribe un mensaje..." className="message-input" />
                <button className="send-button">Enviar</button>
            </div>
        </div>
    );
};

export default ChatDetails;