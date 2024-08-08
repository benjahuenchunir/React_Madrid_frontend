import { useEffect } from 'react';
import { handleScroll } from './functions/desktopScroll.js';
import Feature from './feature.jsx';
import './featureGroup.scss';


const FeatureGroup = () => {

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Get the image and text column elements
    var image = document.querySelector('.desktop-chat-scroll');
    var textColumn = document.querySelector('.text-column');

    // Create a function to set the margin-top of the text column
    function setImageMarginTop() {
      // Get the image's height
      var imageHeight = image.offsetHeight;

      // Set the margin-top of the text column to the image's height
      textColumn.style.marginTop = 30 + imageHeight + 'px';
    }

    // If the image is already loaded, set the margin-top immediately
    if (image.complete) {
      setImageMarginTop();
    } else {
      // Otherwise, set the margin-top when the image finishes loading
      image.onload = setImageMarginTop;
    }

    // Add an event listener for the resize event
    window.addEventListener('resize', setImageMarginTop);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', setImageMarginTop);
    };
  }, []);

  return (
    <div id="features-container">
      <div className="feature-title">
        <h2 id="features-title">Todo lo que necesitas en una interfaz sencilla</h2>
      </div>
      <div className="feature-columns">
        <div className="text-column">
          <Feature text="Habla con otros usuarios directamente o crea grupos"/>
          <Feature text="Comparte lo que quieras, como fotos o archivos pdf"/>
          <Feature text="Accede desde tu dispositivo favorito"/>
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