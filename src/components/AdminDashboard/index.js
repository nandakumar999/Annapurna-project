import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSideMenu from '../AdminSideMenu'; 
import AdminCategory from '../AdminCategory'; 
import AdminProducts from '../AdminProducts'; 
import AdminProductPrice from '../AdminProductPrice'
import AdminProfile from '../AdminProfile';
import AdminOrderDetails from '../AdminOrderDetails';
import { AuthContext } from '../../context/AuthContext'; 

import './index.css'; 

const AdminDashboard = () => {
  const { admin, loading} = useContext(AuthContext); // Get admin from AuthContext
  const [activeTab, setActiveTab] = useState('categories'); // Default to 'categories'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
        document.title = "Admin Portal - Annapurna Farms";
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!admin) {
        navigate('/admin-login', { replace: true });
      } else {
        // Push a new state to the history
        window.history.pushState(null, '', window.location.href);

        const handleBlockedBackNavigation = (event) => {
          event.preventDefault();
          navigate('/admin-dashboard', { replace: true });
        };

        // window.addEventListener('popstate', handleBlockedBackNavigation);

        // Cleanup to remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('popstate', handleBlockedBackNavigation);
        };
      }
    }
  }, [admin, loading, navigate]);

  useEffect(() => {
    // Check if admin is still logged in on component mount
    const isAdminLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/admin-login', { replace: true });
    }
  }, [navigate]);

  

  
  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return <AdminCategory />;
      case 'products':
        return <AdminProducts />;
      case 'productprice':
        return <AdminProductPrice />;
      case 'orderdetails':
        return <AdminOrderDetails />;
      case 'adminprofile':
        return <AdminProfile />;
      default:
        return <AdminCategory />; // Default to Categories component
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
  //   <div className="admin-dashboard">
  //     <AdminSideMenu setActiveTab={setActiveTab} />
  //     <div className="main-content">{renderContent()}</div>
  //   </div>
  // );
    <div className={`admin-dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}>
    {/* Sidebar Toggle Button (Hamburger) */}
    {!isSidebarOpen && (
      <button 
        className="sidebar-toggle" 
        onClick={toggleSidebar}>
        ☰
      </button>
    )}

    {/* Admin Side Menu */}
    <AdminSideMenu 
      setActiveTab={setActiveTab} 
      isSidebarOpen={isSidebarOpen} 
      toggleSidebar={toggleSidebar} 
    />

    {/* Main Content */}
    <div className="main-content">
      {renderContent()}
    </div>
  </div>
  );
};

export default AdminDashboard;
