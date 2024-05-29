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
        { text: 'Holaaaa?', date: new Date('2021-01-01T10:00:00Z') },
        { text: 'Hola, cómo estas?', date: new Date('2022-01-01T10:00:00Z') },
        { text: 'Oye, terminaste la tarea de discretas?', date: new Date('2022-01-01T10:05:00Z') },
    ];

    const listB = [
        { text: 'Hola, muy bien, gracias!', date: new Date('2022-01-01T10:02:00Z') },
        { text: 'Ni entendí el enunciado', date: new Date('2022-01-01T10:07:00Z') },
    ];

    const messages = [...listA.map(msg => ({ ...msg, received: true })), ...listB.map(msg => ({ ...msg, received: false }))];
    messages.sort((a, b) => a.date - b.date);
    
    function isSameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    return (
        <div className='chat-details-container'>
            <div className="chat-info-container">
                <button onClick={onBack} className='mobile-only'>Back</button>
                <img src={chat.picture.large} alt="Profile" className="profile-pic" />
                <h2>{chat.name.first + " " + chat.name.last}</h2>
            </div>
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <>
                        {index === 0 || !isSameDay(messages[index - 1].date, msg.date) ? (
                            <div key={index} className="day-tag">
                                {msg.date.toLocaleDateString()}
                            </div>
                        ) : null}
                        <div key={index} className={`message ${msg.received ? 'received' : 'sent'}`}>
                            <p>{msg.text}</p>
                            <span className="message-time">{msg.date.toLocaleTimeString()}</span>
                        </div>
                    </>
                ))}
            </div>
            <div className="input-container">
                <button className="file-button"></button>
                <input type="text" placeholder="Escribe un mensaje..." className="message-input" />
                <button className="send-button">Enviar</button>
            </div>
        </div>
    );
};

export default ChatDetails;