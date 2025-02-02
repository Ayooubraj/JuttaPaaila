import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../../axios';
import { useAuth } from '../../../context/AuthContext';
import './Register.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register attempt with:', formData);
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      console.log('Sending register request...');
      const response = await authAPI.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      console.log('Full response from server:', response);

      console.log('Response data:', response.data);

      if (response.data && response.data.user) {
        const token = response.data.token || response.data.accessToken;
        login(response.data.user, token);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        console.log('Invalid response structure:', response.data);
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Register error:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        setError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError(error.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-left">
          <h1>Join Maali Today</h1>
          <p className="tagline">Start Your Gardening Journey</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🌱</span>
              <p>Access Premium Services</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏡</span>
              <p>Book Expert Gardeners</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌿</span>
              <p>Exclusive Member Benefits</p>
            </div>
          </div>
        </div>
        
        <div className="auth-card">
          <div className="auth-logo">
            <img 
              src={require('../../../assets/images/logo2.png')} 
              alt="Logo" 
              loading="lazy"
            />
          </div>
          <h2>Create Account</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Registration successful!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
