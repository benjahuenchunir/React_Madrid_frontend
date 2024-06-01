import React, { useEffect, useState } from 'react';
import './titleGroup.css';
import Button from "./button.jsx";


const TitleGroup = () => {

  return (
    <div className="title-container">
      <h1 id="landing-title">deepspace</h1>
      <h2>La única aplicación de mensajería que necesitas</h2>
      <div className="button-container">
        <Button text="Regístrate" to="/register"/>
        <Button text="Ingresa" to="/login"/>
      </div>
    </div>
  )
}

export default TitleGroup;