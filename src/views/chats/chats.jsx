import React, { useEffect, useState } from 'react';
import './chats.css';
import ChatCard from './components/ChatCard';
import ChatDetails from './components/ChatDetails';

const Chats = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        fetch('https://randomuser.me/api?results=8')
            .then(response => response.json())
            .then(data => setUsers(data.results));
    }, []);

    const filteredUsers = users.filter(user =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="main-container">
            <div className="chats-container">
                <input 
                    type="text" 
                    placeholder="Buscar en mis chats" 
                    onChange={event => setSearchQuery(event.target.value)} 
                    className="search-input"
                />
                <div className="chats">
                    {filteredUsers.map((user, index) => (
                        <ChatCard 
                            key={index}
                            profilePic={user.picture.large} 
                            contactName={`${user.name.first} ${user.name.last}`} 
                            lastMessage="Hola!" 
                            onClick={() => setSelectedChat(user)}
                        />
                    ))}
                </div>
                <button className="fab">+</button>
            </div>
            <div className="chat-details">
                <ChatDetails chat={selectedChat} />
            </div>
        </div>
    );
};

export default Chats;