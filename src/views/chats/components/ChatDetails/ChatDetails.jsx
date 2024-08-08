import PropTypes from 'prop-types'
import './ChatDetails.scss'
import { useState, useEffect, useRef } from 'react';
import { useApi } from '../../../../utils/api'
import FileDisplay from '../FileDisplay/FileDisplay'

const Sections = {
  GENERAL: 'General',
  MEMBERS: 'Miembros',
  FILES: 'Multimedia',
  LINKS: 'Enlaces'
}

function ChatDetails({ idChat, onClose, messages }) {
  const [chat, setChat] = useState(null)
  const [selectedSection, setSelectedSection] = useState(Sections.GENERAL)
  const api = useApi()
  const containerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            onClose();
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [onClose]);

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await api.get(`/chats/details/${idChat}`);
      if (status === 'success') {
        setChat(data)
      }
    };

    fetchData();
  }, [idChat]);

  const scrollToMessage = (idMessage) => {
    const message = messages.find(msg => msg.id === idMessage);
    if (message) {
        message.ref.current.scrollIntoView({
            behavior: 'smooth'
        });
    }
};

  const renderSectionContent = () => {
    if (!chat) {
      return <div>Cargando...</div>
    }
    switch (selectedSection) {
      case Sections.GENERAL:
        return (<div>
          <div className="row">
            <img src={chat.imageUrl} alt="Profile" className="profile-pic" />
            <h3 className="chat-name">{chat.name}</h3>
          </div>
          <h5>Creado el {new Date(chat.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</h5>
          <button id="btn-exit-chat">Salir</button>
        </div>);
      case Sections.MEMBERS:
        return (<div className="members-container">
          {chat.members.map((member) => (
            <div key={member.id} className="member-info">
              <img src={member.profilePictureUrl} alt={member.name} className="profile-pic" />
              <div>
                <div>{member.name}</div>
                <div>{member.role}</div>
              </div>
            </div>
          ))}
        </div>);
      case Sections.FILES:
        return <div className="files-container">
            {chat.files.map((file, index) => (
                <FileDisplay containerClass="square-file-container" file={file} key={index} onClick={()=>scrollToMessage(file.idMessage)} />
            ))
            }
            {chat.files.length === 0 && <div>No se han compartido archivos</div>}
        </div>;
      case Sections.LINKS:
        return <div className='urls-container'>
          {chat.urls.map((url, index) => (
            <div key={index} className="url-container">
              <a href={url.url} target="_blank" rel="noreferrer">{url.url}</a>
              <p onClick={()=> scrollToMessage(url.idMessage)}>Ir al mensaje</p>
            </div>
          ))
          }
          {chat.urls.length === 0 && <div>No se han compartido enlaces</div>}
        </div>;
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div id="chat-details-container" ref={containerRef}>
      <button onClick={() => onClose()} id='btn-close' />
      <div className="sections-container">
        {Object.entries(Sections).map(([key, value]) => (
          <div className={`section ${selectedSection === value ? 'selected' : ''}`} key={key} onClick={() => setSelectedSection(value)}>
            {value}
          </div>
        ))}
      </div>
      <div className="tab-container">
        {renderSectionContent()}
      </div>

    </div>
  );
}

ChatDetails.propTypes = {
  idChat: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired
}

export default ChatDetails;