import { useState, useEffect, useRef } from 'react';
import { useApi } from '../../../../utils/api'
import { useAuth } from '../../../../auth/useAuth';
import "../NewChatMenu/NewChatMenu.scss";
import PropTypes from 'prop-types';
import { ChatModes } from '../../constants';
import LoadingButton from '../../../../components/LoadingButton/LoadingButton';

const NewChatState = {
    NORMAL: 'normal',
    SELECTING_USERS: 'selecting_users',
    CREATING_GROUP: 'creating_group'
}

const NewChatMenu = ({ onClose, buttonRef, onDMReceived, onNewDM, onNewGroup }) => {
    const [state, setState] = useState(false)
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const containerRef = useRef()
    const { idUser } = useAuth();
    const api = useApi();
    // For creating group
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [chatMode, setChatMode] = useState(ChatModes.EVERYONE)
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            const {status, data} = await api.get(`/users`);
            if (status === 'success') {
                setUsers(data);
            } else {
                // TODO display notice
            }
        };

        fetchUsers();
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [buttonRef, onClose]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleUserSelectChange = (userId) => {
        setSelectedUsers(prevSelectedUsers =>
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter(id => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    const filteredUsers = users.filter(user =>
        (user.name + ' ' + user.lastName).toLowerCase().includes(filter.toLowerCase()) || (user.id === idUser && 'yo'.includes(filter.toLowerCase()))
    );

    const onUserClicked = async (user) => {
        if (state === NewChatState.SELECTING_USERS) {
            handleUserSelectChange(user.id);
            return;
        }
        // Search for a DM that already has both users
        const { status, data } = await api.get(`/chats/dms/${user.id}`);
        if (status === 'success') {
            onDMReceived(data);
            onClose();
        } else if (status === 404) {
            // If the DM doesn't exist, create a new one
            // Both users are owners of the chat
            let newChat = {};
            if (user.id === idUser) {
                newChat.name = 'Yo';
            } else {
                newChat.name = user.name + ' ' + user.lastName;
                newChat.users = [{
                    id: user.id,
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
            // TODO display notice
        }
    }

    const onBack = () => {
        if (state === NewChatState.SELECTING_USERS) {
            setState(NewChatState.NORMAL)
            setSelectedUsers([]);
        } else {
            setState(NewChatState.SELECTING_USERS)
            setImagePreviewUrl('');
            setGroupName('');
            setChatMode(ChatModes.EVERYONE);
        }
    }

    const onNextClicked = () => {
        if (selectedUsers.length > 0) {
            setState(NewChatState.CREATING_GROUP)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onCreateClicked = async () => {
        if (!groupName) return;

            setIsLoading(true)
            const formData = new FormData();
            formData.append('name', groupName);
            formData.append('users', JSON.stringify(selectedUsers.map(id => ({
                id: id,
                role: 'member'
            }))));
            formData.append('mode', chatMode)
            formData.append('image', fileInputRef.current.files[0]);

            const { status, data } = await api.post(`/chats`, formData);
            if (status === 'success') {
                onNewGroup(data)
                onClose();
            } else {
                // TODO display notice
            }
            
            setIsLoading(false)
    }

    return (
        <div id="new-chat-menu" ref={containerRef}>
            {state !== NewChatState.NORMAL && <button id="btn-back" onClick={onBack} />}
            <button id="btn-close" onClick={onClose} />
            <div id="inner-content">
                {state === NewChatState.CREATING_GROUP ? (
                    <>
                        <div className="selected-users-preview">
                            {selectedUsers.slice(0, 3).map(id => {
                                const user = users.find(user => user.id === id);
                                return (
                                    <div key={id} className="user-container-small">
                                        <img src={user.profilePictureUrl} className='profile-picture' />
                                        <p>{user.name}</p>
                                    </div>
                                );
                            })}
                            {selectedUsers.length > 3 && <p>+{selectedUsers.length - 3} más</p>}
                        </div>
                        <div className="image-and-name-row">
                            {imagePreviewUrl ? (
                                <img src={imagePreviewUrl} alt="Group preview" className="image-preview" onClick={() => fileInputRef.current.click()} />
                            ) : (
                                <div className="image-preview-placeholder" onClick={() => fileInputRef.current.click()} />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className='input-group-image'
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                            <input
                                type="text"
                                placeholder="Nombre del grupo"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                className='input-group-name'
                            />
                        </div>
                        <div>
                            <label htmlFor="chatModeSelector">¿Quién puede mandar mensajes?</label>
                            <select id="chatModeSelector" value={chatMode} onChange={(event) => setChatMode(event.target.value)} className='report-type-selector'>
                                {Object.entries(ChatModes).map(([key, value]) =>
                                    value !== ChatModes.DM && (
                                        <option key={key} value={value}>
                                            {value}
                                        </option>)
                                )}
                            </select>
                        </div>
                        <LoadingButton
                            text="Crear grupo"
                            onClick={onCreateClicked}
                            className="create-button"
                            isLoading={isLoading}
                        />
                    </>
                ) : (
                    <>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Buscar usuario..."
                                value={filter}
                                onChange={handleFilterChange}
                                className='input-filter-users'
                            />
                        </div>
                        <div className="users-container">
                            {!(state === NewChatState.SELECTING_USERS) && <div onClick={() => setState(NewChatState.SELECTING_USERS)} className="user-container">
                                <p>+ Crear grupo</p>
                            </div>}
                            {filteredUsers.map(user =>
                                !(state === NewChatState.SELECTING_USERS && user.id === idUser) && (
                                    <div key={user.id} onClick={() => onUserClicked(user)} className="user-container">
                                        <img src={user.profilePictureUrl} className='profile-picture' />
                                        <p>{user.id === idUser ? 'Yo' : `${user.name} ${user.lastName}`}</p>
                                        {state === NewChatState.SELECTING_USERS && <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            className='user-selection-checkbox'
                                            readOnly={true}
                                        />}
                                    </div>)

                            )}
                            {filteredUsers.length === 0 && <div className="no-users">No se encontraron usuarios</div>}
                        </div>
                        {state === NewChatState.SELECTING_USERS && <button className="next-button" onClick={onNextClicked}> Siguiente</button>}
                    </>
                )}
            </div>

        </div>
    );
};

NewChatMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
    buttonRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    onDMReceived: PropTypes.func.isRequired,
    onNewDM: PropTypes.func.isRequired,
    onNewGroup: PropTypes.func.isRequired,
}

export default NewChatMenu;