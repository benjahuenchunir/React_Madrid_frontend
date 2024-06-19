import './loginForm.scss';
import React, { useState } from "react";
import { useFetchLogin } from './api';
import Notification from '../../../components/Notification/notification';
import { useAuth } from '../../../auth/authProvider';

const LoginForm = () => {
  const { setToken } = useAuth();
  const [login] = useFetchLogin();
  const [notification, setNotification] = useState({ message: null, type: null });
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await login(event.target);
    let { status, data } = response;
    console.log(status)
    console.log(data)

    let message = "";
    if (typeof data === 'string') {
      message = data;
    } else {
      message = data.message;
    }

    if (status >= 200 && status < 300) {
      event.target.reset();
      setNotification({ message: message, type: 'success' });
      setIsNotificationVisible(true);

      const access_token = data.token;
      setToken(access_token);

    } else {
      console.error('Error al ingresar');
      setNotification({ message: `Error al ingresar: ${message}`, type: 'error' });
      setIsNotificationVisible(true);
    }
  }

  return (
    <div id="login-form-container">
      <div className="form-card">
        {isNotificationVisible && <Notification message={notification.message} type={notification.type} onClose={() => setIsNotificationVisible(false)} />}
        <form onSubmit={handleSubmit}>
          <h1>Iniciar sesión</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  )

}

export default LoginForm;