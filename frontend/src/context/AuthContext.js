import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        return response; // Just return the response without handling login or navigation
    },
    (error) => {
        if (error.response) {
            // Handle specific error cases
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Forbidden access');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('An error occurred');
            }
        }
        return Promise.reject(error);
    }
);

// Auth endpoints
export const authAPI = {
    login: (data) => instance.post('/auth/login', data),
    adminLogin: (data) => instance.post('/admin/login', data),
    register: (data) => instance.post('/auth/register', data),
    logout: () => instance.post('/auth/logout'),
    forgotPassword: (email) => instance.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => instance.post(`/auth/reset-password/${token}`, { password })
};

// User endpoints
export const userAPI = {
    getProfile: () => instance.get('/user/profile'),
    updateProfile: (data) => instance.put('/user/profile', data),
    changePassword: (data) => instance.post('/user/change-password', data)
};

export default instance;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async ({ email, password }) => {
        const response = await instance.post('/auth/login', { email, password });
        setUser(response.data.user); // Assuming the response contains user data
        setToken(response.data.token); // Store the token
        localStorage.setItem('token', response.data.token); // Optionally store in localStorage
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token'); // Clear token from localStorage
    };

    const register = async (userData) => {
        const response = await axios.post('http://localhost:5000/api/auth/register', userData);
        setUser(response.data.user); // Ensure this includes the name
        return response.data; // Return userId for verification
    };

    const verifyCode = async (userId, code) => {
        const response = await axios.post('http://localhost:5000/api/auth/verify', { userId, code });
        return response.data.token; // Return the token
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, verifyCode }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 