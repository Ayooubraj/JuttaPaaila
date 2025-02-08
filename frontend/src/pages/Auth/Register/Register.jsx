import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../../axios';
import { useAuth } from '../../../context/AuthContext';
import './Register.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const navigate = useNavigate();
  const { register, verifyCode } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      setMessage(response.data.message);
      setUserId(response.data.userId);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        setError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError(error.message || 'Registration failed. Please try again.');
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const token = await verifyCode(userId, formData.verificationCode);
      console.log('Registered successfully with token:', token);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Verification error:', error);
      setError('Invalid verification code. Please try again.');
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
              src={require('../../../assets/images/juttapaaila.png')} 
              alt="Logo" 
              loading="lazy"
            />
          </div>
          <h2>Create Account</h2>
          {error && <div className="error-message">{error}</div>}
          {!isVerified ? (
            <form onSubmit={handleRegister} className="auth-form">
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
          ) : (
            <form onSubmit={handleVerify} className="auth-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Verification Code"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({...formData, verificationCode: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="auth-button">
                Verify
              </button>
            </form>
          )}
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
