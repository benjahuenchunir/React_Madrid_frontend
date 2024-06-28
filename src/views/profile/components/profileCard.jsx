import './profileCard.scss';

const ProfileCard = ( {userProfile, logout, handleDeleteAccount}) => {

    return (
        <div id="profile-card-container">
            <div className="profile-card">
                <h1>{userProfile.name}</h1>
                <div className="card-content">
                    <div className="profile-details">
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
                    <button onClick={handleDeleteAccount}>Eliminar Cuenta</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
