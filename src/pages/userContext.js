import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        }
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user,token, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
