import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './EmployeeNavBar.css'; 

const EmployeeNavBar = () => {
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
          <li><Link to="/profile" className="navItem">Home</Link></li>
          <li><Link to="/EmployeeForm" className="navItem">Personal Information</Link></li>
          <li><Link to="/project" className="navItem">Project Details</Link></li>

          <li><Link to="/finance" className="navItem">Salary & Payslips</Link></li>
          <li><Link to="/help" className="navItem">Help & Support:</Link></li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default EmployeeNavBar;
