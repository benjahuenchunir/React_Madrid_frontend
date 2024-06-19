import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const ProtectedRoute = ({children}) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};