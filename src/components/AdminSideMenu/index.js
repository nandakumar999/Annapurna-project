import React from 'react';
import './index.css'; // Menu styling

const AdminSideMenu = ({ setActiveTab }) => {
  return (
    <div className="admin-side-menu">
      <ul className="admin-menu-list">
        <li className="admin-menu-item" onClick={() => setActiveTab('categories')}>
          Categories
        </li>
        <li className="admin-menu-item" onClick={() => setActiveTab('products')}>
          Products
        </li>
      </ul>
    </div>
  );
};

export default AdminSideMenu;
