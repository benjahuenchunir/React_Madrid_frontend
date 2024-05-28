import React from 'react';
import './ChatCard.css';

const ChatCard = ({ profilePic, contactName, lastMessage, onClick }) => {
    return (
        <div className="chat-card" onClick={onClick}>
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <div className="chat-info">
                <h2 className="contact-name">{contactName}</h2>
                <p className="last-message">{lastMessage}</p>
            </div>
        </div>
    );
};

export default ChatCard;