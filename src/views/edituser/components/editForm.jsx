import './editForm.scss';
import { useRef, useState } from "react";
import { useApi } from '../../../utils/api'
import Notification from '../../../components/Notification/notification';
import { useAuth } from "../../../auth/useAuth.js";

const EditForm = () => {
    const { idUser } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [notification, setNotification] = useState({ message: null, type: null });
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const fileInputRef = useRef(null);
    const api = useApi();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        e.target.value = null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', event.target.name.value);
        formData.append('last_name', event.target.lastname.value);
        formData.append('email', event.target.email.value);
        formData.append('password', event.target.password.value);
        formData.append('phone', event.target.phone.value);
        formData.append('file', selectedFile);
        const { status, data } = await api.patch('/users/' + idUser, formData)

        if (status === 'success') {
            event.target.reset();
            setSelectedFile(null);
            setNotification({ message: 'Perfil editado correctamente', type: 'success' });
            setIsNotificationVisible(true);
        } else {
            setNotification({ message: `Error al editar: ${data}`, type: 'error' });
            setIsNotificationVisible(true);
        }
    }

    return (
        <div id="edit-form-container">
            <div className="form-card">
                {isNotificationVisible && <Notification message={notification.message} type={notification.type} onClose={() => setIsNotificationVisible(false)} />}
                <form onSubmit={handleSubmit}>
                    <h1>Editar perfil</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <h2>Datos personales</h2>
                    <div className="side-by-side">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Apellido</label>
                            <input type="text" id="lastname" name="lastname" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input type="tel" id="phone" name="phone" required />
                    </div>
                    <h2>Foto de perfil</h2>
                    <div className="input-container">
                        {!selectedFile &&
                            <>
                                <button id="file-button" type="button" className="file-button"
                                    onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                    Seleccione un archivo
                                </button>
                                <input type="file" ref={fileInputRef} className='hidden' onChange={handleFileChange} accept="image/*"/>
                            </>
                        }
                        {selectedFile && (
                            <div className="file-display">
                                <div className="file-display-left-items">
                                    <img src="/file_icon.svg" alt="Archivo" className='file-icon' />
                                    <div className="file-info">
                                        <div className="file-name">{selectedFile.name}</div>
                                        <div className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</div>
                                    </div>
                                </div>
                                <div className="file-display-right-items">
                                    <button id="remove-file-button" className="remove-file" onClick={() => setSelectedFile(null)} />
                                </div>
                            </div>
                        )}
                    </div>
                    <button id="submit-button" type="submit">Guardar usuario</button>
                </form>
            </div>
        </div>
    )

}

export default EditForm;