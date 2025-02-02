import axios from 'axios';

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
    // Get token from localStorage if it exists
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
          // Handle unauthorized error (e.g., redirect to login)
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden error
          console.error('Forbidden access');
          break;
        case 404:
          // Handle not found error
          console.error('Resource not found');
          break;
        case 500:
          // Handle server error
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

