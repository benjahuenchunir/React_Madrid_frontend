import { useEffect, useState } from 'react';
import './chats.css';
import ChatCard from './components/ChatCard';
import ChatDetails from './components/ChatDetails';

const Chats = () => {
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/chats?userId=1') // TODO use actual user id
            .then(response => response.json())
            .then(data => setChats(data));
    }, []);

    const filteredChats = chats.filter(chat =>
        `${chat.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="main-container">
            <div className={`chats-container ${selectedChat && 'hide-on-mobile'}`}>
                <input
                    type="text"
                    placeholder="Buscar en mis chats"
                    onChange={event => setSearchQuery(event.target.value)}
                    className="search-input"
                />
                <div className="chats">
                    {filteredChats.map((chat, index) => (
                        <ChatCard
                            key={index}
                            profilePic={chat.image_url}
                            contactName={`${chat.name}`}
                            lastMessage={chat.last_message}
                            onClick={() => setSelectedChat(chat)}
                        />
                    ))}
                </div>
                <button className="fab">+</button>
            </div>
            <div className={`chat-details ${!selectedChat && 'hide-on-mobile'}`}>
                <ChatDetails
                    chat={selectedChat}
                    onBack={() => setSelectedChat(null)}
                />
            </div>
        </div>
    );
};

export default Chats;