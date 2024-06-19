import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { useAuth } from '../auth/useAuth';
import './profile.scss';

const Profile = () => {
    const { token, logout } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        let userId = null;

        if (token && token !== 'null') {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.sub;

            const config = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(config)
                .then(response => {
                    setUserProfile(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                    setIsAuthorized(false);
                });
        } else {
            setIsAuthorized(false);
        }
    }, [token]);

    if (!isAuthorized) {
        return <p>Unauthorized</p>;
    }

    if (!userProfile) {
        return <p>Loading...</p>;
    }

    const handleDeleteAccount = () => {
        if (userProfile) {
            const config = {
                method: 'delete',
                url: `${import.meta.env.VITE_BACKEND_URL}/users/${userProfile.id}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(config)
                .then(response => {
                    console.log('Account deleted:', response.data);
                    logout(); 
                })
                .catch(error => {
                    console.error('Error deleting account:', error);
                });
        }
    };

    return (
        <div id="profile-container">
            <h1>Perfil de Usuario</h1>
            <div className="profile-details">
                <p><strong>Nombre:</strong> {userProfile.name}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Teléfono:</strong> {userProfile.phone}</p>
                {userProfile.profile_picture_url && (
                    <div className="profile-picture">
                        <img src={userProfile.profile_picture_url} alt="Profile" />
                    </div>
                )}
            </div>
            <button onClick={logout}>Cerrar Sesión</button>
            <button onClick={handleDeleteAccount}>Eliminar Cuenta</button>
        </div>
    );
};

export default Profile;
