import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './authProvider';

export const useAuth = () => {
<<<<<<< HEAD
    const { token } = useContext(AuthContext);
    const idUser = token ? Number(jwtDecode(token).sub) : null;
    return { ...useContext(AuthContext), idUser };
=======
    const { token, setToken, logout } = useContext(AuthContext);
    const idUser = token ? Number(jwtDecode(token).sub) : null;

    return { token, setToken, idUser, logout };
>>>>>>> feat(NewChatMenu): retrieve chat on user click
};