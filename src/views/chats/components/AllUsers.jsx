import { useState, useEffect } from 'react';
import { useApi } from './api';
import { useAuth } from './../../../auth/useAuth';
import "./AllUsers.scss";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

    const { token } = useAuth();
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
    });

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
        <div id="all-users-container">
            <input
                type="text"
                placeholder="Filter users..."
                value={filter}
                onChange={handleFilterChange}
            />
            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id} onClick={() => handleUserClick(user.id)}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;