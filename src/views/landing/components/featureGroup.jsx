import React, { useEffect, useState } from 'react';
import { handleScroll } from './scroll.js';
import './featureGroup.css';

const FeatureGroup = () => {

  useEffect(() => {
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
          <img src="/chat_example.png" alt="Description of image"/>
        </div>
      </div>
    </div>
  )
}

export default FeatureGroup