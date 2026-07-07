import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (userData, tokenData) => {
        
        localStorage.setItem('token', tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        setToken(tokenData);
    };

    const logout = () => {
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token'); 
        
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};