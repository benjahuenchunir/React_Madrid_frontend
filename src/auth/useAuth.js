import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './authProvider';

export const useAuth = () => {
    const { token } = useContext(AuthContext);
    const idUser = token ? Number(jwtDecode(token).sub) : null;
    return { ...useContext(AuthContext), idUser };
}