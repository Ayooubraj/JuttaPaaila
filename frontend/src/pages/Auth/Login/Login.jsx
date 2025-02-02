import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../../axios';
import { useAuth } from '../../../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Login.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    console.log('Login attempt with:', formData);
    
    try {
      console.log('Sending login request...');
      const response = await authAPI.login(formData);
      console.log('Login response:', response);

      if (response.data.user && response.data.token) {
        login(response.data.user, response.data.token); // Pass both user and token
        
        setSnackbar({
          open: true,
          message: 'Login successful! Redirecting...',
          severity: 'success'
        });
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = 'An error occurred';
      
      if (err.response) {
        switch (err.response.status) {
          case 404:
            errorMessage = 'Account not found. Please check your email.';
            break;
          case 401:
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 400:
            errorMessage = err.response.data.message || 'Invalid credentials';
            break;
          default:
            errorMessage = 'Login failed. Please try again.';
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
          <h1>Welcome Back!</h1>
          <p className="tagline">Step into Style</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">👟</span>
              <p>Exclusive Shoe Collections</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛍️</span>
              <p>Easy Online Shopping</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <p>Fast Delivery Options</p>
            </div>
          </div>
        </div>
        
        <div className="auth-card">
          <div className="auth-logo">
            <img 
              src={require('../../../assets/images/shoe_img.jpg')}
              alt="Logo" 
              loading="lazy"
            />
          </div>
          <h2>Login</h2>
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
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
          <p className="auth-switch">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
          <p className="auth-switch">
            <Link to="/admin-login">Login as Admin?</Link>
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

export default Login;
