import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify'

import './index.css';

const AdminLogin = () => {
  const { adminLogin,admin } = useContext(AuthContext);
  const [adminPhNo, setAdminPhNo] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLoggingIn, setIsAdminLoggingIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
      document.title = "Admin Login - Annapurna Farms";
  }, []);

  useEffect(() => {
    if (admin && !isAdminLoggingIn) {
      navigate('/');
    }
  }, [admin, isAdminLoggingIn, navigate]);

  // Regular expression for password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[|\\:;,.<>?/~`]).+$/;

  // Handle phone number input to allow only numbers
  const handlePhoneNumberChange = (e) => {
    // Replace any non-numeric characters with an empty string
    setAdminPhNo(e.target.value.replace(/\D/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setIsAdminLoggingIn(true);

    // Validate phone number (only numbers)
    if (!/^\d+$/.test(adminPhNo)) {
      toast.error('Phone number must contain only numbers.');
      setMessageType('error');
      return;
    }

    // Validate password using regex
    if (!passwordRegex.test(adminPassword)) {
      toast.error('Password must have an uppercase, lowercase, number, and special character');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminPhNo, adminPassword }),
      });

      const data = await response.json();

      if (response.ok && data === true) { // Adjust based on server response
        adminLogin({ adminPhNo });
        // Store admin phone number in localStorage
        localStorage.setItem('adminPhNo', adminPhNo);
        localStorage.setItem('admin', JSON.stringify({ adminPhNo })); // Store admin data
        toast.success('Admin login successful!');
        setMessageType('success');

        // Clear input fields on success
        setAdminPhNo('');
        setAdminPassword('');
        
        setTimeout(() => {
          // Navigate to dashboard with replace option to clear login from history
          setIsAdminLoggingIn(false)
          navigate('/admin-dashboard', { replace: true });
        }, 5000);
      } else {
        toast.error('Incorrect credentials. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      toast.error(`Error during admin login: ${error.message}`);
      setMessageType('error');
    }
  };

  return (
<div className="admin-login-container">
  <div className="admin-login-form-container">
    <h2 className="admin-login-title">Admin Login</h2>
    {message && <p className={`admin-login-message ${messageType}`}>{message}</p>}
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <input
        className="admin-login-input"
        type="tel"
        placeholder="Phone Number"
        value={adminPhNo}
        onChange={handlePhoneNumberChange} // Use custom handler for phone number input
        required
        maxLength="10" // Limit to 10 digits for phone number
      />
      <div className="admin-password-container">
        <input
          className="admin-login-input-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          required
        />
        <span 
          className="admin-password-icon" 
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <button
            className="admin-login-button"
            type="submit"
            disabled={isAdminLoggingIn}
          >
            {isAdminLoggingIn ? 'Logging in...' : 'Login'}
      </button>
    </form>
  </div>

  <div className="admin-login-content">
    <h2 className='admin-login_welcome'>Welcome to Admin</h2>
    <p className='admin-login_welcome_para'>Manage your admin portal efficiently</p>
  </div>
</div>

  );
};


export default AdminLogin;