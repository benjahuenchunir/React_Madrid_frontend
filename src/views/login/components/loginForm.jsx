import React, { useEffect, useRef } from 'react';
import './loginForm.css';

const LoginForm = () => {

  return (
    <div className="form-card">
      <form>
        <h1>Iniciar sesión</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required/>
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )

}

export default LoginForm;