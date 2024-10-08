// src/pages/FinanceSection/AdminFinanceView.jsx
import React, { useState } from "react";
import AdminNavBar from "../../components/AdminNavbar"; // Admin Navbar
import Footer from "../../components/Footer"; // Footer
import "./AdminFinanceView.css"; // Optional CSS for styling
import AdminFooter from "../../components/AdminFooter";
import EmployeeFooter from "../../components/EmployeeFooter";


const AdminFinanceView = ({ employees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold the selected employee's finance details

  // Function to handle viewing employee finance details
  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee
  };

  // Function to close the finance details view
  const closeDetails = () => {
    setSelectedEmployee(null);
  };

  return (
    <>
      <AdminNavBar />
      <div className="admin-finance-section">
        <h3 className="admin-finance-title">All Employees Finance Details</h3>
        
        {/* Employee List in Table Format */}
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Department</th> {/* Added Department column */}
              <th>View Finance Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.id}</td>
                <td>{employee.department}</td> {/* Display Department */}
                <td>
                  <button 
                    className="view-details-button" 
                    onClick={() => handleViewDetails(employee)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Selected Employee Details */}
        {selectedEmployee && (
          <div className="admin-finance-details">
            <h4>Finance Details for {selectedEmployee.name}</h4>
            <div className="finance-detail">
              <strong>PAN Card:</strong> <span>{selectedEmployee.finance.panCard}</span>
            </div>
            <div className="finance-detail">
              <strong>Aadhar Card:</strong> <span>{selectedEmployee.finance.aadharCard}</span>
            </div>
            <div className="finance-detail">
              <strong>Bank Name:</strong> <span>{selectedEmployee.finance.bankName}</span>
            </div>
            <div className="finance-detail">
              <strong>Branch:</strong> <span>{selectedEmployee.finance.branch}</span>
            </div>
            <div className="finance-detail">
              <strong>IFSC Code:</strong> <span>{selectedEmployee.finance.ifscCode}</span>
            </div>
            <div className="finance-detail">
              <strong>CTC Breakup:</strong> <span>{selectedEmployee.finance.ctcBreakup}</span>
            </div>
            <button onClick={closeDetails} className="close-details-button">Close</button>
          </div>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminFinanceView;
