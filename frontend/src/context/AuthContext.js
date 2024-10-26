import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAdmin = localStorage.getItem('admin');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user from local storage on page load
    }
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin)); // Restore admin from local storage on page load
    }
  }, []);

  // Function to handle user registration
  const registerUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    setUser(userData); // Set user state
  };

  // Function to handle user login
  const loginUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    setUser(userData); // Set user state
  };

  // Function to handle admin login
  const adminLogin = (adminData) => {
    localStorage.setItem('admin', JSON.stringify(adminData)); // Store admin data in local storage
    setAdmin(adminData); // Set admin state
  };

  // Function to handle logout (for both user and admin)
  const logoutUser = () => {
    localStorage.removeItem('user'); // Remove user from local storage
    localStorage.removeItem('admin'); // Remove admin from local storage
    setUser(null); // Clear user state
    setAdmin(null); // Clear admin state
  };

  return (
    <AuthContext.Provider value={{ user, admin, registerUser, loginUser, adminLogin, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
