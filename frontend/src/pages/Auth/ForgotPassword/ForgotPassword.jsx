import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import { authAPI } from '../../../axios';  // Updated import path for direct src location

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle password reset logic here
      console.log('Password reset requested for:', email);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-left">
          <h1>Password Recovery</h1>
          <p className="tagline">Get Back to Your Garden</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">📧</span>
              <p>Check Your Email</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <p>Reset Password Securely</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <p>Quick & Easy Process</p>
            </div>
          </div>
        </div>
        
        <div className="auth-card">
          {error && <div className="error-message">{error}</div>}
          <div className="auth-logo">
            <img 
              src={require('../../../assets/images/logo2.png')} 
              alt="Logo" 
              loading="lazy"
            />
          </div>
          <h2>Forgot Password?</h2>
          {!isSubmitted ? (
            <>
              <p className="reset-instructions">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="auth-button">
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="success-message">
              <span className="success-icon">✓</span>
              <h3>Check Your Email</h3>
              <p>We've sent password reset instructions to your email.</p>
            </div>
          )}
          <div className="auth-links">
            <Link to="/login" className="back-to-login">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
