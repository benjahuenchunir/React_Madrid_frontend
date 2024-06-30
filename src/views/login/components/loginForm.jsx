import './loginForm.scss';
import { useState } from "react";
import { useApi } from '../../../utils/api'
import Notification from '../../../components/Notification/notification';
import { useAuth } from '../../../auth/useAuth';

const LoginForm = () => {
  const { setToken } = useAuth()
  const api = useApi();
  const [notification, setNotification] = useState({ message: null, type: null });
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { status, data } = await api.post('/auth/login', {
      email: event.target.email.value,
      password: event.target.password.value
    })
    if (status === 'success') {
      event.target.reset();
      setNotification({ type: 'success' });
      setIsNotificationVisible(true);
      const access_token = data.token;
      setToken(access_token);
    } else {
      setNotification({ message: `Error al ingresar: ${data}`, type: 'error' });
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