import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { useAuth } from '../../auth/useAuth.js';
import './profile.scss';
import ProfileCard from './components/profileCard.jsx';

const Profile = () => {
    const svgRef = useRef(null);
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

    useEffect(() => {
        const adjustSvgPosition = () => {

            if (!svgRef.current) {
                return;
            }

            if (window.innerWidth > 1024) {
                svgRef.current.style.right = 0;
                svgRef.current.style.left = 'auto';
                return;
            }

            if (svgRef.current) {
                const svgWidth = svgRef.current.offsetWidth;
                const viewportWidth = window.innerWidth;
                const leftPosition = (viewportWidth - svgWidth) / 2;
                svgRef.current.style.left = `${leftPosition}px`;
            }
        };

        adjustSvgPosition();

        window.addEventListener('resize', adjustSvgPosition)


        return () => {
            window.removeEventListener('resize', adjustSvgPosition);
        };
    }, []);

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
            <div className="content">
                <div className="profile-container">
                    <img ref={svgRef} src="/ship_with_stars.svg" alt="Ship on ground" className="profile-fixed-bottom"/>
                    <ProfileCard
                        userProfile={userProfile}
                        logout={logout}
                        handleDeleteAccount={handleDeleteAccount}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
