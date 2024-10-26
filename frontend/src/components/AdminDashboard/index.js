import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSideMenu from '../AdminSideMenu'; // Side menu component
import AdminCategory from '../AdminCategory'; // Category management page
import AdminProducts from '../AdminProduct'; // Products management page
import { AuthContext } from '../../context/AuthContext'; // Auth context
import './index.css'; 

const AdminDashboard = () => {
  const { admin } = useContext(AuthContext); // Get admin from AuthContext
  const [activeTab, setActiveTab] = useState('categories'); // Default to 'categories'
  const navigate = useNavigate();

  // Redirect to admin login if not authenticated
  useEffect(() => {
    if (!admin) {
      navigate('/admin-login');
    }
  }, [admin, navigate]);

  // Render different components based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return <AdminCategory />;
      case 'products':
        return <AdminProducts />;
      // Add more cases here as needed for future tabs
      default:
        return <AdminCategory />; // Default to Categories component
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSideMenu setActiveTab={setActiveTab} />
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;

