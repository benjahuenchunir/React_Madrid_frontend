import React, { useEffect, useState } from 'react';
import './chats.css';
import ChatCard from './components/ChatCard';

const Chats = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('https://randomuser.me/api?results=5')
            .then(response => response.json())
            .then(data => setUsers(data.results));
    }, []);

    const filteredUsers = users.filter(user =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div class="main-container">
            <div class="chats">
                <input 
                    type="text" 
                    placeholder="Buscar en mis chats" 
                    onChange={event => setSearchQuery(event.target.value)} 
                    class="search-input"
                />
                {filteredUsers.map((user, index) => (
                    <ChatCard 
                        key={index}
                        profilePic={user.picture.large} 
                        contactName={`${user.name.first} ${user.name.last}`} 
                        lastMessage="Hola!" 
                    />
                ))}
                <button class="fab">+</button>
            </div>
            <div class="chat-details">
                <h1>Detalles del chat</h1>
                <p>Selecciona un chat para ver los detalles</p>
            </div>
        </div>
    );
};

export default Chats;