import './signupForm.scss';

const SignupForm = () => {

  return (
    <div id="signup-form-container">  
      <div className="form-card">
        <form>
          <h1>Registrarse</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required/>
          </div>
          <h2>Datos personales</h2>
          <div className="side-by-side">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" required/>
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Apellido</label>
              <input type="text" id="lastname" name="lastname" required/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input type="tel" id="phone" name="phone" required/>
          </div>
          <h2>Foto de perfil</h2>
          <div className="form-group">
            <label htmlFor="profile-picture">Seleccionar archivo</label>
            <input type="file" id="profile-picture" name="profile-picture" accept="image/*"/>
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  )

}

export default SignupForm;