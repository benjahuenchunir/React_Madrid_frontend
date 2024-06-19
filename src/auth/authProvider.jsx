import PropTypes from 'prop-types';
import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    function logout() {
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;