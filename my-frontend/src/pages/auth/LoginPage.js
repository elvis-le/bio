import React from 'react';
import './LoginPage.scss';
import { FiMail, FiLock, FiEyeOff } from 'react-icons/fi'; // Cài đặt: npm install react-icons

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <div className="form-header">
            <h1>Hello!</h1>
            <p>Sign in to your account</p>
          </div>
          <form>
            <div className="input-group">
              <FiMail className="input-icon" />
              <input type="email" placeholder="E-mail" required />
            </div>
            <div className="input-group">
              <FiLock className="input-icon" />
              <input type="password" placeholder="Password" required />
              <FiEyeOff className="input-icon-right" />
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="signin-btn">SIGN IN</button>
          </form>
          <div className="create-account">
            <p>Don't have an account? <a href="#">Create</a></p>
          </div>
        </div>
        <div className="welcome-section">
            <div className="welcome-content">
                <h2>Welcome Back!</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra magna nisl, at posuere sem dapibus sed.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;