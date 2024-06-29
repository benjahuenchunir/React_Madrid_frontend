import PropTypes from 'prop-types'
import './ChatDetails.scss'
import { useState, useEffect } from 'react';
import { useApi } from '../../../../utils/api'

const Sections = {
  GENERAL: 'General',
  MEMBERS: 'Miembros',
  FILES: 'Multimedia',
  LINKS: 'Enlaces'
}

function ChatDetails({ idChat, onClose }) {
  const [chat, setChat] = useState(null)
  const [selectedSection, setSelectedSection] = useState(Sections.GENERAL)
  const api = useApi()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chat = await api.get(`/chats/details/${idChat}`);
        console.log(chat);
        setChat(chat)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idChat]);

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
        return <div>Archivos del chat</div>;
      case Sections.LINKS:
        return <div>Enlaces del chat</div>;
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div id="chat-details-container">
      <button onClick={() => onClose()} id='btn-close' />
      <div className="sections-container">
        {Object.entries(Sections).map(([key, value]) => (
              <div className={`section ${selectedSection === value ? 'selected' : ''}`} key={key} onClick={()=> setSelectedSection(value)}>
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
}

export default ChatDetails;