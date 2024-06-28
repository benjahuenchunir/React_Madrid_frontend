import { useState, useEffect, useRef } from 'react';
import { useApi } from './api';
import { useAuth } from '../../../auth/useAuth';
import "./NewChatMenu.scss";
import PropTypes from 'prop-types';

const NewChatMenu = ({ onClose, buttonRef, onDMReceived, onNewDM }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const containerRef = useRef()
    const { token, idUser } = useAuth();
    const api = useApi(token);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.get(`/users`);
                setUsers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, [token]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                onClose()
            }
        }
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [buttonRef, onClose]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(filter.toLowerCase())
    );

    const onUserClicked = async (user) => {
        try {
            // Search for a DM that already has both users
            const idChat = await api.get(`/chats/users/${user.id}`);
            onDMReceived(idChat);
            onClose();
        } catch (error) {
            if (error.status === 404) {
                // If the DM doesn't exist, create a new one
                // Both users are owners of the chat
                // if both users are the same person it will create a chat with itself
                let newChat = {};
                if (user.id === idUser) {
                    newChat.name = 'Yo';
                    newChat.users = [{
                        id: user.id,
                        role: 'owner'
                    }];
                } else {
                    newChat.name = user.name + ' ' + user.lastName;
                    newChat.users = [{
                        id: user.id,
                        role: 'owner'
                    },
                    {
                        id: idUser,
                        role: 'owner'
                    }
                    ];
                }
                newChat.imageUrl = user.profilePictureUrl;
                newChat.canSendMessage = true;
                newChat.isCreatingDM = true;

                onNewDM(newChat);
                onClose()
            } else {
                console.error(error);
            }
        }
    }

    return (
        <div id="new-chat-menu" ref={containerRef}>
            <button id="btn-close" onClick={onClose} />

            <div id="inner-content">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Buscar usuario..."
                        value={filter}
                        onChange={handleFilterChange}
                        className='input-filter-users'
                    />
                </div>
                {filteredUsers.map(user => (
                    <div key={user.id} onClick={() => onUserClicked(user)} className="user-container">
                        <img src={user.profilePictureUrl} className='profile-picture' />
                        <p>{user.name} {user.lastName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

NewChatMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
    buttonRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    onDMReceived: PropTypes.func.isRequired,
    onNewDM: PropTypes.func.isRequired
}

export default NewChatMenu;