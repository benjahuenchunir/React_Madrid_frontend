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
            <img src="src/assets/shipsstatic.svg" alt="Icono"/>
          </div>
        </div>
        <div className="features-container">
        </div>
      </div>
    </div>
  )
};

export default Landing;
