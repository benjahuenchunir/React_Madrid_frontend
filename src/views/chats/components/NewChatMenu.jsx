import { useState, useEffect } from 'react';
import { useApi } from './api';
import { useAuth } from '../../../auth/useAuth';
import "./NewChatMenu.scss";
import PropTypes from 'prop-types';

const NewChatMenu = ({onClose}) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

    const { token } = useAuth();
    const api = useApi(token);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.get(`/users`);
                console.log(data)
                setUsers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleUserClick = (userId) => {
        console.log(`User ${userId} clicked`);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div id="new-chat-menu">
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
                    <div key={user.id} onClick={() => handleUserClick(user.id)} className="user-container">
                        <img src={user.profilePictureUrl} className='profile-picture' />
                        <p>{user.name} {user.lastName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

NewChatMenu.PropTypes = {
    onClose: PropTypes.func.isRequired
}

export default NewChatMenu;