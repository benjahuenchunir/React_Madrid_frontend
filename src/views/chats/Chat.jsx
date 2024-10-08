import './Chat.scss';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isSameDay } from './utils';
import { shouldDisplayUser } from './utils';
import { useFetchChat } from './api';
import MessageOptionsMenu from './components/MessageOptionsMenu/MessageOptionsMenu';
import FileDisplay from './components/FileDisplay/FileDisplay';
import OtherMessageDisplay from './components/OtherMessageDisplay/OtherMessageDisplay';
import FileGallery from './components/FileGallery/FileGallery';
import Picker from '@emoji-mart/react';
import ReportForm from './components/ReportForm/ReportForm';
import ChatDetails from './components/ChatDetails/ChatDetails';

const InputMode = {
    NORMAL: 'normal',
    RESPONDING_TO: 'responding_to',
    EDIT: 'edit',
    REPLY: 'reply'
};

const Chat = ({ chat, onBack, onChatCreated }) => {
    const [pinnedMessageId, setPinnedMessageId] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedMessageId, setSelectedMessageId] = useState(null)
    const [inputMode, setInputMode] = useState(InputMode.NORMAL);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const onChatChanged = () => {
        setSelectedFiles([])
        setInputMode(InputMode.NORMAL)
        setSelectedMessageId(null)
        setPickerVisible(false)
    }
    const [messages, addMessage, updateMessage, deleteMessage, reportMessage, idUser] = useFetchChat(chat, onChatChanged);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const messageInputRef = useRef(null);
    const pinnedMessages = messages.filter(msg => msg.pinned);
    const pinnedMessageIndex = pinnedMessages.findIndex(msg => msg.id === pinnedMessageId) + 1;
    const pickerRef = useRef(null);
    const reportDialogRef = useRef();
    // ChatDetails
    const [areDetailsShown, setAreDetailsShown] = useState(false);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;

            const handleScroll = () => {
                let wasLoopBroken = false;
                for (let i = messages.length - 1; i >= 0; i--) {
                    const msg = messages[i];
                    const offset = i === 0 ? 0 : 100;
                    if (msg.pinned && msg.ref.current && msg.ref.current.offsetTop - offset < chatContainer.scrollTop) {
                        setPinnedMessageId(msg.id);
                        wasLoopBroken = true;
                        break;
                    }
                }

                if (!wasLoopBroken) {
                    setPinnedMessageId(null)
                }
            };

            chatContainer.addEventListener('scroll', handleScroll);

            return () => {
                chatContainer.removeEventListener('scroll', handleScroll);
            };
        }
    }, [messages]);

    function handleSendClicked() {
        const text = messageInputRef.current.value
        if (inputMode === InputMode.RESPONDING_TO || inputMode === InputMode.NORMAL) {
            if (!text && selectedFiles.length === 0) return;
            addMessage(chat, text, selectedFiles, selectedMessageId, handleSuccessfullSend, onChatCreated);
        } else if (inputMode === InputMode.EDIT) {
            updateMessage(selectedMessageId, { message: text }, handleSuccessfullSend);
        }
    }

    const handleFileChange = (e) => {
        setSelectedFiles([...e.target.files]);
        e.target.value = null;
    };

    const handleMessageOptionClicked = (option, messageId) => {
        switch (option) {
            case 'Responder':
                setSelectedMessageId(messageId);
                setInputMode(InputMode.RESPONDING_TO);
                break;
            case 'Reenviar':
                console.log('Reenviar');
                break;
            case 'Fijar':
                updateMessage(messageId, { pinned: true });
                break;
            case 'Desfijar':
                updateMessage(messageId, { pinned: false });
                break;
            case 'Editar':
                messageInputRef.current.value = messages.find(msg => msg.id === messageId).message;
                setSelectedMessageId(messageId);
                setInputMode(InputMode.EDIT);
                break;
            case 'Eliminar':
                deleteMessage(messageId);
                break;
            case 'Reportar':
                reportDialogRef.current.open(messageId);
                break;
            default:
                break;
        }
    };

    const handleSuccessfullSend = () => {
        setSelectedFiles([]);
        setSelectedMessageId(null)
        messageInputRef.current.value = '';
        setInputMode(InputMode.NORMAL);
    }

    const handleCancelClicked = () => {
        setSelectedMessageId(null)
        if (inputMode === InputMode.EDIT) {
            messageInputRef.current.value = '';
        }
        setInputMode(InputMode.NORMAL);
    }

    const handleFileDownload = async (file) => {
        try {
          const response = await fetch(file.fileUrl);
          const data = await response.blob();
          const blobUrl = window.URL.createObjectURL(data);
          const anchor = document.createElement('a');
          anchor.href = blobUrl;
          anchor.download = file.fileName;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error('Download failed', error);
        }
      };

    if (chat === null) {
        return <div id='chat-container'>
            <div className='no-chat-selected'>
                <div>
                    <h1>Detalles del chat</h1>
                    <p>Selecciona un chat para ver los detalles</p>
                </div>
                <img src="/ground_ship.svg" alt="Ship on ground" className='background-ship' />
            </div>
        </div>;
    }

    return (
        <div id='chat-container'>
            <ReportForm messages={messages} idUser={idUser} ref={reportDialogRef} reportMessage={reportMessage} />
            <div className="chat-info-container" onClick={()=>{if (!areDetailsShown) setAreDetailsShown(true)}}>
                {areDetailsShown && <ChatDetails idChat={chat.id} onClose={()=>setAreDetailsShown(false)} messages={messages}/>}
                <button onClick={onBack} className='back-button mobile-only'>&larr;</button>
                <img src={chat.imageUrl} alt="Profile" className="profile-pic" />
                <h2 className="chat-name">{chat.name}</h2>
            </div>
            <div className="chat-container" ref={chatContainerRef}>
                {pinnedMessageId && (
                    <div className='pinned-message-container'>
                        <div className='pinned-message-header-container'>
                            <p className='pinned-message-header'>Mensaje pinneado #{pinnedMessageIndex}</p>
                            <img src='pin_icon_dark.svg' className='icon' />
                        </div>
                        <OtherMessageDisplay
                            messages={messages}
                            otherMessageId={pinnedMessageId}
                            current_user_id={idUser}
                            containerClass="responding-to-display"
                        />
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={msg.id} ref={msg.ref}>
                        {index === 0 || !isSameDay(new Date(messages[index - 1].time), new Date(msg.time)) ? (
                            <div key={`day-tag-${index}`} className="day-tag">
                                {new Date(msg.time).toLocaleDateString()}
                            </div>
                        ) : null}
                        <div className="message-container">
                            {shouldDisplayUser(chat, msg, messages[index - 1], idUser) ? (
                                <img src={msg.user.profilePictureUrl} alt="User" className="profile-picture" />
                            ) : (
                                !chat.isDm && <div className="profile-picture-placeholder"></div>
                            )}
                            <div className={`message ${msg.user.id === idUser ? 'sent' : 'received'}`}>
                                {shouldDisplayUser(chat, msg, messages[index - 1], idUser) && <div className="user-name">{msg.user.name}</div>}
                                <OtherMessageDisplay
                                    messages={messages}
                                    otherMessageId={msg.respondingTo}
                                    current_user_id={idUser}
                                    containerClass="responding-to-display"
                                />
                                {msg.files.map((sentFile, index) => {
                                    return (
                                        <FileDisplay key={index} containerClass="message-file-display" file={sentFile} onClick={() => handleFileDownload(sentFile)}/>
                                    );
                                })}
                                {msg.message && <p className='message-text'>{msg.message}</p>}
                                <div className="message-info-container">
                                    {msg.pinned && <img src='pin_icon.svg' className='icon' />}
                                    {msg.lastEditDate && <span>Editado</span>}
                                    <span className="message-time">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                                    {msg.user.id === idUser && <img src='single_check_icon.svg' className='icon' />} {/* TODO actually implement status */}
                                </div>
                                <MessageOptionsMenu onOptionClick={(option, messageId) => handleMessageOptionClicked(option, messageId)} idUser={idUser} message={msg} canSendMessage={chat.canSendMessage} />
                            </div>
                        </div>
                    </div>
                ))}
            </div >
            <div className="input-container">
                <div ref={pickerRef} id="emoji-picker" className={isPickerVisible ? '' : 'hidden'}>
                    <Picker onEmojiSelect={(emoji) => {
                        messageInputRef.current.value += emoji.native;
                        setPickerVisible(false); // Optionally hide picker after selection
                    }} onClickOutside={() => { if (isPickerVisible) setPickerVisible(false) }} locale='es' maxFrequentRows={0} theme='dark' />
                </div>
                <FileGallery files={selectedFiles} onClose={() => setSelectedFiles([])} />
                <OtherMessageDisplay
                    messages={messages}
                    otherMessageId={selectedMessageId}
                    current_user_id={idUser}
                    containerClass="responding-to-preview"
                    onCancelCliked={handleCancelClicked}
                />
                <div className={`input-wrapper ${selectedMessageId ? 'straight-top' : ''}`}>
                    {chat.canSendMessage ? (
                        <>
                            <input type="file" ref={fileInputRef} className='hidden' onChange={handleFileChange} multiple />
                            <button className="emoji-button" onClick={() => setPickerVisible(true)}></button>
                            <input type="text" ref={messageInputRef} placeholder="Escribe un mensaje..." className="message-input" onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleSendClicked();
                                }
                            }} />
                            <button className="file-button" onClick={() => fileInputRef.current && fileInputRef.current.click()}></button>
                        </>
                    ) : (
                        <p className="no-permissions-message">No tienes permisos para escribir en este chat</p>
                    )}
                </div>
            </div>
        </div>
    );
};

Chat.propTypes = {
    chat: PropTypes.shape({
        id: PropTypes.number,
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        canSendMessage: PropTypes.bool,
        isDm: PropTypes.bool,
    }),
    onBack: PropTypes.func,
    onChatCreated: PropTypes.func.isRequired
};

export default Chat;