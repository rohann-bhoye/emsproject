// src/pages/FinanceSection/AdminFinanceView.jsx
import React from "react";
import AdminNavBar from "../../components/AdminNavbar"; // Admin Navbar
import Footer from "../../components/Footer"; // Footer
import "./AdminFinanceView.css"; // Optional CSS for styling

const AdminFinanceView = ({ financeDetails }) => {
  return (
    <>
      <AdminNavBar />
      <div className="admin-finance-section">
        <h3 className="admin-finance-title">All Employees Finance Details</h3>
        {/* Assuming you have multiple employees' finance details */}
        <div className="admin-finance-details">
          <h4>Employee Name</h4>
          <div className="finance-detail">
            <strong>PAN Card:</strong> <span>{financeDetails.panCard}</span>
          </div>
          <div className="finance-detail">
            <strong>Aadhar Card:</strong> <span>{financeDetails.aadharCard}</span>
          </div>
          <div className="finance-detail">
            <strong>Bank Name:</strong> <span>{financeDetails.bankName}</span>
          </div>
          <div className="finance-detail">
            <strong>Branch:</strong> <span>{financeDetails.branch}</span>
          </div>
          <div className="finance-detail">
            <strong>IFSC Code:</strong> <span>{financeDetails.ifscCode}</span>
          </div>
          <div className="finance-detail">
            <strong>CTC Breakup:</strong> <span>{financeDetails.ctcBreakup}</span>
          </div>
          {/* Optionally, add an Edit button or other actions */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminFinanceView;
