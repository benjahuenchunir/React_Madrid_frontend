import React, { useState, useEffect } from 'react';

async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }
    return response.json();
}

export async function addMessageToApi(idUser, idChat, message, selectedFiles, pinned = false, deletesAt = null, forwarded = false, respondingTo = null) {
    try {
        const formData = new FormData();
        formData.append('idUser', idUser);
        formData.append('idChat', idChat);
        formData.append('message', message);
        formData.append('pinned', pinned);
        if (deletesAt) formData.append('deletesAt', deletesAt);
        formData.append('forwarded', forwarded);
        if (respondingTo) formData.append('respondingTo', respondingTo);

        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        console.log('formData', formData);

        const data = await fetchData(import.meta.env.VITE_BACKEND_URL + '/messages', {
            method: 'POST',
            body: formData,
        });

        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function updateMessageInApi(idMessage, attributes) {
    try {
        const data = await fetchData(import.meta.env.VITE_BACKEND_URL + '/messages/' + idMessage, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attributes),
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
                const messagesWithRefs = data.map(msg => ({ ...msg, ref: React.createRef() }));
                setMessages(messagesWithRefs);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchChat();
    }, [chat]);

    const addMessage = async (idUser, idChat, message, selectedFiles, respondingTo, onSuccess, pinned = false, deletesAt = null, forwarded = false) => {
        const newMessage = await addMessageToApi(idUser, idChat, message, selectedFiles, pinned, deletesAt, forwarded, respondingTo);
        if (!newMessage) return; // TODO display error that message could not be sent
        newMessage.ref = React.createRef();
        setMessages(prevMessages => [...prevMessages, newMessage]);

        onSuccess();
    };

    const updateMessage = async (idMessage, attributes, onSuccess) => {
        const updatedMessage = await updateMessageInApi(idMessage, attributes)
        if (!updatedMessage) return; // TODO display error that message could not be updated

        setMessages(prevMessages => prevMessages.map(msg => {
            if (msg.id === idMessage) {
                updatedMessage.ref = msg.ref;
                return updatedMessage;
            } else {
                return msg;
            }
        }));

        onSuccess();
    };

    return [messages, addMessage, updateMessage];
};