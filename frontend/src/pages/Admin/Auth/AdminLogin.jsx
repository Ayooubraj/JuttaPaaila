import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../../axios';
import { useAuth } from '../../../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './AdminLogin.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: 'admin@gmail.com',
    password: 'admin',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Admin login attempt with:', formData);
    
    try {
      const response = await authAPI.adminLogin(formData);
      if (response.data.user && response.data.token) {
        login(response.data.user, response.data.token);
        
        setSnackbar({
          open: true,
          message: 'Admin login successful! Redirecting...',
          severity: 'success'
        });
        
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Admin login error:', err);
      let errorMessage = 'An error occurred';
      
      if (err.response) {
        switch (err.response.status) {
          case 404:
            errorMessage = 'Admin account not found. Please check your email.';
            break;
          case 401:
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 400:
            errorMessage = err.response.data.message || 'Invalid credentials';
            break;
          default:
            errorMessage = 'Admin login failed. Please try again.';
        }
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-left">
          <h1>Welcome Admin!</h1>
          <p className="tagline">Manage Your Dashboard</p>
        </div>
        
        <div className="auth-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
          <p className="auth-switch">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminLogin;
