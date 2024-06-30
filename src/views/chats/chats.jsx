import { useEffect, useState, useRef } from 'react';
import './chats.scss';
import ChatCard from './components/ChatCard/ChatCard';
import Chat from './Chat';
import NewChatMenu from './components/NewChatMenu/NewChatMenu'
import { useApi } from '../../utils/api';

const Chats = () => {
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const fabRef = useRef()
    const api = useApi();

    useEffect(() => {
        const fetchChats = async () => {
            const { status, data } = await api.get(`/chats`);
            if (status === 'success') {
                console.log(data);
                setChats(data);
            } else {
                console.error('Error fetching chats:', data);
            }
        }
        fetchChats();
    }, []);

    const filteredChats = chats.filter(chat =>
        `${chat.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onChatCreated = (chat) => {
        setChats([...chats, chat]);
        setSelectedChat(chat);
    }

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
                    {filteredChats.length === 0 && <div className="no-chats">No se encontraron chats</div>}
                </div>
                <button className="fab" onClick={() => setIsCreatingChat(true)} ref={fabRef}>+</button>
                {isCreatingChat &&
                    <NewChatMenu
                        onClose={() => setIsCreatingChat(false)}
                        buttonRef={fabRef}
                        onDMReceived={(idChat) => {
                            setSelectedChat(chats.find(
                                chat => chat.id === idChat
                            ))
                        }
                        }
                        onNewDM={(chat) => {
                            setSelectedChat(chat)
                        }} 
                        onNewGroup={(chat) => {
                            setChats([...chats, chat])
                            setSelectedChat(chat)
                        }}
                        />}
            </div>
            <div className={`chat-details ${!selectedChat && 'hide-on-mobile'}`}>
                <Chat
                    chat={selectedChat}
                    onBack={() => setSelectedChat(null)}
                    onChatCreated={onChatCreated}
                />
            </div>
        </div>
    );
};

export default Chats;