import './profileCard.scss';
import {Navigate} from "react-router-dom";

const ProfileCard = ( {userProfile, logout, handleDeleteAccount}) => {

    const handleEditUser = () => {
        window.location.href = '/edituser';
    }


    return (
        <div id="profile-card-container">
            <div className="profile-card">
                <div className="card-content">
                    <div className="profile-details">
                        <h1>{userProfile.name}</h1>
                        <h3>Email</h3>
                        <p>{userProfile.email}</p>
                        <h3>Teléfono</h3>
                        <p>{userProfile.phone}</p>
                    </div>
                    <div className="profile-photo">
                        {userProfile.profile_picture_url && (
                            <img src={userProfile.profile_picture_url} alt="Profile"/>
                        )}
                    </div>
                </div>
                <div className="button-group">
                    <button onClick={logout}>Cerrar Sesión</button>
                    <button onClick={handleEditUser}>Editar Perfil</button>
                    <button onClick={handleDeleteAccount}>Eliminar Cuenta</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
