import { Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';

export const PublicRoute = ({children}) => {
    const { token } = useAuth();
  
    if (token) {
      return <Navigate to="/chats" />;
    }
  
    return children;
  }