import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      // Redirect to dashboard or homepage
    } catch (error) {
      console.error('Login error:', error.response.data.error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout');
      localStorage.removeItem('token');
      // Redirect to login page or homepage
    } catch (error) {
      console.error('Logout error:', error.response.data.error);
    }
  };

  const handlePasswordRecovery = async () => {
    try {
      await axios.post('http://localhost:8000/api/recover-password', { email });
      // Notify user that recovery email has been sent
    } catch (error) {
      console.error('Password recovery error:', error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login Form</h1>
      <div className="tab-navigation">
        <div className="tab active-tab">Login</div>
        <div className="tab">Signup</div>
      </div>
      <div className="form">
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <div className="forgot-password" onClick={handlePasswordRecovery}>
          Forgot password?
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <div className="signup-prompt">
          Not a member? <span className="signup-link">Signup now</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
