import { useEffect } from 'react';
import { handleScroll } from './functions/desktopScroll.js';
import './featureGroup.scss';


const FeatureGroup = () => {

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="features-container">
      <div className="feature-title">
        <h2 id="features-title">Todo lo que necesitas en una interfaz sencilla</h2>
      </div>
      <div className="feature-columns">
        <div className="text-column">
          <ul>
            <li> Habla con otros usuarios directamente o crea grupos</li>
            <li> Comparte lo que quieras, como fotos o archivos pdf</li>
            <li> Accede desde tu dispositivo favorito</li>
          </ul>
        </div>
        <div className="image-column">
          <img src="/desktop_chat_example.png" alt="Desktop chat example" className="hide-on-tablet desktop-chat-scroll"/>
          <img src="/desktop_chat_example.png" alt="Desktop chat example" className="show-only-tablet mobile-chat"/>
          <img src="/mobile_chat_example.png" alt="Mobile chat example" className="show-only-mobile mobile-chat"/>
        </div>
      </div>
    </div>
  )
}

export default FeatureGroup