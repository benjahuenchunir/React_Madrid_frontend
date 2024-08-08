import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../auth/useAuth.js';
import './profile.scss';
import ProfileCard from './components/profileCard.jsx';
import { useApi } from '../../utils/api'

const Profile = () => {
    const svgRef = useRef(null);
    const { logout, idUser } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const api = useApi();

    useEffect(() => {
        const fetchData = async () => {
            const {status, data} = await api.get(`/users/${idUser}`)
            if (status === 'success') {
                setUserProfile(data);
            } else {
                // TODO display notice
            }
        }

        fetchData();
    }, []);

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

    const handleDeleteAccount = async () => {
        if (userProfile) {
            const {status, data} = await api.delete(`/users/${userProfile.id}`)
            if (status === 'success') {
                console.log('Account deleted:', data);
                logout();
            } else {
                // TODO display notice
            }
        }
    };

    return (
        <div id="profile-container">
            <div className="content">
                <div className="profile-container">
                    <img ref={svgRef} src="/ship_with_stars.svg" alt="Ship on ground" className="profile-fixed-bottom" />
                    {userProfile && <ProfileCard
                        userProfile={userProfile}
                        logout={logout}
                        handleDeleteAccount={handleDeleteAccount}
                    />}
                </div>
            </div>
        </div>
    );
};

export default Profile;
