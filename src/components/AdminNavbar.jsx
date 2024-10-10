import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './AdminNavbar.css'; 

const AdminNavBar = () => {
  const navigate = useNavigate(); // React Router's useNavigate hook for redirection
  

  const handleLogout = () => {
    // Clear user data from localStorage or sessionStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/login'); // Adjust the path based on your routing
  };

  return (
    <nav className="navbar">
      <div className="navContainer">
        <h2 className="logo">EMS</h2>
        <ul className="navLinks">
          <li><Link to="/admindashboard" className="navItem">Home</Link></li>
          <li><Link to="/managedepartment" className="navItem">Manage Department</Link></li>
          <li><Link to="/manageemployee" className="navItem">Manage Employees</Link></li>
          <li><Link to="/admin-finance" className="navItem">Finance View</Link></li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavBar;
