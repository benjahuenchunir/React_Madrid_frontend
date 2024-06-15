import { useEffect, useState, useContext } from 'react';
import './chats.scss';
import ChatCard from './components/ChatCard';
import ChatDetails from './components/ChatDetails';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';

const Chats = () => {
    const { token } = useContext(AuthContext);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        let userId = null;
        console.log("token:")
        console.log(token);
        console.log(typeof token);
        if (token != "null" && token != null && token != "" && token != undefined && token != "undefined") {
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
                    console.log('data', response.data);
                    setChats(response.data);
                })
                .catch(error => {
                    console.log('error', error)
                    setIsAuthorized(false);
                });
        } else {
            setIsAuthorized(false);
        }
        
    }, []);

    if (!isAuthorized) {
        return <p>Unauthorized</p>;
    }

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