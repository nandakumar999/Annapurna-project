import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './index.css';

const AdminLogin = () => {
  const { adminLogin } = useContext(AuthContext);
  const [adminPhNo, setAdminPhNo] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setMessage('Admin login successful!');
        console.log('Admin login successful:', adminPhNo);

        // Store admin phone number in localStorage
        localStorage.setItem('adminPhNo', adminPhNo);

        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1000);
      } else {
        setMessage('Incorrect credentials. Please try again.');
        console.error('Admin login failed: Incorrect credentials');
      }
    } catch (error) {
      setMessage(`Error during admin login: ${error.message}`);
      console.error('Error during admin login:', error);
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-login-title">Admin Login</h2>
      {message && <p className="admin-login-message">{message}</p>}
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <input
          className="admin-login-input"
          type="tel"
          placeholder="Phone Number"
          value={adminPhNo}
          onChange={(e) => setAdminPhNo(e.target.value)}
          required
        />
        <input
          className="admin-login-input"
          type="password"
          placeholder="Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          required
        />
        <button className="admin-login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
