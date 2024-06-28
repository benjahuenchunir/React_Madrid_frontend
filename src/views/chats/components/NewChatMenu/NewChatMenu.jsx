import { useState, useEffect, useRef } from 'react';
import { useApi } from '../../api';
import { useAuth } from '../../../../auth/useAuth';
import "../NewChatMenu/NewChatMenu.scss";
import PropTypes from 'prop-types';
import { ChatModes } from '../../constants';

const NewChatState = {
    NORMAL: 'normal',
    SELECTING_USERS: 'selecting_users',
    CREATING_GROUP: 'creating_group'
}

const NewChatMenu = ({ onClose, buttonRef, onDMReceived, onNewDM }) => {
    const [state, setState] = useState(false)
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const containerRef = useRef()
    const { token, idUser } = useAuth();
    const api = useApi(token);
    // For creating group
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [chatMode, setChatMode] = useState(ChatModes.EVERYONE)
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const fileInputRef = useRef(null);

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
        console.log("gola")
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
        try {
            // Search for a DM that already has both users
            const idChat = await api.get(`/chats/dms/${user.id}`);
            onDMReceived(idChat);
            onClose();
        } catch (error) {
            if (error.status === 404) {
                // If the DM doesn't exist, create a new one
                // Both users are owners of the chat
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
        // try {
        //     const newChat = {
        //         name: 'Nuevo grupo',
        //         users: selectedUsers.map(id => ({
        //             id,
        //             role: 'owner'
        //         })),
        //         imageUrl: null,
        //         canSendMessage: true,
        //         isCreatingDM: false
        //     }
        //     const chat = await api.post(`/chats`, newChat);
        //     onDMReceived(chat.id);
        //     onClose();
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    }

    return (
        <div id="new-chat-menu" ref={containerRef}>
            {state !== NewChatState.NORMAL && <button id="btn-back" onClick={onBack} />}
            <button id="btn-close" onClick={onClose} />
            <div id="inner-content">
                {state === NewChatState.CREATING_GROUP ? (
                    <>
                        <div className="image-and-name-row">
                            {imagePreviewUrl ? (
                                <img src={imagePreviewUrl} alt="Group preview" className="image-preview" onClick={() => fileInputRef.current.click()} />
                            ) : (
                                <div className="image-preview-placeholder" onClick={() => fileInputRef.current.click()} />
                            )}
                            <input
                                type="file"
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
                        <select value={chatMode} onChange={(event) => setChatMode(event.target.value)} className='report-type-selector'>
                            {Object.entries(ChatModes).map(([key, value]) =>
                                value !== ChatModes.DM && (
                                    <option key={key} value={value}>
                                        {value}
                                    </option>)
                            )}
                        </select>
                        <button className="create-button" onClick={onCreateClicked}> Crear grupo</button>
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
    onNewDM: PropTypes.func.isRequired
}

export default NewChatMenu;