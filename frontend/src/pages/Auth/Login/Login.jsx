import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../../axios';
import { useAuth } from '../../../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Login.css';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const { login, verifyCode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userId, setUserId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [timeoutDuration, setTimeoutDuration] = useState(10); // 10 seconds timeout

  useEffect(() => {
    let timer;
    if (isLockedOut) {
      timer = setTimeout(() => {
        setIsLockedOut(false);
        setFailedAttempts(0); // Reset attempts after timeout
      }, timeoutDuration * 1000); // Convert seconds to milliseconds
    }
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [isLockedOut, timeoutDuration]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password,
        });
        // Handle successful login (e.g., store token, redirect)
        console.log(response.data.message);
    } catch (error) {
        console.error('Login error:', error.response.data.message);
        // Handle error (e.g., show error message)
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const token = await verifyCode(userId, verificationCode);
      // Store the token and redirect the user
      console.log('Logged in successfully with token:', token);
      // Redirect or update state as needed
    } catch (error) {
      console.error('Verification error:', error);
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
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          {!isVerified ? (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
              <button type="submit" className="auth-button" disabled={isLockedOut}>
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="auth-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="auth-button">
                Verify
              </button>
            </form>
          )}
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
