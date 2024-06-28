import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { jwtDecode } from "jwt-decode";

export const AdminOnlyRoute = ({ children }) => {
    const { token } = useAuth();

    if (token) {
        let decodedToken = jwtDecode(token);
        if (!(decodedToken.scope == 'admin')) {
            return <Navigate to="/chats" />;
        }
        return children;
    }
    return <Navigate to="/login" />;
}

AdminOnlyRoute.propTypes = {
    children: PropTypes.node.isRequired,
};