import React, { createContext, useState } from 'react';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    const login = () => {
        setIsAdminAuthenticated(true);
    };

    const logout = () => {
        setIsAdminAuthenticated(false);
    };

    return (
        <AdminAuthContext.Provider value={{ isAdminAuthenticated, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
