// src/pages/FinanceSection.jsx
import React, { useState } from "react";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import "jspdf-autotable"; // Import jsPDF Autotable for table generation
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS
import "./FinanceSection.css";
import AdminNavBar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import AdminFooter from "../../components/AdminFooter";
import NavBar from "../../components/NavBar";

const FinanceSection = ({ financeDetails, onEditClick }) => {
  const [duration, setDuration] = useState(""); // No default duration selected
  const [startDate, setStartDate] = useState(null); // Start date
  const [endDate, setEndDate] = useState(null); // End date

  // Function to handle the download of the payslip in PDF format
  const handleDownloadPayslip = () => {
    // Validate that either a duration or a date range is selected
    if (!duration && (!startDate || !endDate)) {
      alert("Please select either a duration or a date range.");
      return; // Exit the function if validation fails
    }

    const doc = new jsPDF();

    // Title of the document
    doc.setFontSize(16);
    doc.text("Rohan Company", 20, 10);
    doc.setFontSize(12);
    doc.text("Company Address, City, State, ZIP", 20, 15);
    doc.text("Phone: 9488452565 | Email: reko@company.com", 20, 20);
    doc.text("Date of Issue: " + new Date().toLocaleDateString(), 20, 25);
    
    // Add Employee Information
    doc.text("Employee Payslip", 20, 35);
    doc.text(`Name: ${financeDetails.employeeName}`, 20, 45);
    doc.text(`Employee ID: ${financeDetails.employeeID}`, 20, 50);
    doc.text(`Department: ${financeDetails.department}`, 20, 55);
    doc.text(`Designation: ${financeDetails.designation}`, 20, 60);
    doc.text(`Date of Joining: ${financeDetails.dateOfJoining}`, 20, 65);
    
    // Pay Period
    let payPeriod;
    if (startDate && endDate) {
      payPeriod = `Pay Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    } else {
      payPeriod = `Pay Period: Last ${duration} Months`;
    }
    doc.text(payPeriod, 20, 75);
    doc.text("Pay Date: August 1, 2023", 20, 80);

    // Earnings
    const earningsData = [
      ["Basic Salary", "₹40,000"],
      ["House Rent Allowance", "₹10,000"],
      ["Conveyance Allowance", "₹2,500"],
      ["Medical Allowance", "₹1,500"],
      ["Special Allowance", "₹5,000"],
      ["Total Earnings", "₹59,000"]
    ];

    doc.autoTable({
      startY: 90,
      head: [["Earnings", "Amount"]],
      body: earningsData,
    });

    // Deductions
    const deductionsData = [
      ["Provident Fund", "₹1,800"],
      ["Professional Tax", "₹500"],
      ["Income Tax", "₹2,500"],
      ["Total Deductions", "₹4,800"]
    ];

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Deductions", "Amount"]],
      body: deductionsData,
    });

    // Net Salary
    doc.setFontSize(11);
    doc.text("Net Salary: ₹54,200 (Fifty-four thousand two hundred rupees only)", 20, doc.lastAutoTable.finalY + 10);

    // Signature and Confidentiality Notice
    doc.text("Authorized Signature: P-17 EMS", 20, doc.lastAutoTable.finalY + 30);
    doc.text('Confidentiality Notice: "This payslip is confidential and intended solely for the recipient."', 20, doc.lastAutoTable.finalY + 40);

    // Save the document as a PDF
    doc.save("Payslip.pdf");
  };

  // Function to handle duration change
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    // Reset start and end dates if duration is selected
    if (e.target.value) {
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <>
      <NavBar/>
      <div className="finance-section">
        <h3 className="finance-title">Finance Details</h3>
        <div className="finance-details">
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
        </div>

        {/* Duration Selector */}
        <div className="duration-selector">
          <label>Select Duration:</label>
          <select onChange={handleDurationChange} value={duration}>
            <option value="">Select Option</option> {/* Added No Selection Option */}
            <option value={6}>Last 6 Months</option>
            <option value={10}>Last 10 Months</option>
            <option value={12}>Last 12 Months</option>
          </select>
        </div>

        {/* Date Range Pickers */}
        <div className="date-picker-group">
          <label>Select Start Date:</label>
          <DatePicker selected={startDate} onChange={date => {
            setStartDate(date);
            setDuration(""); // Reset duration if start date is set
          }} />
          <label>Select End Date:</label>
          <DatePicker selected={endDate} onChange={date => {
            setEndDate(date);
            setDuration(""); // Reset duration if end date is set
          }} />
        </div>

        <div className="button-group">
          <button onClick={onEditClick} className="edit-button">
            Edit Details
          </button>
          <button className="download-payslip" onClick={handleDownloadPayslip}>
            Download Payslip
          </button>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default FinanceSection;
