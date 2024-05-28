import React from 'react';
import './ChatDetails.css';

const ChatDetails = ({ chat, onBack }) => {
    if (chat === null) {
        return <>
            <h1>Detalles del chat</h1>
            <p>Selecciona un chat para ver los detalles</p>
        </>;
    }

    return (
        <div className='chat-details-container'>
            <div className="chat-info-container">
                <button onClick={onBack}>Back</button>
                <img src={chat.picture.large} alt="Profile" className="profile-pic" />
                <h2>{chat.name.first + " " + chat.name.last}</h2>
            </div>
            <div className="chat-container">
                
            </div>
        </div>
    );
};

export default ChatDetails;