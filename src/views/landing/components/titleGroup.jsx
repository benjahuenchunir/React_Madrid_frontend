import './titleGroup.scss';
import Button from "./button.jsx";


const TitleGroup = () => {

  return (
    <div id="title-container">
      <h1 id="landing-title">deepspace</h1>
      <h2 id="landing-subtitle">La única aplicación de mensajería que necesitas</h2>
      <div className="button-container">
        <Button text="Regístrate" to="/register"/>
        <Button text="Ingresa" to="/login"/>
      </div>
    </div>
  )
}

export default TitleGroup;