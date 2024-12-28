import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAdmin = localStorage.getItem('admin');
 


    // console.log('stored Admin:', storedAdmin);

    
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin)); 
    }

    setLoading(false); 
  }, []);

  
  const registerUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); 
    setUser(userData); 
    // console.log('User Data being passed to loginUser:', userData); 
  };

  // Function to handle user login
  const loginUser = (userData) => {
    // console.log('User Data being passed to loginUser:', userData); 
    localStorage.setItem('user', JSON.stringify(userData)); 
    setUser(userData); 
    // console.log('User Data being passed to loginUser:', userData); 
  };

  // Function to handle admin login
  const adminLogin = (adminData) => {
    localStorage.setItem('admin', JSON.stringify(adminData)); 
    setAdmin(adminData); 
    sessionStorage.setItem('isAdminLoggedIn', 'true'); 
  };

  const logoutUser = () => {
    localStorage.removeItem('user'); 
    setUser(null); 

  };

  // Function to handle admin logout
const logoutAdmin = () => {
  localStorage.removeItem('admin'); 
  setAdmin(null); 
  sessionStorage.removeItem('isAdminLoggedIn'); 
  navigate('/admin-login', { replace: true }); 
};


  return (
    <AuthContext.Provider value={{ user, admin, registerUser, loginUser, adminLogin, logoutUser, logoutAdmin, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
