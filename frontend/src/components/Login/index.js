import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './index.css';

const Login = () => {
  const { loginUser, user } = useContext(AuthContext);
  const [userPhNo, setUserPhNo] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

   // Redirect to home if user is already logged in
   useEffect(() => {
    if (user) {
      navigate('/'); // Redirect to home if user is logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPhNo, userPassword }),
      });

      const data = await response.json();

      // Check if the response is true or false
      if (response.ok && data) {
        // Assuming your API returns true for successful login
        loginUser({ userPhNo }); // Save userPhNo to context (or modify as necessary)
        setMessage('Login successful!');
        console.log('Login successful:', userPhNo);

        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          navigate('/'); // Navigate to the home page after 3 seconds
        }, 2000);
      } else {
        setMessage('Incorrect credentials. Please try again.');
        console.error('Login failed: Incorrect credentials');
      }
    } catch (error) {
      setMessage('Error during login. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {message && <p className="login-message">{message}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="tel"
          placeholder="Phone Number"
          value={userPhNo}
          onChange={(e) => setUserPhNo(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
