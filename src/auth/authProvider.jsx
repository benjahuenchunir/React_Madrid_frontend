import PropTypes from 'prop-types';
import { useState, useEffect, createContext } from 'react';
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          localStorage.setItem('token',token);
        } else {
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem('token')
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