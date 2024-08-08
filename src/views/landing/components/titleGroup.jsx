import './titleGroup.scss';
import Button from "./button.jsx";
import { useAuth } from '../../../auth/useAuth';


const TitleGroup = () => {
  const { idUser } = useAuth();

  return (
    <div id="title-container">
      <h1 id="landing-title">deepspace</h1>
      <h2 id="landing-subtitle">La única aplicación de mensajería que necesitas</h2>
      {!idUser && <div className="button-container">
        <Button text="Regístrate" to="/register"/>
        <Button text="Ingresa" to="/login"/>
      </div>}
      
    </div>
  )
}

export default TitleGroup;