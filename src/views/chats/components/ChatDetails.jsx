import React from 'react';

const ChatDetails = ({ chat }) => {
    if (chat === null) {
        return <>
            <h1>Detalles del chat</h1>
            <p>Selecciona un chat para ver los detalles</p>
        </>;
    }

    return (
        <div>
            <h2>Chat Details</h2>
            <p>Chat Name: {chat.name.first}</p>
            {/* Add more chat details here */}
        </div>
    );
};

export default ChatDetails;