import React, { useEffect, useState } from 'react';
import { handleScroll as handleDesktopScroll } from './scrollers/desktopScroll.js';
import { handleScroll as handleMobileScroll } from './scrollers/mobileScroll.js';
import './featureGroup.css';

const FeatureGroup = () => {

  useEffect(() => {
    const handleScroll = window.innerWidth <= 600 ? handleMobileScroll : handleDesktopScroll;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="features-container">
      <div className="feature-title">
        <h2 id="features-title">Todo lo que necesitas en una interfaz sencilla</h2>
      </div>
      <div className="feature-columns">
        <div className="text-column">
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
        <div className="image-column">
          <img src="/desktop_chat_example.png" alt="Desktop chat example" className="hide-on-mobile desktop-chat-example"/>
          <img src="/mobile_chat_example.png" alt="Mobile chat example" className="show-only-mobile mobile-chat-example"/>
        </div>
      </div>
    </div>
  )
}

export default FeatureGroup