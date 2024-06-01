import React, { useEffect, useState } from 'react';
import './landing.css';
import TitleGroup from "./components/titleGroup.jsx";

const Landing = () => {

  return (
    <div className="landing-container">
      <div className="content-container">
        <div className="hero-container">
          <TitleGroup/>
          <div className="logo-container hide-on-tablet">
          </div>
        </div>
        <img src="/shipsstatic.svg" alt="Ships soaring through sky" className="fixed-top-right hide-on-tablet"/>
      </div>
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
      <div className="ship-container">
        <img src="/ground_ship.svg" alt="Ship on ground" className="fixed-bottom"/>
      </div>

    </div>
  )
};

export default Landing;
