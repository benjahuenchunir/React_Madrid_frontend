import React, { useEffect, useState } from 'react';
import './chats.css';
import ChatCard from './components/ChatCard';

const Chats = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://randomuser.me/api?results=5')
            .then(response => response.json())
            .then(data => setUsers(data.results));
    }, []);

    return (
        <div>
            {users.map((user, index) => (
                <ChatCard 
                    key={index}
                    profilePic={user.picture.large} 
                    contactName={`${user.name.first} ${user.name.last}`} 
                    lastMessage="Hello there!" 
                />
            ))}
        </div>
    );
};

export default Chats;