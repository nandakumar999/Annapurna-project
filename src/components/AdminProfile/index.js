import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './index.css'; 

const AdminProfile = () => {
  const { loading } = useContext(AuthContext); 
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminPhone = localStorage.getItem('adminPhNo');

      // console.log("adminPhone:", adminPhone);
      if (!adminPhone) {
        setError("Admin phone is missing.");
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/admin/${adminPhone}`);
        if (!response.ok) {
          throw new Error('Failed to fetch admin profile');
        }
        const data = await response.json();
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setError("Unable to fetch admin profile. Please try again.");
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; 
  }

  if (error) {
    return <div className="error">{error}</div>; 
  }

  if (!adminData) {
    return <div className="loading">Loading admin details...</div>; 
  }

  return (
    <div className="admin-profile">
      <h1 className="admin-profile-heading">Admin Profile</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Admin Name</td>
            <td>{adminData.adminName}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{adminData.adminPhNo}</td>
          </tr>
          {/* <tr>
            <td>Password</td>
            <td>{adminData.adminPassword}</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProfile;