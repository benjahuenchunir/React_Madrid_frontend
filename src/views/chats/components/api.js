import { useState, useEffect } from 'react';

async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }
    return response.json();
}

export async function addMessageToApi(idUser, idChat, message, pinned = false, deletesAt = null, forwarded = false, respondingTo = null) {
    try {
        const data = await fetchData(import.meta.env.VITE_BACKEND_URL + '/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser,
                idChat,
                message,
                pinned,
                deletesAt,
                forwarded,
                respondingTo,
            }),
        });
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const useFetchChat = (chat) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchChat = async () => {
            if (!chat) return;
            try {
                const data = await fetchData(import.meta.env.VITE_BACKEND_URL + '/chats/' + chat.id);
                setMessages(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchChat();
    }, [chat]);

    const addMessage = async (idUser, idChat, message, messageInputRef, pinned = false, deletesAt = null, forwarded = false, respondingTo = null) => {
        const newMessage = await addMessageToApi(idUser, idChat, message, pinned, deletesAt, forwarded, respondingTo);
        messageInputRef.current.value = '';
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    return [messages, addMessage];
};