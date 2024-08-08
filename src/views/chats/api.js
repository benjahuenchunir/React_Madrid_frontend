import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useApi } from '../../utils/api'

const ChangeType = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete'
};

export const useFetchChat = (chat, onChatChanged) => {
    const [messages, setMessages] = useState([]);
    const { token, idUser } = useAuth();
    const api = useApi();
    const webSocketRef = useRef(null);

    useEffect(() => {
        if (!chat) return;

        const fetchChat = async () => {
            const { status, data } = await api.get(`/chats/${chat.id}`);
            if (status !== 'success') {
                console.error('Error fetching chat:', data);
                return; // TODO display error that chat could not be fetched
            }
            const messagesWithRefs = data.map(msg => ({ ...msg, ref: React.createRef() }));
            setMessages(messagesWithRefs);
            initializeWebSocket(chat.id);

        };

        if (chat.isCreatingDM) {
            console.log("Creating DM")
            setMessages([])
        } else {
            fetchChat();
        }

        onChatChanged();

        // Clean up WebSocket connection when component unmounts or chat changes
        return () => {
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat]);

    const initializeWebSocket = (chatId) => {
        const backendUrlWithoutProtocol = import.meta.env.VITE_BACKEND_URL.replace(/^http:\/\/|^https:\/\//, '');
        const wsUrl = `${import.meta.env.VITE_WS_PROTOCOL}://${backendUrlWithoutProtocol}/chats/${chatId}/messages?token=${encodeURIComponent(token)}`;
        webSocketRef.current = new WebSocket(wsUrl);

        webSocketRef.onopen = function () {
            console.log('WebSocket connection established');
        };

        webSocketRef.current.onmessage = (event) => {
            const { changeType, message } = JSON.parse(event.data);
            switch (changeType) {
                case ChangeType.CREATE:
                    message.ref = React.createRef();
                    setMessages(prevMessages => [...prevMessages, message]);
                    break;
                case ChangeType.DELETE:
                    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== message.id));
                    break;
                case ChangeType.UPDATE:
                    setMessages(prevMessages => prevMessages.map(msg => {
                        if (msg.id === message.id) {
                            const updatedMsg = { ...msg, ...message };
                            updatedMsg.ref = msg.ref; // Preserve the ref
                            return updatedMsg;
                        }
                        return msg;
                    }));
                    break;
            }
        };

        webSocketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        webSocketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };
    };

    const addMessage = async (chat, message, selectedFiles, respondingTo, onSuccess, onChatCreated, pinned = false, deletesAt = null, forwarded = false) => {
        let newChat;
        if (chat.isCreatingDM) {
            // If in creation mode first create the chat and switch back to normal mode
            // TODO it would be better to call a special method that creates both the chat and the message in one transaction
            const { status, data } = await api.post(`/chats`, {
                name: chat.name,
                mode: 'dm',
                users: chat.users
            });

            if (status !== 'success') {
                console.error('Error creating chat:', data);
                return; // TODO display error that chat could not be created
            } else {
                newChat = data;
            }
        }

        const formData = new FormData();
        formData.append('idChat', chat.isCreatingDM ? newChat.id : chat.id);
        formData.append('message', message);
        formData.append('pinned', pinned);
        if (deletesAt) formData.append('deletesAt', deletesAt);
        formData.append('forwarded', forwarded);
        if (respondingTo) formData.append('respondingTo', respondingTo);
        selectedFiles.forEach(file => formData.append('files', file));

        const { status, data } = await api.post('/messages', formData);

        if (status !== 'success') {
            console.error('Error adding message:', data);
            return; // TODO display error that message could not be sent
        }

        data.ref = React.createRef();
        setMessages(prevMessages => [...prevMessages, data]);
        onSuccess();

        if (chat.isCreatingDM) {
            onChatCreated(newChat); // Add the chat and reset the chatMode
        }
    };

    const updateMessage = async (idMessage, attributes, onSuccess) => {
        const { status, data } = await api.patch(`/messages/${idMessage}`, attributes);

        if (status !== 'success') {
            console.error('Message could not be updated');
            // TODO: Display error that message could not be updated
        } else {
            setMessages(prevMessages => prevMessages.map(msg => {
                if (msg.id === idMessage) {
                    const updatedMsg = { ...msg, ...data };
                    updatedMsg.ref = msg.ref; // Preserve the ref
                    return updatedMsg;
                }
                return msg;
            }));
            if (onSuccess) onSuccess();
        }
    };

    const deleteMessage = async (idMessage) => {
        const { status, data } = await api.delete(`/messages/${idMessage}`);
        if (status !== 'success') {
            console.error('Error deleting message:', data);
            // TODO: Display error that message could not be deleted
        } else {
            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== idMessage));
        }
    };

    const reportMessage = async (idMessage, reportType, description, onSuccess, onError) => {
        const { status, data } = await api.post(`/reports`, {
            id_reporter: idUser,
            id_message: idMessage,
            message: description,
            type: reportType
        });
        if (status !== 'success') {
            console.error('Error deleting message:', data);
            onError(data)
        } else {
            onSuccess(data);
        }
    };

    return [messages, addMessage, updateMessage, deleteMessage, reportMessage, idUser];
};