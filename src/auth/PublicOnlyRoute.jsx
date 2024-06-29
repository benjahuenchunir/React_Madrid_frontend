import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import {jwtDecode} from "jwt-decode";

export const PublicOnlyRoute = ({ children }) => {
    const { token } = useAuth();

    if (token) {
        console.log(token);
        let decodedToken = jwtDecode(token);
        console.log(decodedToken);
        return <Navigate to="/chats" />;
    }

    return children;
}

PublicOnlyRoute.propTypes = {
    children: PropTypes.node.isRequired,
};