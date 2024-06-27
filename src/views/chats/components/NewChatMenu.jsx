import { useState, useEffect, useRef } from 'react';
import { useApi } from './api';
import { useAuth } from '../../../auth/useAuth';
import "./NewChatMenu.scss";
import PropTypes from 'prop-types';

const NewChatMenu = ({ onClose, buttonRef }) => {
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

const onUserClicked = async (idOtherUser) => {
    try {
        const data = await api.get(`/chats/users/${idOtherUser}`);
        console.log(data)
    } catch (error) {
        console.error('Error:', error);
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
                <div key={user.id} onClick={() => onUserClicked(user.id)} className="user-container">
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
    buttonRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
}

export default NewChatMenu;