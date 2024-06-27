import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './authProvider';

export const useAuth = () => {
    const { token, setToken, logout } = useContext(AuthContext);
    const idUser = token ? Number(jwtDecode(token).sub) : null;

    return { token, setToken, idUser, logout };
};