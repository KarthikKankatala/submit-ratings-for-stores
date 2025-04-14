import React, { createContext, useState, useContext, useEffect } from 'react';
import { logoutUser } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        localStorage.setItem('token', token || '');
        localStorage.setItem('user', JSON.stringify(user));
    }, [token, user]);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
    };

    const logout = async () => {
        setToken(null);
        setUser(null);
        try {
            await logoutUser();
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle logout error if needed
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
