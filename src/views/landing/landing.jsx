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
        <img src="/ground_ship.svg" alt="Ship on ground" className="fixed-bottom"/>
      </div>
    </div>
  )
};

export default Landing;
