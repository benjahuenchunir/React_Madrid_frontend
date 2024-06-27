import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './../../../auth/useAuth';
import { jwtDecode } from 'jwt-decode';

const ChangeType = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete'
  };

function useApi(token) {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    async function fetchApi(endpoint, { method = 'GET', body = null, headers = {} } = {}) {
        const url = `${baseUrl}${endpoint}`;
        const options = {
            method,
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: null,
        };
        if (body) {
            if (body instanceof FormData) {
                options.body = body;
                delete options.headers['Content-Type'];
            } else {
                options.body = ['POST', 'PATCH'].includes(method) ? JSON.stringify(body) : body;
            }
        }
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error, status: ${response.status}`);
        return response.json();
    }

    return {
        get: (endpoint) => fetchApi(endpoint),
        post: (endpoint, body) => fetchApi(endpoint, { method: 'POST', body }),
        patch: (endpoint, body) => fetchApi(endpoint, { method: 'PATCH', body }),
        delete: (endpoint) => fetchApi(endpoint, { method: 'DELETE' }),
    };
}

export const useFetchChat = (chat) => {
    const [messages, setMessages] = useState([]);
    const { token } = useAuth();
    const idUser = Number(jwtDecode(token).sub);
    const api = useApi(token);
    const webSocketRef = useRef(null);

    useEffect(() => {
        if (!chat) return;

        const fetchChat = async () => {
            try {
                const data = await api.get(`/chats/${chat.id}`);
                const messagesWithRefs = data.map(msg => ({ ...msg, ref: React.createRef() }));
                setMessages(messagesWithRefs);
                initializeWebSocket(chat.id);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchChat();

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

        webSocketRef.onopen = function() {
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

    const addMessage = async (idChat, message, selectedFiles, respondingTo, onSuccess, pinned = false, deletesAt = null, forwarded = false) => {
        try {
            const formData = new FormData();
            formData.append('idChat', idChat);
            formData.append('message', message);
            formData.append('pinned', pinned);
            if (deletesAt) formData.append('deletesAt', deletesAt);
            formData.append('forwarded', forwarded);
            if (respondingTo) formData.append('respondingTo', respondingTo);
            selectedFiles.forEach(file => formData.append('files', file));

            const newMessage = await api.post('/messages', formData);

            if (!newMessage) {
                console.error('Message could not be sent');
                return; // TODO display error that message could not be sent
            }

            newMessage.ref = React.createRef();
            setMessages(prevMessages => [...prevMessages, newMessage]);
            onSuccess();
        } catch (error) {
            console.error('Error adding message:', error);
            // TODO display error that message could not be sent
        }
    };

    const updateMessage = async (idMessage, attributes, onSuccess) => {
        try {
            const updatedMessage = await api.patch(`/messages/${idMessage}`, attributes);
            if (updatedMessage) {
                setMessages(prevMessages => prevMessages.map(msg => {
                    if (msg.id === idMessage) {
                        const updatedMsg = { ...msg, ...updatedMessage };
                        updatedMsg.ref = msg.ref; // Preserve the ref
                        return updatedMsg;
                    }
                    return msg;
                }));
                onSuccess();
            } else {
                console.error('Message could not be updated');
                // TODO: Display error that message could not be updated
            }
        } catch (error) {
            console.error('Error updating message:', error);
            // TODO: Display error that message could not be updated
        }
    };

    const deleteMessage = async (idMessage) => {
        try {
            await api.delete(`/messages/${idMessage}`);
            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== idMessage));
        } catch (error) {
            console.error('Error deleting message:', error);
            // TODO: Display error that message could not be deleted
        }
    };
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const reportMessage = async (idMessage, reportType, description, onSuccess, onError) => {
        try {
            await sleep(2000);
            const response = await api.post(`/reports`, {
                id_reporter: idUser,
                id_message: idMessage,
                message: description,
                type: reportType
            });
            onSuccess(response);
        } catch (error) {
            console.error('Error deleting message:', error);
            onError(error)
        }
    };

    return [messages, addMessage, updateMessage, deleteMessage, reportMessage, idUser];
};