import React, { useState, useEffect } from 'react';
import { useAuth } from './../../../auth/useAuth';

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
    const api = useApi(token);

    useEffect(() => {
        console.log(chat)
        console.log(api)
        if (!chat) return;
        const fetchChat = async () => {
            try {
                console.log("retrieving chat " + chat.id)
                const data = await api.get(`/chats/${chat.id}`);
                const messagesWithRefs = data.map(msg => ({ ...msg, ref: React.createRef() }));
                setMessages(messagesWithRefs);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat]);

    const addMessage = async (idUser, idChat, message, selectedFiles, respondingTo, onSuccess, pinned = false, deletesAt = null, forwarded = false) => {
        try {
            const formData = new FormData();
            formData.append('idUser', idUser);
            formData.append('idChat', idChat);
            formData.append('message', message);
            formData.append('pinned', pinned);
            if (deletesAt) formData.append('deletesAt', deletesAt);
            formData.append('forwarded', forwarded);
            if (respondingTo) formData.append('respondingTo', respondingTo);
            console.log(selectedFiles);
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

    return [messages, addMessage, updateMessage, deleteMessage];
};

// useEffect(() => {
//     let ws; // WebSocket instance

//     const fetchChat = async () => {
//         if (!chat) return;
//         try {
//             const data = await fetchData(import.meta.env.VITE_BACKEND_URL + '/chats/' + chat.id);
//             const messagesWithRefs = data.map(msg => ({ ...msg, ref: React.createRef() }));
//             setMessages(messagesWithRefs);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const connectWebSocket = () => {
//         if (!chat) return;
//         // Assuming the WebSocket URL is based on your backend URL
//         const wsUrl = import.meta.env.VITE_BACKEND_URL.replace(/^http/, 'ws') + `/chats/${chat.id}/messages`;
//         console.log('Connecting to WebSocket:', wsUrl);
//         ws = new WebSocket(wsUrl);

//         ws.onmessage = (event) => {
//             console.log('WebSocket message:', event.data);
//             const newMessage = JSON.parse(event.data);
//             console.log('WebSocket message:', newMessage);
//             newMessage.ref = React.createRef();
//             setMessages(prevMessages => [...prevMessages, newMessage]);
//         };

//         ws.onerror = (error) => {
//             console.error('WebSocket error:', error);
//         };
//     };

//     fetchChat();
//     connectWebSocket();

//     return () => {
//         if (ws) {
//             ws.close();
//         }
//     };
// }, [chat]);