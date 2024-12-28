import React from 'react';
import './index.css'; // Menu styling

const AdminSideMenu = ({ setActiveTab, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`admin-side-menu ${isSidebarOpen ? 'open' : ''}`}>
      {/* Close button only for mobile/tablet view */}
      {isSidebarOpen && (
        <button className="sidebar-close-btn" onClick={toggleSidebar}>
          ✖
        </button>
      )}

      <ul className="admin-menu-list">
        <li 
          className="admin-menu-item" 
          onClick={() => {
            setActiveTab('categories');
            if (isSidebarOpen) toggleSidebar(); // Close sidebar on mobile/tablet
          }}>
          Categories
        </li>
        <li 
          className="admin-menu-item" 
          onClick={() => {
            setActiveTab('products');
            if (isSidebarOpen) toggleSidebar();
          }}>
          Products
        </li>
        <li 
          className="admin-menu-item" 
          onClick={() => {
            setActiveTab('productprice');
            if (isSidebarOpen) toggleSidebar();
          }}>
          Price Grams
        </li>
        <li 
          className="admin-menu-item" 
          onClick={() => {
            setActiveTab('orderdetails');
            if (isSidebarOpen) toggleSidebar();
          }}>
          Order Details
        </li>
        <li 
          className="admin-menu-item" 
          onClick={() => {
            setActiveTab('adminprofile');
            if (isSidebarOpen) toggleSidebar();
          }}>
          Admin Profile
        </li>
      </ul>
    </div>
  );
};

export default AdminSideMenu;