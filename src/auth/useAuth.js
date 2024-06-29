import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './authProvider';

export const useAuth = () => {
    const { token } = useContext(AuthContext);
    const decodedToken = token ? jwtDecode(token) : null;
    const idUser = decodedToken ? Number(decodedToken.sub) : null;
    const scope = decodedToken ? decodedToken.scope : null;
    return { ...useContext(AuthContext), idUser, scope };
}