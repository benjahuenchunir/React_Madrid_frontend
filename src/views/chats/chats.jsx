import { useEffect, useState } from 'react';
import './chats.scss';
import ChatCard from './components/ChatCard';
import ChatDetails from './components/ChatDetails';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useAuth } from './../../auth/useAuth';
import NewChatMenu from './components/NewChatMenu'

const Chats = () => {
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        let userId = null;
        const decodedToken = jwtDecode(token);
        userId = decodedToken.sub;

        let config = {
            method: 'get',
            url: import.meta.env.VITE_BACKEND_URL + `/chats?userId=${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios(config)
            .then(response => {
                setChats(response.data);
            })
            .catch(error => {
                console.log('error', error)
            });
        
    }, [token]);

    const filteredChats = chats.filter(chat =>
        `${chat.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div id="chats-container">
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
                            profilePic={chat.imageUrl}
                            contactName={`${chat.name}`}
                            lastMessage={chat.lastMessage}
                            onClick={() => setSelectedChat(chat)}
                        />
                    ))}
                </div>
                <button className="fab" onClick={()=> setIsCreatingChat(true)}>+</button>
                {isCreatingChat && <NewChatMenu onClose={()=> setIsCreatingChat(false)}/>}
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