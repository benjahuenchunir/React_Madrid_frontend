import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './authProvider';

export const useAuth = () => {
<<<<<<< HEAD
<<<<<<< HEAD
    const { token } = useContext(AuthContext);
    const idUser = token ? Number(jwtDecode(token).sub) : null;
    return { ...useContext(AuthContext), idUser };
=======
=======
>>>>>>> cd6faf48bb20972d7562a309e547b4bf9dec0a32
    const { token, setToken, logout } = useContext(AuthContext);
    const idUser = token ? Number(jwtDecode(token).sub) : null;

    return { token, setToken, idUser, logout };
<<<<<<< HEAD
>>>>>>> feat(NewChatMenu): retrieve chat on user click
=======
>>>>>>> cd6faf48bb20972d7562a309e547b4bf9dec0a32
};