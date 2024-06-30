import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const AdminOnlyRoute = ({ children }) => {
    const { token, scope } = useAuth();

    if (token) {
        if (!(scope == 'admin')) {
            return <Navigate to="/chats" />;
        }
        return children;
    }
    return <Navigate to="/login" />;
}

AdminOnlyRoute.propTypes = {
    children: PropTypes.node.isRequired,
};