import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './AdminDashboard.css'; // Custom CSS for styling
import AdminNavBar from '../components/AdminNavbar';

import AdminFooter from '../components/AdminFooter';


const AdminDashboard = () => {
  const navigate = useNavigate();

  // Dummy data for quick statistics
  const totalEmployees = 250;
  const totalDepartments = 5;
  const recentEmployees = [
    // More employees can be added here for testing pagination
    { id: 1001, name: 'John Doe', department: 'Engineering' },
    { id: 1002, name: 'Jane Smith', department: 'HR' },
    { id: 1003, name: 'Mike Johnson', department: 'Finance' },
    { id: 1004, name: 'Emily Davis', department: 'Marketing' },
    { id: 1005, name: 'Paul Walker', department: 'Operations' },
    { id: 1001, name: 'John Doe', department: 'Engineering' },
    { id: 1002, name: 'Jane Smith', department: 'HR' },
    { id: 1003, name: 'Mike Johnson', department: 'Finance' },
    { id: 1004, name: 'Emily Davis', department: 'Marketing' },
    { id: 1005, name: 'Paul Walker', department: 'Operations' },
    { id: 1001, name: 'John Doe', department: 'Engineering' },
    { id: 1002, name: 'Jane Smith', department: 'HR' },
    { id: 1003, name: 'Mike Johnson', department: 'Finance' },
    { id: 1004, name: 'Emily Davis', department: 'Marketing' },
    { id: 1005, name: 'Paul Walker', department: 'Operations' },
    { id: 1001, name: 'John Doe', department: 'Engineering' },
    { id: 1002, name: 'Jane Smith', department: 'HR' },
    { id: 10003, name: 'Mike Johnson', department: 'Finance' },
    { id: 1004, name: 'Emily Davis', department: 'Marketing' },
    { id: 1005, name: 'Paul Walker', department: 'Operations' },
  ];
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5; // Set the number of employees per page

  // Calculate total number of pages
  const totalPages = Math.ceil(recentEmployees.length / employeesPerPage);

  // Get current employees to display on the page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = recentEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Scroll to top when page changes
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // scrollToTop();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // scrollToTop();
    }
  };

  return (
    <>
      <AdminNavBar />

      <div className="admin-dashboard">
        <h2 className="Title">Admin Dashboard</h2>

        {/* Quick Stats Section */}
        <div className="dashboard-statistics">
          <div className="stat-card">
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>
          <div className="stat-card">
            <h3>Total Departments</h3>
            <p>{totalDepartments}</p>
          </div>
        </div>

        {/* Employee Management Section */}
        <div className="employee-management">
          <h3>Recently Added Employees</h3>
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td className="Actionbutton">
                    <button className="btn1" onClick={() => navigate(`/EmployeeForm/${employee.id}`)}>Edit</button>
                    <button className="btn1" onClick={() => navigate(`/employee/view/${employee.id}`)}>View</button>
                    <button className="btn1" onClick={() => alert(`Delete employee ${employee.name}?`)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls with Page Number in the Middle */}
          <div className="pagination">
            <button className="btn4" onClick={handlePreviousPage} disabled={currentPage === 1}>
              ← Previous
            </button>
            
            <span className="page-number">{currentPage}</span> {/* Page Number Block */}

            <button className="btn4" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next →
            </button>
          </div>
        </div>

        <div className="Deparepo">
          {/* Department Management Section */}
          <div className="department-management">
            <h3>Departments</h3>
            <button className="btn2" onClick={() => navigate('/add-department')}>Add New Department</button>
            <button className="btn2" onClick={() => navigate('/view-departments')}>View All Departments</button>
          </div>

          {/* Reports Section */}
          <div className="reports-section">
            <h3>Generate Reports</h3>
            <button className="btn2" onClick={() => navigate('/generate-reports')}>Generate Employee Reports</button>
            <button className="btn2" onClick={() => navigate('/generate-department-reports')}>Generate Department Reports</button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <button className="btn3" onClick={() => navigate('/add-employee')}>Add New Employee</button>
          <button className="btn3" onClick={() => navigate('/view-employees')}>View All Employees</button>
        </div>
      </div>

      <AdminFooter/>
    </>
  );
};

export default AdminDashboard;
