import './signupForm.scss';
import React, {useRef, useState} from "react";

const SignupForm = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    e.target.value = null;
  };

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
          <div className="input-container">
            {!selectedFile &&
              <>
                <button id="file-button" type="button" className="file-button"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                  Seleccione un archivo
                </button>
                <input type="file" ref={fileInputRef} className='hidden' onChange={handleFileChange}/>
              </>
            }
            {selectedFile && (
              <div className="file-display">
                <div className="file-display-left-items">
                  <img src="/file_icon.svg" alt="Archivo" className='file-icon'/>
                  <div className="file-info">
                    <div className="file-name">{selectedFile.name}</div>
                    <div className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</div>
                  </div>
                </div>
                <div className="file-display-right-items">
                  <button id="remove-file-button" className="remove-file" onClick={() => setSelectedFile(null)}/>
                </div>
              </div>
            )}
          </div>
          <button id="submit-button" type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  )

}

export default SignupForm;